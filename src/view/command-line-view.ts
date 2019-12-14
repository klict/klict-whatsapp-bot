import {CommandManager} from "../manager/command-manager";

export class CommandLineView {

    private optionsList: any;

    constructor(private commandManager: CommandManager) {
        const List = require('prompt-list');

        this.optionsList = new List({
            name: 'whatsapp',
            message: 'What would you like to do?',
            choices: this.commandManager.getOptions().concat(['exit'])
        });

    }

    render(): Promise<void> {
        return new Promise<void>(resolve => {
            this.askQuestion()
                .then(resolve)
                .catch(reason => {
                    console.log(reason);
                    resolve();
                });
        });
    }

    private askQuestion(): Promise<void> {
        return new Promise<void>(resolve => {
            this.optionsList.ask(option => {
                if (option === 'exit') {
                    resolve();
                } else {
                    const command = this.commandManager.getCommand(option);
                    command.run().finally(() => resolve());
                }
            });
        });
    }

}