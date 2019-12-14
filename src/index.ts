import {CommandManager} from "./manager/command-manager";
import {CommandLineView} from "./view/command-line-view";
import {WhatsappWebApi} from "./api/whatsapp-web-api";

import * as path from 'path';

const puppeteer = require("puppeteer");

const bootup = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [`--user-data-dir=${path.resolve(__dirname, '.tmp')}`]
        });
        const page = await browser.newPage();

        const whatsappWebApi = new WhatsappWebApi(page);
        await whatsappWebApi.init();
        const commandManager = new CommandManager(whatsappWebApi);
        const commandLineView = new CommandLineView(new CommandManager(new WhatsappWebApi(page)));

        commandLineView.render()
            .finally(async () => {
                await page.close();
                await browser.close();
            });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

bootup();


