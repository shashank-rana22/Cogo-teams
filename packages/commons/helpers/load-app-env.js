const path = require('path');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envConfig = dotenv.config({ path: path.resolve(__dirname, '../../../app.env') });

module.exports = dotenvExpand.expand(envConfig);
