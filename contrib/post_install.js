const fs = require('fs');
const workingDir = process.cwd().split('/node_modules')[0] + '/';

console.log(`3. Add bim-gdpr scripts into package.json`);
const packageJson = JSON.parse(fs.readFileSync(workingDir + 'package.json'))
packageJson.scripts.bgdpr = "node ./node_modules/bim-gdpr/contrib/forge/forge.js";

// Write package.json.
fs.writeFile(workingDir + 'package.json', JSON.stringify(packageJson, null, 4), 'utf8', (err) => {
    if (err) {
        throw err;
    }
});
