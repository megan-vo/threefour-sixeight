const React = require('react'); 

// TODO Hover text effect

// Works just like incrementer on the docs
class BeatCount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { upTo, beatCount, hasError, idyll, updateProps, ...props } = this.props;

    return(
        <div>
          <p align="center"><span id="1" style={beatCount === 1 ? {fontWeight: "bold"} : {}}>1 </span> 
             <span id="2" style={beatCount === 2 ? {fontWeight: "bold"} : {}}>2 </span> 
             <span id="3" style={beatCount === 3 ? {fontWeight: "bold"} : {}}>3</span></p>
        </div>
    )
  }
}

module.exports = BeatCount;