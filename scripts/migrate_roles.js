import fs from 'node:fs';
import path from 'node:path';

const dbPath = path.resolve('./db/User.json');

const migrateRoles = () => {
    try {
        if (!fs.existsSync(dbPath)) {
            console.log('Database file not found.');
            return;
        }

        const rawData = fs.readFileSync(dbPath, 'utf-8');
        let users = JSON.parse(rawData);
        let updatedCount = 0;

        users = users.map(user => {
            if (!user.role) {
                console.log(`Updating user ${user.username} with default role`);
                updatedCount++;
                return { ...user, role: 'user' };
            }
            return user;
        });

        if (updatedCount > 0) {
            fs.writeFileSync(dbPath, JSON.stringify(users, null, 2)); // Save pretty format
            console.log(`Migrated ${updatedCount} users.`);
        } else {
            console.log('No users needed migration.');
        }

    } catch (error) {
        console.error('Migration failed:', error);
    }
};

migrateRoles();
