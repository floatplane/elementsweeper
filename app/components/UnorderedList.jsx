const React = require('react');

class UnorderedList extends React.Component {

  render() {
    const items = this.props.items;
    return (
      <ul>
        {items.map(function(i) {
          return <li key={i}>{items[i]}</li>;
        })}
      </ul>
    );
  }
}

module.exports = UnorderedList;