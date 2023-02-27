import React, { useState, useRef } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useContext } from 'react';

const DailyExpense = () => {

  const authCtx = useContext(AuthContext);

  const emailOfLoggedInUser = authCtx.userEmail;
  const sanitizedEmail = emailOfLoggedInUser.replace(/[@.]/g, '');


  const [expenses, setExpenses] = useState([]);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [receivedExpense,setReceivedExpenses] = useState([]);

  React.useEffect(() => {
    axios.get(`https://expensetracker2-14ef8-default-rtdb.firebaseio.com/${sanitizedEmail}.json`).then((response) => {
      if(response.data){
        setReceivedExpenses(response.data);
      }
    });
  }, [expenses]);

  console.log(receivedExpense);

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value
    };

    axios.post(`https://expensetracker2-14ef8-default-rtdb.firebaseio.com/${sanitizedEmail}.json`, expense)
      .then(response => {
        console.log(response);
        setExpenses([...expenses, expense]);
      })
      .catch(error => {
        console.log(error);
      });

    // Clear form fields
    amountRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  }

  return (
    <div>
      <h2 className='text-center'>Daily Expense Tracker</h2>

      <Form onSubmit={handleSubmit} className="container">
        <Form.Group controlId="amount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control type="number" name="amount" ref={amountRef} required />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" name="description" ref={descriptionRef} required />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category:</Form.Label>
          <Form.Control as="select" name="category" ref={categoryRef} required>
            <option value="">-- Select a category --</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>
        <div className='text-center'>
          <Button variant="primary" type="submit" className='mt-3'>Add Expense</Button>
        </div>
      </Form>

      <div>
        <h3 className='text-center'>Expenses of {emailOfLoggedInUser}</h3>
        <Table striped bordered hover className='container'>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(receivedExpense).map((key, index) => (
              <tr key={key}>
                <td>{index + 1}</td>
                <td>{receivedExpense[key].amount}</td>
                <td>{receivedExpense[key].description}</td>
                <td>{receivedExpense[key].category}</td>
                <td>{key}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DailyExpense;
