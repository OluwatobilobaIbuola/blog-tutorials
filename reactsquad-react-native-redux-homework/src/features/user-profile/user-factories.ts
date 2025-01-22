import { faker } from '@faker-js/faker';

export const createPopulatedUsers = ({
  id = faker.database.mongodbObjectId(),
  name = faker.person.fullName(),
} = {}) => ({
  id,
  name,
});
