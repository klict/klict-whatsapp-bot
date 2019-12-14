import * as path from "path";
import {WhatsappWebApi} from "./api/whatsapp-web-api";

const puppeteer = require("puppeteer");

// index.js
const cron = require("node-cron");
const express = require("express");
const app = express();


// schedule tasks to be run on the server
cron.schedule("0 4 * * *", async () => {
    try {
        console.log("---------------------");
        console.log("Running Cron Job");

        const browser = await puppeteer.launch({
            headless: true,
            args: [`--user-data-dir=${path.resolve(__dirname, '.tmp')}`]
        });
        const page = await browser.newPage();
        const whatsappWebApi = new WhatsappWebApi(page);
        const api = require('chuck-norris-api');
        const fs = require("fs");


        api.getRandom().then(function (data) {
            console.log(data.value.joke);
        });

        await whatsappWebApi.init();
        api.getRandom().then(async function (data) {
            let message = "No chuck norris fact joke for this morning:(";

            if (data) {
                message = data.value.joke;
            }

            await whatsappWebApi.sendMessageToGroup('Dev Meetups', message);
            await page.close();
            await browser.close();
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
});

app.listen("3128");
