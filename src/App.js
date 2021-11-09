import React, { useState } from 'react';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import validator from 'validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaskedInput from 'react-text-mask';
import './App.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
const valid = require('card-validator');
toast.configure();
function App() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [errorMessageNum, setErrorMessageNum] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageCvc, setErrorMessageCvc] = useState('');
  const [errorMessageExpiry, setErrorMessageExpiry] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (validator.isCreditCard(number)) {
      toast.success('Valid CreditCard!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (
      errorMessageNum !== '' ||
      errorMessageName !== '' ||
      errorMessageCvc !== '' ||
      errorMessageExpiry !== ''
    ) {
      toast.error('Please fill out the form correctly', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error('Invalid CreditCard!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const validateCardNumber = (value) => {
    let numberValidation = valid.number(value);

    if (!numberValidation.isValid && value !== '') {
      setErrorMessageNum('Enter a valid creditcard Number');
    } else if (numberValidation.isPotentiallyValid) {
      setErrorMessageNum('');
    }
  };
  const validateName = (value) => {
    let nameValidation = valid.cardholderName(value);

    if (!nameValidation.isValid && value !== '') {
      setErrorMessageName('Enter a valid name');
    } else if (nameValidation.isPotentiallyValid) {
      setErrorMessageName('');
    }
  };
  const validateCvc = (value) => {
    let cvcValidation = valid.cvv(value);

    if (!cvcValidation.isValid && value !== '') {
      setErrorMessageCvc('Invalid Cvc');
    } else if (cvcValidation.isPotentiallyValid) {
      setErrorMessageCvc('');
    }
  };
  const validateExpiry = (value) => {
    let expiryValidation = valid.expirationDate(value);

    if (!expiryValidation.isValid && value !== '') {
      setErrorMessageExpiry('Invalid Expiry Date');
    } else if (expiryValidation.isPotentiallyValid) {
      setErrorMessageExpiry('');
    }
  };
  const clearFields = (e) => {
    setExpiry('');
    setNumber('');
    setName('');
    setCvc('');
    setErrorMessageNum('');
    setErrorMessageName('');
    setErrorMessageCvc('');
    setErrorMessageExpiry('');
  };
  return (
    <div className='container mt-5'>
      <div className='box justify-content-center align-items-center'>
        <div className='formDiv'>
          <div className='creditCard'>
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus}
              name={name}
              number={number}
            />
          </div>
          <form onSubmit={onSubmit}>
            <MaskedInput
              mask={[
                /[1-9]/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              className='form-control'
              name='number'
              placeholder='Card Number'
              value={number}
              //onChange={(e) => setNumber(e.target.value)}
              onChange={function (e) {
                setNumber(e.target.value);
                validateCardNumber(e.target.value);
              }}
              onFocus={(e) => setFocus(e.target.name)}
              required
            />
            <span
              style={{
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              {errorMessageNum}
            </span>
            &nbsp;&nbsp;
            <Form.Group>
              <Form.Control
                id='cardName'
                type='text'
                name='name'
                placeholder='Name'
                value={name}
                //onChange={(e) => setName(e.target.value)}
                onChange={function (e) {
                  setName(e.target.value);
                  validateName(e.target.value);
                }}
                onFocus={(e) => setFocus(e.target.name)}
                required
              />
            </Form.Group>
            <span
              style={{
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              {errorMessageName}
            </span>
            &nbsp;&nbsp;
            <Row>
              <Col>
                <MaskedInput
                  mask={[/[0-9]/, /\d/, '/', /\d/, /\d/]}
                  className='form-control'
                  name='expiry'
                  placeholder='MM/YY Expiry'
                  value={expiry}
                  onChange={function (e) {
                    setExpiry(e.target.value);
                    validateExpiry(e.target.value);
                  }}
                  //onChange={(e) => setExpiry(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                  required
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  {errorMessageExpiry}
                </span>
              </Col>
              <Col>
                <MaskedInput
                  mask={[/[0-9]/, /\d/, /\d/]}
                  className='form-control'
                  name='cvc'
                  placeholder='CVC'
                  value={cvc}
                  onChange={function (e) {
                    setCvc(e.target.value);
                    validateCvc(e.target.value);
                  }}
                  //onChange={(e) => setCvc(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                  required
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  {errorMessageCvc}
                </span>
              </Col>
            </Row>{' '}
            &nbsp;&nbsp;
            <Row>
              <Col>
                {' '}
                <Button
                  size={'block'}
                  data-testid='validateButton'
                  id='validateButton'
                  type='submit'
                >
                  Validate
                </Button>
              </Col>
              <Col>
                {' '}
                <Button
                  size={'block'}
                  data-testid='validateButton'
                  id='validateButton'
                  onClick={clearFields}
                  className='btn btn-warning'
                >
                  Clear Fields
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
