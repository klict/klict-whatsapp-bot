import {Command} from "./command";
import {WhatsappWebApi} from "../api/whatsapp-web-api";

export class CreateQrCodeCommand implements Command {
    constructor(private whatsAppWebApi: WhatsappWebApi) {
    }

    getName(): string {
        return "create Qr code"
    }

    run(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('generating Qr Code');
            this.whatsAppWebApi.generateQrCode()
                .then(() => {
                    console.log('Generated Qr code.');

                    const readline = require('readline');

                    var rli = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

                    rli.question('done ', function(answer) {
                        console.log('You said your name is: ' + answer);
                        rli.close();
                        resolve();
                    });

                }).catch(reject);
        });
    }
}