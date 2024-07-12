import tmi from 'tmi.js';
import EventList from './EventList';

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

  static inst: CommandProcessor;

  error: string | undefined;

  onCommand = new EventList<(opts: CommandOptions) => unknown>();
  onMessage = new EventList<(userstate: tmi.ChatUserstate, message: string) => unknown>();

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
            this.onCommand.invoke(opts);
          }
          this.onMessage.invoke(userstate, message);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
}
