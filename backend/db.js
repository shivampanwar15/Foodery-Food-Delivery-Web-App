const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:Shivam.v7@cluster0.d7sjgye.mongodb.net/face_id_signup?retryWrites=true&w=majority"
const connectToMongo = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("faceID")
            fetched_data.find({}).toArray(async function (err, data) {
              
                    if (err) console.log(err);
                    else {
                       console.log(data);
                       
                    }
            }
            )
        }
    });
}

module.exports = connectToMongo;