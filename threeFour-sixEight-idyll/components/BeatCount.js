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
                      <span id={i + "3"} style={1/2 * beatCount + 1/2 === i ? {fontWeight: "bold", fontSize: "1em"} : {}}>{i + " "}</span>
                      <span id={i + "and3"} style={{fontWeight: fontWeightAnd, fontSize: "0.7em", color: "#EDAE49"}}> and </span>
                    </span>);
      } else if(this.props.upTo === 2) {
        var fontWeightAnd = (i === 1 && beatCount === 2 || i === 2 && beatCount === 5) ? "bold" : "normal";
        var fontWeightAh = (i === 1 && beatCount === 3 || i === 2 && beatCount === 6) ? "bold" : "normal";

        result.push(<span style={{color: color}}>
                      <span id={i + "6"} style={1/3 * beatCount + 2/3 === i ? {fontWeight: "bold", fontSize: "1em"} : {}}>{i + " "}</span>
                      <span id={i + "and6"} style={{fontWeight: fontWeightAnd, fontSize: "0.7em", color: "#EDAE49"}}> and </span> 
                      <span id={i + "ah6"} style={{fontWeight: fontWeightAh, fontSize: "0.7em", color: "#EDAE49"}}>ah </span>
                    </span>)
      } else {
        result.push(<span style={{color: "#EDAE49"}}>
                      <span id={i + "default"} style={beatCount === i ? {fontWeight: "bold", fontSize: "1em"} : {}}>{i + " "}</span>
                    </span>)
      }
    }
    return result;
  }

  hoverOn() {
    this.props.updateProps({
      hover: true
    })
  }

  hoverOff() {
    this.props.updateProps({
      hover: false
    })
  }

  render() {
    const {hasError, idyll, updateProps, ...props } = this.props;

    return[
        <div onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>
          <p align="center">{this.props.upTo !== 0 ? this.beatCounts() : () => {}}</p>
        </div>
    ]
  }
}

module.exports = BeatCount;