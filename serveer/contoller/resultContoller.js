const db = require("../config/connection");
const collection = require("../config/collection");

exports.resultget = async (req, res) => {
  try {
    const result = await db
      .get()
      .collection(collection.STUDENTS)
      .find()
      .sort({ mark: -1 })
      .skip(1)
      .limit(1)
      .toArray();

    console.log(result);

    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.sumget = async (req, res) => {
  try {
    const sum = await db
      .get()
      .collection(collection.STUDENTS)
      .aggregate([
        {
          $group: { _id: null, total: { $sum: "$mark" } },
        },
      ])
      .toArray();
    res.send(sum);
  } catch (err) {
    console.log(err);
  }
};

// parms mark
// response rank
exports.rangGet = async (req, res) => {
  try {
    console.log("params" + req.query.name);
    const Sort = await db
      .get()
      .collection(collection.STUDENTS)
      .find()
      .sort({ mark: -1 })
      .toArray();
    console.log(Sort, "Sort");

    let index = Sort.findIndex((student) => student.name === req.query.name);
    console.log("rank ===" + index);
    const data = {
      message: `Rank of ${req.query.name} = ${++index}`,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
