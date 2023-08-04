const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_STRING;
const connectToMongo = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("FoodItems");
            fetched_data.find({}).toArray(async function (err, FoodData) {
           
                const foodCategory = await mongoose.connection.db.collection("FoodCategory");
                foodCategory.find({}).toArray(async function (err, CatData) {

                    if (err) console.log(err);
                    else {
                        global.food_items = FoodData;
                        global.food_category  = CatData;
                    }
           

                })

            })
        }
    })
}

module.exports = connectToMongo;