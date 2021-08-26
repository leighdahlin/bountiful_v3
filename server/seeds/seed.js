const db = require('../config/connection');
const { Category, Item, User } = require('../models');

const catData = require('./catData.json');
const itemData = require('./itemData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await Category.deleteMany({});
  await Item.deleteMany({});
  await User.deleteMany({});

  const categories = await Category.insertMany(techData);
  const items = await Item.insertMany(techData);
  const users = await User.insertMany(techData);

  console.log('Technologies seeded!');
  process.exit(0);
});