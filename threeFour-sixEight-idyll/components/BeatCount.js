const React = require('react'); 

// TODO Hover text effect

// Works just like incrementer on the docs
class BeatCount extends React.Component {
  constructor(props) {
    super(props);
  }

  beatCounts() {
    var result = [];
    for(var i = 1; i <= this.props.upTo; i++) {
      var color = i === 1 ? "#FF851B" : "#087E8B";
      result.push(<span><span id={i + ""} style={this.props.beatCount === i ? {fontWeight: "bold", color: color} : {}}>{i + " "}</span>and </span>);
    }
    return result;
  }

  render() {
    const { upTo, beatCount, hasError, idyll, updateProps, ...props } = this.props;

    return[
        <div>
          <p align="center">{this.beatCounts()}</p>
        </div>
    ]
  }
}

module.exports = BeatCount;