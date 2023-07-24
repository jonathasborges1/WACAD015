import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'lojavirtual',
  logging: false,
});

export default connection;