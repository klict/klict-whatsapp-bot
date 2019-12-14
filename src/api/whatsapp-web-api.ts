import {Page} from "puppeteer";

export class WhatsappWebApi {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public init(): Promise<void> {
        return new Promise<void>(async resolve => {
            await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
            await this.page.goto('https://web.whatsapp.com/', {waitUntil: 'networkidle0', timeout: 0});
            await this.page.waitFor(5000);

            resolve();
        });
    }

    public async generateQrCode(): Promise<void> {
        return new Promise(async resolve => {
            await this.page.screenshot({path: 'qr.png'});
            resolve();
        });
    }

    public async sendMessageToGroup(groupName: string, message: string): Promise<void> {
        return new Promise(async resolve => {
            await this.page.waitForSelector('#side input[type=text]', {timeout: 15000});
            await this.page.type('#side input[type=text]', groupName);
            await this.page.waitForSelector(`#pane-side span[title="${groupName}"]`, {visible: true});
            await this.page.click(`span[title="${groupName}"`);
            await this.sendMessage(message);
            resolve();
        });
    }

    public sendMessage(message: string): Promise<void> {
        return new Promise(async resolve => {
            await this.page.waitForSelector('footer .copyable-text', {visible: true});
            await this.page.type('footer .copyable-text', message);
            await this.page.keyboard.press('Enter');
            await this.page.waitFor(1000);
            resolve();

        });
    }
};