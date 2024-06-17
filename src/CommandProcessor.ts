import tmi from 'tmi.js';
import { Task, getSettings, updateSettings } from './settings';
import { State } from './state';

interface CommandOptions {
  command: string
  args: string
  username: string
  mod: boolean
  broadcaster: boolean
  vip: boolean
}

export default class CommandProcessor {
  private chat?: tmi.Client;

  public state: State = { avatars: [] };
  public setState: (s: State) => unknown = (_s => {});
  public error = '';

  constructor(
    private channel?: string,
    private username?: string,
    private authToken?: string)
  {
    if (!channel) {
      this.error = 'Missing channel name'
    } else if (!username) {
      this.error = 'Missing username'
    } else if (!authToken) {
      this.error = 'Missing auth token'
    } else {
      this.chat = new tmi.client({
        options: {
          debug: true
        },
        identity: {
          username: this.username,
          password: this.authToken
        },
        channels: [this.channel!]
      });
    }
  }

  public async connect() {
    if (this.chat) {
      console.log(`Connecting to channel ${this.channel} as ${this.username}`);
      try {
        await this.chat.connect();
      } catch (ex) {
        this.error = `${ex}`;
        return;
      }
      console.log('Connected successfully');

      this.chat.on('message', async (_channel, userstate, message, _self) => {
        try {
          const command = message.trim();
          if (command.startsWith('!')) {
            const commandName = command.split(' ')[0].toLowerCase();
            const args = command.substring(commandName.length + 1).trim();
            const broadcaster = !!(userstate.badges?.broadcaster);
            const opts: CommandOptions = {
              command: commandName,
              args,
              broadcaster,
              mod: broadcaster || !!(userstate.mod),
              vip: !!userstate.badges?.vip,
              username: userstate['display-name']!
            };
            await this.processCommand(opts);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  private async processCommand(opts: CommandOptions) {
    await this.processTaskCommands(opts);
    await this.processBounceCommands(opts);
  }

  private async processTaskCommands(opts: CommandOptions) {
    const { command, username, args, mod } = opts;
    const { tasksEnabled } = getSettings();
    
    if (tasksEnabled) {
      if (command === '!task') {
        await this.reply(username, '!task:add <name>, !task:done')
      } else if (command === '!task:add') {
        if (args.length > 0) {
          this.addTask(args, username);
          await this.reply(username, `Added task '${args}'`);
        } else {
          await this.reply(username, 'Missing task name');
        }
      } else if (command === '!task:done') {
        const task = this.removeTask(username);
        if (task) {
          await this.reply(username, `Completed task '${task.name}'`)
        } else {
          await this.reply(username, 'No task found');
        }
      } else if (command === '!task:cancel') {
        const task = this.removeTask(username);
        if (task) {
          await this.reply(username, `Cancelled task '${task.name}'`)
        } else {
          await this.reply(username, 'No task found');
        }
      }
    }

    if (mod) {
      if (tasksEnabled) {
        if (command === '!task:clear') {
          updateSettings(s => s.tasks = []);
          await this.reply(username, 'Cleared task list');
        } else if (command === '!task:disable') {
          updateSettings(s => s.tasksEnabled = false);
          await this.reply(username, 'Task list disabled');
        } else if (command === '!task:pos') {
          const [x,y,w,h] = args.split(' ').map(s => parseInt(s))
          updateSettings(s => s.tasksBounds = { x, y, w, h });
        }
      } else {
        if (command === '!task:enable') {
          updateSettings(s => s.tasksEnabled = true);
          await this.reply(username, 'Task list enabled');
        }
      }
    }
  }

  private async processBounceCommands(opts: CommandOptions) {
    const { command, username, mod } = opts;
    const { bounceEnabled } = getSettings();

    if (command === '!bounce') {
      this.updateState(s => s.avatars.push({ username }))
    }
    
    if (mod) {
      if (bounceEnabled) {
        if (command === '!bounce:disable') {
          updateSettings(s => s.bounceEnabled = false);
          await this.reply(username, 'Bounce disabled');
        }
      } else {
        if (command === '!bounce:enable') {
          updateSettings(s => s.bounceEnabled = true);
          await this.reply(username, 'Bounce enabled');
        }
      }
    }
  }

  private async say(message: string) {
    await this.chat!.say(this.channel!, message);
  }

  private async reply(username: string, message: string) {
    await this.say(`@${username} ${message}`);
  }

  private addTask(name: string, username: string) {
    updateSettings(settings => {
      let id = 0;
      for (const task of settings.tasks) {
        if (task.id >= id) {
          id = task.id + 1;
        }
      }
      settings.tasks = [
        ...settings.tasks.filter(task => task.username !== username),
        {
          id,
          addedDate: Date.now(),
          name,
          username
        }
      ]
    })
  }

  private removeTask(username: string) {
    let task: Task | undefined
    updateSettings(settings => {
      task = settings.tasks.find(r => r.username === username);
      if (task) {
        settings.tasks = [...settings.tasks.filter(r => r.username !== username)]
      }
    })
    return task
  }

  private updateState(update: (s: State) => unknown) {
    update(this.state);
    this.setState({ ...this.state });
  }
}
