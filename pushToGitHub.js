const { exec } = require('child_process');

// Replace these with your own details
const remoteRepo = "https://github.com/NunezBrian/Logo-Imager.git"
const branch = 'myBranch';

const commands = [
  'git add .',
  'git commit -m "Automated commit"',
  `git push ${remoteRepo} ${branch}`
];

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}\n${error}`);
        reject(error);
        return;
      }
      console.log(`Command: ${command}\n${stdout}`);
      resolve(stdout);
    });
  });
}

async function pushToGitHub() {
  try {
    for (const command of commands) {
      await runCommand(command);
    }
    console.log('Successfully pushed to GitHub!');
  } catch (error) {
    console.error('Failed to push to GitHub', error);
  }
}

pushToGitHub();
