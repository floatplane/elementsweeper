const React = require('react');

const containerStyle = {
  display: "flex",
  margin: "0 .5em .5em",
  backgroundColor: "#8CF",
  borderRadius: "5px"
}

const childBaseStyle = {
  
}

const childLabelContainerStyle = {
  width: "100%",
  lineHeight: "3em",
  display: "block"
}

const childLabelStyle = {
  display: "inline-block",
  width: "100%",
  padding: "0 .5em",
  lineHeight: "normal",
  verticalAlign: "middle",
}

module.exports = {
  containerStyle: containerStyle,
  childBaseStyle: childBaseStyle,
  childLabelContainerStyle: childLabelContainerStyle,
  childLabelStyle: childLabelStyle
}