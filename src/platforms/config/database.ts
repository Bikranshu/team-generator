require('dotenv').config();
import path from 'node:path';

export default {
  client: (process.env as any).DB_CLIENT || 'mysql',
  connection: {
    host: (process.env as any).DB_HOST,
    user: (process.env as any).DB_USER_NAME,
    password: (process.env as any).DB_PASSWORD,
    database: (process.env as any).DB_NAME,
    charset: 'utf8',
    socketPath: (process.env as any).DB_SOCKET,
  },
  migrations: {
    tableName: 'migrations',
    //directory: path.join(__dirname, 'src/migrations')
     directory: (process as any).cwd() + '/src/migrations',
  },
  seeds: {
    directory: (process as any).cwd() + '/src/seeds',
  },
  debug: false,
};
