import {WhatsappWebApi} from "../api/whatsapp-web-api";
import {ReadLine} from "readline";

export class GroupMessageCommand {

    constructor(private whatsAppWebApi: WhatsappWebApi) {
    }

    getName() {
        return "send group message"
    }

    run(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.askQuestions()
                .then(answers => {
                    console.log(answers);
                    this.whatsAppWebApi.sendMessageToGroup(answers.group, answers.message)
                        .catch(console.log)
                        .finally(resolve);
                })
                .catch(reject);
        });
    }


    askQuestions(): Promise<{ group: string, message: string }> {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise(async resolve => {
            const group = await this.askForGroup(rl);
            const message = await this.askForMessage(rl);
            rl.close();

            resolve({group, message});
        });
    }

    askForGroup(readLine: ReadLine): Promise<string> {
        return new Promise(resolve => {
            readLine.question('Group name?', resolve);
        });
    }

    askForMessage(readLine: ReadLine): Promise<string> {
        return new Promise(resolve => {
            readLine.question('Message?', resolve);
        });
    }
}


