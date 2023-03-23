require('ts-node/register');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      name: 'db1Connection',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: './migrations/',
      tableName: '[:name_file_migrations]',
    },
  },
};
