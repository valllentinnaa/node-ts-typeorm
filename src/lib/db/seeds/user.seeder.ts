import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../models/user.model'
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().create({ email: 'example@example.com', name: 'TestUser', 'password': '12345' })
    await factory(User)().create({ email: 'example2@example.com', name: 'TestUser2', 'password': 'testuser_2' })
  }
}