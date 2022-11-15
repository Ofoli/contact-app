import React from 'react';

export default () => {
  return (
    <div data-test="aboutComponent">
      <h1 
      data-test="abouth1"
      className="display-4">About Contact Manager</h1>
      <p 
      data-test="aboutp"
      className="lead">Simple app to manage contacts</p>
      <p 
      data-test="aboutp"
      className="text-secondary">Version 1.0.0</p>
    </div>
  );
};
