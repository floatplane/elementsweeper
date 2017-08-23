const React = require('react');

class UnorderedList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.items.map(function (i) {
        return <li key={i} index={i} />;
      })}
      </ul>
    );
  }
}

module.exports = HelloWorld;