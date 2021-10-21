import * as Faker from 'faker'
import { define } from 'typeorm-seeding'
import { User } from '../models/user.model'

define(User, (faker: typeof Faker, context: { roles: string[] }) => {
  const user = new User()
  user.name = faker.name.findName()
  user.email = faker.internet.email()
  user.password = faker.internet.password()
  return user
})
