import React from 'react';
import './App.css';
import { ObjectRecognition } from './components/ObjectRecognition'

function App() {
  return (
    <>
      <Header />
      <ObjectRecognition/>
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Bold Colors</h1>
    </header>
  );
}

export default App;
