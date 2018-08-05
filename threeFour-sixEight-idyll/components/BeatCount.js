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
      var beatCount = this.props.beatCount;
      if(this.props.upTo === 3) {
        var fontWeightAnd = (i === 1 && beatCount === 2 || 
                             i === 2 && beatCount === 4 || 
                             i === 3 && beatCount === 6) ? "bold" : "normal";
        result.push(<span style={{color: color}}>
                      <span id={i + ""} style={1/2 * beatCount + 1/2 === i ? {fontWeight: "bold", fontSize: "1em"} : {}}>{i + " "}</span>
                      <span id={i + "and"} style={{fontWeight: fontWeightAnd, fontSize: "0.7em"}}> and </span>
                    </span>);
      } else {
        var fontWeightAnd = (i === 1 && beatCount === 2 || i === 2 && beatCount === 5) ? "bold" : "normal";
        var fontWeightAh = (i === 1 && beatCount === 3 || i === 2 && beatCount === 6) ? "bold" : "normal";

        result.push(<span style={{color: color}}>
                      <span id={i + ""} style={1/3 * beatCount + 2/3 === i ? {fontWeight: "bold", fontSize: "1em"} : {}}>{i + " "}</span>
                      <span id={i + "and"} style={{fontWeight: fontWeightAnd, fontSize: "0.7em"}}> and </span> 
                      <span id={i + "ah"} style={{fontWeight: fontWeightAh, fontSize: "0.7em"}}>ah </span>
                    </span>)
      }
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