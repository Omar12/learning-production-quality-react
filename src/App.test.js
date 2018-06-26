import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch'
import App from './App';
import fetchMock from 'fetch-mock';
 
fetchMock.get('end:/todos', [{"id": 1,"name": "Create JSX","isComplete": true}]);
fetchMock.post('end:/todos', {});

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
