import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MacApp } from './MacApp';

class App extends React.Component {
  render() {
    return (
      <div><MacApp/></div>
    );
    }
  };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
