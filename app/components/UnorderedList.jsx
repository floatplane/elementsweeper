const React = require('react');

/* takes an array prop 'items' and returns a <ul> element 
   with each item as <li> elements */
class UnorderedList extends React.Component {

  render() {
    const items = this.props.items;
    return (
      <ul>
        {items.map(function(item, i) {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    );
  }
}

module.exports = UnorderedList;