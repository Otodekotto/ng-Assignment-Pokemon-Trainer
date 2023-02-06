const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: '.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    apiKey: '${process.env.API_KEY}',
    apiUserURL: '${process.env.API_USER_URL}',
    apiAllPokemonURL: '${process.env.API_ALL_POKEMON_URL}',
    apiPokemonSprite:'${process.env.API_POKEMON_SPRITE}',
    production: true,
  };
  `;
  console.log(
    'The file `environment.ts` will be written with the following content: \n'
  );
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
