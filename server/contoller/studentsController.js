const db = require("../config/connection");
const collection = require("../config/collection");

exports.studentsPost = (req, res) => {
  try {
    const data = req.body;

    const details= db
   .get()
   .collection(collection.STUDENTS)
   .insertMany(data)
   

  } catch (err) {
    console.log(err);
  }
};

