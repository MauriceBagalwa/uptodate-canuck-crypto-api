const mongoose = require("mongoose");
mongoose
  .connect(
    // "mongodb+srv://root:uauPNwi5HINC4kUx@cluster0.jdyxr.mongodb.net/updevsms_db?retryWrites=true&w=majority",
    "mongodb://127.0.0.1:27017/canuck_crypto_db",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("🪐connected!"))
  .catch((err) => {
    console.log("DB Connection Error: " + err);
  });
