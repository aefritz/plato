import React from 'react';
import logo from './logo.svg';
import './App.css';
import JSONEditor from './components/JSONEditor';
import Sandbox from './components/Sandbox';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux';

const store = createStore(reducer);

function App(props) {
  return (
    <div className="App">
      <JSONEditor editor="source" path="source"/>
      <JSONEditor editor="output" path="output"/>
      {Boolean(Reflect.ownKeys(props.mappings).length) && <Sandbox/>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(App);
