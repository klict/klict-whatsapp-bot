import {CreateQrCodeCommand} from "../commands/create-qr-code-command";
import {GroupMessageCommand} from "../commands/group-message-command";
import {WhatsappWebApi} from "../api/whatsapp-web-api";
import {Command} from "../commands/command";

export class CommandManager {

    private commands: Command[];

    constructor(private whatsappWebApi: WhatsappWebApi) {
        this.commands = [
            new GroupMessageCommand(whatsappWebApi),
            new CreateQrCodeCommand(whatsappWebApi)
        ];

    }

    public getCommands(): Command[] {
        return this.commands
    }

    public getOptions(): string[] {
        const options: string[] = [];

        this.commands.forEach(command => {
            options.push(command.getName());
        });

        return options;
    }

    public getCommand(key: string): Command {
        for (let i = 0; i < this.commands.length; i++) {
            const command = this.commands[i];

            if (command.getName() === key) {
                return command;
            }
        }

        throw new Error(`Selected command ${key} does not exist!`);
    }
}
