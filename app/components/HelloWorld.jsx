const React = require('react');
const UnorderedList = require('./UnorderedList');

const dependenciesArray = [
  'express - middleware for the node server',
  'react - for generating the views of the app',
  'webpack - for bundling all the javascript',
  'webpack loaders for css and jsx'
];

const componentsMade = [
  'HelloWorld - which is the view you are seeing now',
  'UnorderedList - which takes an array of "items" and returns a <ul> element with <li> elements of each of those items within it',
];

class HelloWorld extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      
        <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React! It uses 
          only a few dependencies to get you started on working with React:</p>
      
        <UnorderedList items={dependenciesArray} />
      
        <p>Look in <code>app/components/</code> for two example components:</p>
        
        <UnorderedList items={componentsMade} />
        
        <p>Note: You may not normally create a component for an unordered list, 
          but I did here just so I can show the power of code reuse by way of building components :)</p>
      </div>
    );
  }
}

module.exports = HelloWorld;