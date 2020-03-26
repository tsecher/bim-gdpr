const fs = require('fs');
const workingDir = process.cwd().split('/node_modules')[0] + '/';

console.log(`3. Add easy-gdpr scripts into package.json`);
const packageJson = JSON.parse(fs.readFileSync(workingDir + 'package.json'))
packageJson.scripts.egdpr = "node ./node_modules/easy-gdpr/contrib/forge/forge.js";

// Write package.json.
fs.writeFile(workingDir + 'package.json', JSON.stringify(packageJson, null, 4), 'utf8', (err) => {
    if (err) {
        throw err;
    }
});