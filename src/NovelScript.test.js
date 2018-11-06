import React from 'react';
import ReactDOM from 'react-dom';
import NovelScript from './NovelScript';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NovelScript />, div);
  ReactDOM.unmountComponentAtNode(div);
});
