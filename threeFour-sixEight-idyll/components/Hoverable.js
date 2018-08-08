const React = require('react'); 

// TODO Hover text effect

class Hoverable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {word: this.props.word,
                  weight: "normal"};
  }

  display() {
    this.props.updateProps({
      display: true
    });
    this.setState({weight: "bold"});
  }

  reset() {
    this.props.updateProps({
      display: false
    });
    this.setState({weight: "normal"});
  }

  render() {
    return(
        <p onMouseEnter={this.display.bind(this)} onMouseLeave={this.reset.bind(this)}>
          <strong style={{color: "#087E8B", fontWeight: this.state.weight}}><ins>{this.state.word}</ins></strong>
        </p>
    )
  }
}

module.exports = Hoverable;