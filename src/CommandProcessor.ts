import tmi from 'tmi.js';
import { Task } from './settings';

export default class CommandProcessor {
  private chat: tmi.Client;

  public tasks?: Task[];
  public setTasks?: (t: Task[]) => unknown;

  constructor(
    private channel: string,
    private username: string,
    private authToken: string)
  {
    this.chat = new tmi.client({
      options: {
        debug: true
      },
      identity: {
        username: this.username,
        password: this.authToken
      },
      channels: [this.channel]
    });
  }

  public async connect() {
    console.log(`Connecting to channel ${this.channel} as ${this.username}`);
    await this.chat.connect();
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

  private async processCommand(command: string, args: string, userstate: tmi.ChatUserstate) {
    const broadcaster = !!(userstate.badges?.broadcaster);
    const mod = !!(userstate.mod);
    const vip = !!userstate.badges?.vip;
    const username = userstate['display-name']!
  
    if (command === '!task:add' && args.length > 0) {
      this.addTask(args, username);
      await this.say(`@${username} Added task '${args}'`);
    }
  }

  private async say(message: string) {
    await this.chat.say(this.channel, message);
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
        ...this.tasks,
        {
          id,
          addedDate: Date.now(),
          name,
          username
        }
      ])
    }
  }
}
