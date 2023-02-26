import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginId = loginIdRef.current.value;
    const password = passwordRef.current.value;
    // Handle form submission logic

    {
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5cdZzJcoEQqaDiHG5I-GVDtlb6TujDAo",
        {
          method:'POST',
          body: JSON.stringify({
            email:loginId,
            password:password,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }
        ).then(res =>{
          if(res.ok){
            console.log("Login succesfullly");
            alert("Login succesful");
          } else{
              return res.json().then(data =>{
              // console.log(data);
              let errorMessage = 'Authrntication filed!';
              if(data && data.error && data.error.message){
                 errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        });
      }


  };



  return (
    <Form onSubmit={handleSubmit} className="container mt-3">
      <Form.Group controlId="formLoginId">
        <Form.Label>Login ID</Form.Label>
        <Form.Control type="text" placeholder="Enter login ID" ref={loginIdRef} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
