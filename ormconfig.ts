import dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV !== 'production' ? `.env.${process.env.NODE_ENV}` : '.env',
})

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dropSchema: process.env.DROP_DB || false,
  entities: ['src/lib/db/models/*.ts'],
  logging: true,
  migrationsRun: true,
  migrations: ['src/lib/db/migrations/*.ts'],
  seeds: ['src/lib/db/seeds/*.ts'],
  factories: ['src/lib/db/factories/*.ts'],
  cli: {
    entitiesDir: 'src/lib/db/models',
    migrationsDir: 'src/lib/db/migrations',
  },
}
