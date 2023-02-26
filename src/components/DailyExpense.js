import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const DailyExpense = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value
    };

    console.log(expense); // Here, you can send the expense data to your backend API or do something else with it

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
    </div>
  )
}

export default DailyExpense;
