# MySQL Database Setup Instructions

## Step 1: Connect to MySQL Workbench

Use these connection details in MySQL Workbench:

- **Connection Name**: ABC SARL Local
- **Hostname**: localhost
- **Port**: 3306
- **Username**: root
- **Password**: 10062000&Issa

## Step 2: Run the Database Setup Script

1. Open MySQL Workbench
2. Connect using the above credentials
3. Open the file `database_setup.sql`
4. Execute the entire script (Ctrl+Shift+Enter)

## Step 3: Verify Database Creation

After running the script, you should see:
- Database: `abc.sarl`
- Tables: `admins`, `projects`, `services`, `bookings`, `testimonials`

## Step 4: Test Connection from Your App

Your .env file is already configured correctly:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=10062000&Issa
DB_NAME=abc.sarl
DB_PORT=3306
```

## Default Admin Login

- Username: admin
- Password: admin123

## Troubleshooting

If you get "Access denied" errors:
1. Make sure MySQL service is running: `sc query MySQL80`
2. Try connecting as root first
3. Create the database manually if needed:
   ```sql
   CREATE DATABASE `abc.sarl`;
   ```

## Alternative: Run Node.js Setup

You can also run the existing Node.js setup script:
```bash
cd backend
node initDb.js
```