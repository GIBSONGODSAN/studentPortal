/** @format */

import axios from "axios";
import { URL, server_URL } from "./urls_config";

function other_users_check(email_id) {
  // Add official keywords
  let keywords = ["hod", "advisor", "iqac", "dean", "principal", "admin"];
  const result = keywords.some((word) => email_id.includes(word));
  return result;
}

export default function handleLogin() {
  const loginButton = document.getElementById("login_btn");
  loginButton.disabled = true;
  loginButton.innerHTML = `<div class="spinner1"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`;
  document.getElementById("pass-fail").style.display = "none";
  document.getElementById("email-fail").style.display = "none";
  document.getElementById("server-fail").style.display = "none";

  const email = document.getElementById("emailId").value;
  const password = document.getElementById("password").value;

  console.log(email, password); // Debugging

  let offemail = email;
  let requestData = { offemail: offemail };
  console.log(requestData);

  axios.post(server_URL + 'checkLicetEmail', requestData)
    .then(response => {
      debugger;
      console.log(response.data);
      if (response.data.exists === false) {
        console.log('User not found');
        const regexPattern = /^[a-zA-Z]{1,20}\.[0-9]{2}[a-z]{2,3}@licet.ac.in$/;

        if (regexPattern.test(email) && password === 'licet123') {
          localStorage.setItem('isUser', '0');
          localStorage.setItem('useremail', email);
          window.location.href = URL + 'Student#/auth/GeneralInformationdata';
        } else {
          axios.post(server_URL + "userlogin", { email, password })
            .then((result) => {
              if (result.data === "user-fail") {
                console.log("User not present");
                // Handle case where user is not present
              } else if (result.data === "pass-fail") {
                console.log("Incorrect password");
                document.getElementById("pass-fail").style.display = "block";
              } else if (result.data === "server-down") {
                console.log("Server down");
                document.getElementById("server-fail").style.display = "block";
              } else {
                const check = result.data[0];

                if (check.user_type == 2) {
                  // Handle HOD redirection
                  localStorage.setItem("user_type", "hod");
                  localStorage.setItem("dept", check.dept);
                  localStorage.setItem("hodemail", check.email);
                  window.location.href = URL + "HoD#/admin2/dashboard";
                } else if (check.user_type == 1) {
                  // Handle Class Advisor redirection
                  localStorage.setItem("user_type", "class_advisor");
                  localStorage.setItem("batch", check.batch);
                  localStorage.setItem("dept", check.dept);
                  localStorage.setItem("caemail", check.email);
                  window.location.href = URL + "Class-Advisor#/admin1/dashboard";
                } else if (check.user_type == 3) {
                  // Handle Official redirection
                  localStorage.setItem("user_type", "official");
                  localStorage.setItem("offemail", check.email);
                  window.location.href = URL + "LICET#/admin3/dashboard";
                } else if (check.user_type == 4) {
                  // Handle Admin redirection
                  localStorage.setItem("user_type", "admin");
                  localStorage.setItem("hodemail", check.email);
                  window.location.href = URL + "Admin#/admin4/dashboard";
                }

                localStorage.setItem("useremail", check.email);
                localStorage.setItem("auth_token", check.auth_token);
                localStorage.setItem("user_name", check.user_name);

                loginButton.disabled = false;
                loginButton.innerHTML = `Login`;
              }
            })
            .catch(error => {
              console.error('Axios request error:', error);
            });
        }
      } else if (response.data.exists === true) {
        localStorage.setItem('isUser', '1');
        localStorage.setItem('useremail', email);
        window.location.href = URL + 'Student#/auth/GeneralInformationdata';
      } else {
        console.log('Other Users');
        // Handle case where user is found in other_users_check
      }
    })
    .catch(error => {
      console.error('Axios request error:', error);
    });
}
