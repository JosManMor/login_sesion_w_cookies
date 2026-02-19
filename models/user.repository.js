import DBLocal from 'db-local';
const { Schema } = new DBLocal({ path: './db' });
import userSchema from '../schemas/user.schema.js';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config.js';

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
});

export class UserRepository {
  static async create({ username, password, role = 'user' }) {
    userSchema.parse({ username, password });
    const user = User.findOne({ username });
    if (user) throw new Error('{"message":"Username already exists"}');
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Password hashed
    User.create({
      _id: id,
      username,
      password: hashedPassword,
      role,
    }).save();
    return id;
  }

  static async getAll() {
    return User.find().map(user => {
      const { password, ...publicUser } = user;
      return publicUser;
    });
  }

  static async login({ username, password }) {
    userSchema.parse({ username, password });

    const user = User.findOne({ username });
    if (!user) throw new Error('{"message":"Username does not exist"}');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('{"message":"Password is incorrect"}');

    const { password: _, ...publicUser } = user;
    return publicUser;
  }
}
