import logo from './logo.svg';
import React, { useState, Component } from 'react'
import './App.css';

function App() {
  const [inputMessage, setMessage] = useState('');
  const [phoneNumber, setNumber] = useState(0);
  const [show, setShow] = useState(false);

  async function handleButtonClick(e) {
    e.preventDefault();
    const message = new URLSearchParams({
      message: inputMessage,
      number: phoneNumber
    })
    var response = await fetch('http://localhost:3001/send', {
      method: 'POST',
      body: message
    })
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
    console.log('button pressed')
    console.log(response)
  }

  function handleInput(e) {
    var name = e.target.name;
    var value = e.target.value;
    switch (name) {
      case 'inputMessage':
        setMessage(value)
      case 'phoneNumber':
        setNumber("whatsapp:+" + value)
    }
  }
  return (
    <div className="App">
      <div className='chunk'>
        <p>
          To Join Notifications: text "join population-tired" to +1(415)-523-8886 on WhatsApp!
        </p>
        <div className='inputs'>
          <input name='inputMessage' onChange={handleInput} placeholder='message'></input>
          <input name='phoneNumber' onChange={handleInput} placeholder='phone number'></input>
        </div>
        <div className='buttons'>
          <button onClick={handleButtonClick}> Send Message! </button>
        </div>
        <div className='notif'>
          <Notification show={show} />
        </div>
      </div>
    </div>
  );
}

class Notification extends React.Component {
  render() {
    return <span className={this.props.show ? 'show' : ''}> Message Sent! </span>
  }
}

export default App;
