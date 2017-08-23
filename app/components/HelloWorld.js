const React = require('react');
const UnorderedList = require('./UnorderedList');

const technologiesArray = [
  'express',
  'react',
  'webpack',
  'webpack loaders for css and jsx'
];

class HelloWorld extends React.Component {

  render() {
    return (
      <div>
        <p>Hello World!</p>
      
        <UnorderedList items={technologiesArray} />
      </div>
    );
  }
}

module.exports = HelloWorld;