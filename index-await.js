const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made

    try {
      // Iteration 2
      const result = await Recipe.create({
        title: "Pão de Queijo",
        level: "UltraPro Chef",
        ingredients: [
          "Cassava starch",
          "Parmesan cheese",
          "Milk",
          "Vegetable oil",
          "Salt",
          "Egg",
          "Love",
        ],
        cuisine: "Mineira",
        dishType: "other",
        image:
          "https://s2.glbimg.com/9QNO2q8PEeOPLWikHCfMzZl75ZE=/620x466/e.glbimg.com/og/ed/f/original/2020/08/15/pao-de-queijo-mineiro.jpg",
        duration: 40,
        creator: "Arthêmia Chaves Carneiro",
      });

      console.log(result.title);

      // Iteration 3
      const resultMany = await Recipe.insertMany(data);
      resultMany.map((doc) => console.log(doc.title));

      // Iteration 4
      const resultUpdate = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { $set: { duration: 100 } },
        { new: true }
      );

      console.log("Rigatoni updated successfully!", resultUpdate);

      // Iteration 5
      const resultDelete = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(
        `Successfully deleted ${resultDelete.deletedCount} documents!`
      );

      // Iteration 6
      await mongoose.connection.close();
      console.log("Closed DB connection");
    } catch (err) {
      console.error(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
