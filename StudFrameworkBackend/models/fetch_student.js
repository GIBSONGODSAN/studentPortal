/** @format */

const connection = require("../config/dbconfig");

function fetch_licet(params, callback) {
  connection.query(
    "SELECT * FROM student.student_details WHERE licet_email = ?",
    [params.offemail],
    (err, results, fields) => {
      if (err) {
        console.log(err);
        // Pass the error to the callback
        callback(err, null);
      } else {
        console.log("Fetched");
        // Pass the results to the callback
        callback(null, results);
      }
    }
  );
}

module.exports = fetch_licet;
