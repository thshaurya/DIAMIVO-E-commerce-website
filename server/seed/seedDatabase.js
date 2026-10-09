const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const categories = require('./categoryData');
const products = require('./productData');

/**
 * Seed the MongoDB Database with initial luxury jewellery and auth data
 */
const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/diamivo';
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing collections...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('[Seed] Inserting categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`[Seed] Successfully inserted ${createdCategories.length} categories.`);

    console.log('[Seed] Inserting products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`[Seed] Successfully inserted ${createdProducts.length} products.`);

    console.log('[Seed] Creating demo admin and customer accounts...');
    // Create Admin user (triggers pre-save bcrypt hash)
    const adminUser = await User.create({
      name: 'Maison Administrator',
      email: 'admin@diamivo.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '+91 98200 99999',
      address: {
        street: '1 Atelier Vault, BKC',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400051',
        country: 'India'
      }
    });

    // Create Demo Customer user
    const customerUser = await User.create({
      name: 'Aarav Mehta',
      email: 'aarav@example.com',
      password: 'Customer@123',
      role: 'customer',
      phone: '+91 98200 12345',
      address: {
        street: '14 Marine Drive',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400021',
        country: 'India'
      }
    });

    console.log('\n=======================================');
    console.log(' ✨ DIAMIVO Database Seeded Successfully!');
    console.log(`    - Categories: ${createdCategories.length}`);
    console.log(`    - Products:   ${createdProducts.length}`);
    console.log(`    - Admin:      ${adminUser.email} (pass: Admin@123)`);
    console.log(`    - Customer:   ${customerUser.email} (pass: Customer@123)`);
    console.log('=======================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
