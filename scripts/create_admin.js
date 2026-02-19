import { UserRepository } from '../models/user.repository.js';
import dotenv from 'dotenv';
dotenv.config();

const createAdmin = async () => {
  try {
    const adminUser = 'admin_user';
    const adminPass = 'admin123';
    
    // Check if admin already exists
    const users = await UserRepository.getAll();
    const existingAdmin = users.find(u => u.username === adminUser);
    
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    console.log(`Creating admin user: ${adminUser}`);
    await UserRepository.create({ 
      username: adminUser, 
      password: adminPass, 
      role: 'admin' 
    });
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
};

createAdmin();
