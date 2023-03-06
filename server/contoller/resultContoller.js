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

exports.rangGet = async (req, res) => {
  try {
    console.log(req.query.mark);

    const rank = await db
      .get()
      .collection(collection.STUDENTS)
      .find()
      .sort({ mark: -1 })
      .toArray();

    console.log(rank, "kkk");

    let index = rank.findIndex(
      (students) => students.mark === parseInt(req.query.mark)
    );
    console.log(index);

    const names = await db
      .get()
      .collection(collection.STUDENTS)
      .find({ mark: parseInt(req.query.mark) })
      .toArray();

    const name = names.map((object) => {
      return object.name;
    });

    console.log(name);

    const data = {
      message: `Rank of ${
        req.query.mark
      } = ${++index} , and name is = ${name}`,
    };

    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
