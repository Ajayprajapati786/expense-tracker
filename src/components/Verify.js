import React from "react";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const Verify = () => {
    const authCtx = useContext(AuthContext);

  const verifyEmail = () => {
    {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5q-c3lCTS7DOC2LKP6IaEHLtIdVfTTwI",
          {
            method: "POST",
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            console.log("Verified succesfull succesfullly");
            console.log(res);
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = "Authrntication filed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
         
        })
        .catch((err) => {
          alert(err.message);
        });
      
      }
  };
  return (
    <div>
      <button onClick={verifyEmail}>Verify Email ID</button>
    </div>
  );
};

export default Verify;
