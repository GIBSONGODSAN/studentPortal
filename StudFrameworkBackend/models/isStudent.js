/** @format */

const connection = require("../config/dbconfig");

function check_licet_email(params, callback) {
    connection.query(
      "SELECT COUNT(*) as count FROM student.student_details WHERE licet_email = ?",
      [params.offemail],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          // Pass the error to the callback
          callback(err, null);
        } else {
          console.log("Checked Licet Email", results[0].count);
          // Pass the count to the callback
          callback(null, results[0].count);
        }
      }
    );
  }

  module.exports = check_licet_email;