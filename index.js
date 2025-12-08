import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateApp({ appName, includeDB,conf:{PORT,MONGO_URI}} ) {
    const targetPath = path.join(process.cwd(), appName);

    if (fs.existsSync(targetPath)) {
        console.log(`Folder ${appName} already exists!`);
        return;
    }

    await fs.mkdir(targetPath);

    const templatePath = path.join(__dirname, 'templates');
    await fs.copy(templatePath, targetPath);

    // Customize package.json
    const packageJsonPath = path.join(targetPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = appName;

    // Custimize .env
    const envPath = path.join(targetPath,'.env');
    const envJson = await fs.readJSON(envPath);
    envJson.PORT = PORT;
    envJson.MONGO_URI = MONGO_URI

    if (!includeDB) {
        // Remove DB-related files in future versions
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(`Express app "${appName}" created successfully!`);
    console.log(`Run "cd ${appName} && npm install" to install dependencies.`);
}
