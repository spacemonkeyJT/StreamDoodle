import tmi from 'tmi.js';
import { Task } from './settings';

export default class CommandProcessor {
  private chat?: tmi.Client;

  public tasks?: Task[];
  public setTasks?: (t: Task[]) => unknown;
  public visible?: boolean;
  public setVisible?: (v: boolean) => unknown;
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

      this.chat.on('message', async (_channel, userstate, message, self) => {
        if (self) return;
        try {
          const command = message.trim();
          if (command.startsWith('!')) {
            const commandName = command.split(' ')[0].toLowerCase();
            const args = command.substring(commandName.length + 1).trim();
            await this.processCommand(commandName, args, userstate);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  private async processCommand(command: string, args: string, userstate: tmi.ChatUserstate) {
    const broadcaster = !!(userstate.badges?.broadcaster);
    const mod = !!(userstate.mod);
    // const vip = !!userstate.badges?.vip;
    const username = userstate['display-name']!
  
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

    if (broadcaster || mod) {
      if (command === '!task:clear') {
        this.setTasks?.([]);
        await this.reply(username, 'Cleared task list');
      } else if (command === '!task:show') {
        this.setVisible?.(true);
        await this.reply(username, 'Task list shown');
      } else if (command === '!task:hide') {
        this.setVisible?.(false);
        await this.reply(username, 'Task list hidden');
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
    if (this.tasks && this.setTasks) {
      let id = 0;
      for (const task of this.tasks) {
        if (task.id >= id) {
          id = task.id + 1;
        }
      }
      this.setTasks([
        ...this.tasks.filter(task => task.username !== username),
        {
          id,
          addedDate: Date.now(),
          name,
          username
        }
      ])
    }
  }

  private removeTask(username: string) {
    if (this.tasks && this.setTasks) {
      const task = this.tasks.find(r => r.username === username);
      if (task) {
        this.setTasks([...this.tasks.filter(r => r.username !== username)]);
        return task;        
      }
    }
    return undefined;
  }
}
