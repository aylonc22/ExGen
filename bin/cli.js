#!/usr/bin/env node
import inquirer from 'inquirer';
import { generateApp } from '../index.js';

function isExitPromptError(err) {
    return err?.name === "ExitPromptError";
}

async function ask(questions) {
    try {
        return await inquirer.prompt(questions);
    } catch (err) {
        if (isExitPromptError(err)) {
        console.log("ExGen Cancelled...");
        process.exit(0);
        }
        throw err;
    }
}

try {
    const args = process.argv.slice(2);
    const appNameArg = args[0];

    let appName = appNameArg;
    let includeDB;

    if (!appName) {
        const answers = await ask([
        { type: "input", name: "appName", message: "Application name:" },
        { type: "confirm", name: "includeDB", message: "Include MongoDB setup?", default: true }
        ]);
        appName = answers.appName;
        includeDB = answers.includeDB;
    } else {
        const answers = await ask([
        { type: "confirm", name: "includeDB", message: "Include MongoDB setup?", default: true }
        ]);
        includeDB = answers.includeDB;
    }

    await generateApp({ appName, includeDB });

} catch (err) {
    console.error("❌ Unexpected error:", err);
    process.exit(1);
}
