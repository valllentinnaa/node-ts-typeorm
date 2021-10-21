import { tearDownDatabase, useRefreshDatabase } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV !== 'production' ? `.env.${process.env.NODE_ENV}` : '.env',
})
globalThis.baseUrl = `http://localhost:${process.env.PORT}`

// This is example how to do global before tests:
exports.mochaHooks = {
  beforeAll(done) {
    done()
  },
  afterAll(done) {
    tearDownDatabase().then(() => done())
  },
}
