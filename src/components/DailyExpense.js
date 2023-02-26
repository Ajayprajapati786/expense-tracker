import React, { useState, useRef } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const DailyExpense = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value
    };

// Here would be the code to send expense to server

    setExpenses([...expenses, expense]); // Add new expense to the list


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
      <h2 className='text-center mt-5'>Expenses</h2>
      <Table striped bordered hover className='container'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default DailyExpense;
