const React = require('react'); 

// TODO Hover text effect

// Works just like incrementer on the docs
class Clickable extends React.Component {
  increment() {
    this.props.updateProps({
      value: this.props.value + 1
    })
  }

  render() {
    return(
        <div onClick={this.increment.bind(this)}>
          <strong style={{color: "#087E8B"}}><ins>assign</ins></strong>
        </div>
    )
  }
}

module.exports = Clickable;