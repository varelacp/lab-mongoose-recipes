const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI =
  'mongodb+srv://VarelaCatia:JavaScript123@ironhack.vwx5anb.mongodb.net/recipe-app';

async function updateDatabase() {
  // Connection to the database "recipe-app"
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log('connected to', x.connections[0].name);
    await Recipe.deleteMany();

    //Start coding here
    const newRecipe = {
      title: 'Pancakes',
      level: 'Easy Peasy',
      ingredients: ['flour', 'sugar', 'eggs', 'milk'],
      cuisine: 'American',
      dishType: 'breakfast',
      duration: 30,
      creator: 'Chef Jon Doe'
    };
    const createdRecipe = await Recipe.create(newRecipe);
    console.log('createdRecipe:', createdRecipe);

    const createdRecipes = await Recipe.insertMany(data);
    console.log('createdRecipes:', createdRecipes);

    createdRecipes.forEach(recipe => console.log(recipe.title));

    const filterRecipe = { title: 'Rigatoni alla Genovese' };
    const update = { duration: 100 };
    const options = { new: true };
    const updatedRecipe = await Recipe.findOneAndUpdate(
      filterRecipe,
      update,
      options
    );
    console.log('updatedRecipe:', updatedRecipe);

    console.log(
      `The '${updatedRecipe.title}' recipe has been updated with sucess!`
    );

    const findRecipe = { title: 'Carrot Cake' };
    const removeRecipe = await Recipe.deleteOne(findRecipe);
    console.log('removeRecipe:', removeRecipe);

    console.log(`The 'Carrot Cake' recipe is no longer available!`);
  } catch (error) {
    console.error('Error connecting to the database', error);
  } finally {
    mongoose.connection.close();
    console.log('Connection with the dataBase has been closed!');
  }
}

updateDatabase();
