const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/secrets");
// require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(
      (module.exports = {
        secretKey: "ad_backend",
        MONGO_URI:
          "mongodb+srv://<adarsh>:<Adarsh@123>@cluster0.axnmstw.mongodb.net/",
      }),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB Connected Successfully! ✅");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectDB;
