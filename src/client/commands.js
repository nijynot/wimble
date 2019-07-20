import execa from 'execa';
import { app } from 'electron';
// import { DOTFILES } from 'utils/util';

function startOwner(password) {
  return execa(
    './bin/grin-wallet',
    ['-p', password, 'owner_api'],
    { buffer: false }
  );
}

function startServer() {
  return execa(
    './bin/grin',
    ['server', '--config_file', `./grin-server.toml`, 'run'],
    { buffer: false }
  );
}

function stopOwner(process) {
}

function initWallet(password) {
  if (typeof password !== 'string' || password === '') {
    throw new Error(`Expected \`password\` to be a non-empty string, but got ${password}.`);
  }

  const subprocess = execa(
    './bin/grin-wallet',
    ['init'],
  );

  return new Promise((resolve, reject) => {
    subprocess.stdout.on('data', (data) => {
      const output = data.toString('utf8');

      if (output.includes('Please enter a password for your new wallet')) {
        subprocess.stdin.write(password + '\n');
        subprocess.stdin.write(password + '\n');
      } else if (output.includes('Invalid Arguments: Not creating wallet - Wallet seed file exists')) {
        // If wallet exists, return `null`.
        reject('Wallet seed file already exists.');
      } else if (output.includes('Please back-up these words in a non-digital format.')) {
        // Parse for seed if wallet was created, and return seed as an array.
        let seed = data.toString('utf8');

        if (seed.includes('Your recovery phrase is:')) {
          seed = seed
            .substr(seed.indexOf('Your recovery phrase is:'))
            .replace('Your recovery phrase is:', '');
        }

        seed = seed
          .replace('Please back-up these words in a non-digital format.', '')
          .replace(/(\r\n|\n|\r)/gm, '');

        resolve(seed.trim().split(' '));
      }
    });
  });
}

export default {
  startOwner,
  startServer,
  initWallet,
};
