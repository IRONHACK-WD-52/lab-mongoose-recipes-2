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
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2
    Recipe.create({
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
    })
      .then((data) => {
        console.log(data.title);
      })
      .catch((err) => console.error(err));

    // Iteration 3
    Recipe.insertMany(data)
      .then((result) => {
        result.map((doc) => console.log(doc.title));

        // Iteration 4
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } },
          { new: true }
        )
          .then((result) =>
            console.log("Rigatoni updated successfully!", result)
          )
          .catch((err) => console.error(err));

        // Iteration 5
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((result) => {
            console.log(
              `Successfully deleted ${result.deletedCount} documents!`
            );

            // Iteration 6
            mongoose.connection
              .close()
              .then((result) => console.log("Closed DB connection"))
              .catch((err) => console.error("Connection closing failure"));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
