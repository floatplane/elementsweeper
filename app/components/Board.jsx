const React = require('react');

const Square = require('./Square');

function numb() {
  const number = Math.ceil(Math.random() * 9);
  return number;
}

const Board = function() {
  return (
    <div>
      <h3>Board</h3>
      <Square n={numb()} />
      <Square n={numb()} />
      <Square n={numb()} />
    </div>
  );
}

module.exports = Board;