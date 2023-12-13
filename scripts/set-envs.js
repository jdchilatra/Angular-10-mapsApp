const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config();


const targetPath = './src/environments/environments.ts'
const envFilecontent =`
export const environment = {
  mapbox_key:"${process.env['MAPBOX_KEY']}"
}
`;

mkdirSync('./src/environments',{recursive:true});
writeFileSync(targetPath, envFilecontent);
