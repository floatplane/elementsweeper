const React = require('react');

const Square = require('./Board');

function number() {
  const number = Math.ceil(Math.random() * 9);
  return number;
}

const Board = function() {
  return (
    <div>
      <h3>Board</h3>
      <Square n={number()} />
    </div>
  );
}

module.exports = Board;