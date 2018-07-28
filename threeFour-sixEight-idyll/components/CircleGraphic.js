const React = require('react'); 
// TODO: Finding a formula to get a point on the circumference
// of the base circles

// newX = centerX + radius * cos(angle * pi / 180)

const centerX = 200;
const centerY = 150;
const radius = 100;
var result = [];

class CircleGraphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numCircles: props.numCircles,
      placement: props.placement,
    };

    for (var i = 0; i < this.state.numCircles; i++) {
      var newX = centerX + radius * Math.cos((this.state.placement[i] + 180) * Math.PI / 180);
      var newY = centerY + radius * Math.sin((this.state.placement[i] + 180) * Math.PI / 180);
      result.push(<circle cx={newX} cy={newY} r="10" fill={this.props.fill[i]} />)
    }
  }

  makeCircles() {
      var newResult = [];
      for(var i = 0; i < result.length; i++) {
          newResult.push(<g opacity={this.props.miniOpacity[i]}>{result[i]}</g>);
      }
      return newResult;
  }

  render() {
    const { opacity, hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div>
      <svg version="1.1"
            baseProfile="full"
            width="400" height="300"
            xmlns="http://www.w3.org/2000/svg">
          <g opacity={this.props.opacity}>
            <circle cx="200" cy="150" r="100" fill="black"/>  
            <circle cx="200" cy="150" r="110" stroke="black" fill="transparent" strokeWidth="8"/>
          </g>
          {/* <g opacity={this.props.miniOpacity[0]}> */}
            {this.makeCircles()}
          {/* </g> */}
          {/* <VictoryAnimation data={{rotate: this.state.rotation}}>
              {(data) =>{
                return( */}
                  <line x1="200" y1="150" x2="200" y2="50" stroke="white" strokeWidth="5" transform={this.props.rotation}/>
            {/* //     );
            //   }}
            // </VictoryAnimation> */}
      </svg>
      </div>
    )
  }
}

module.exports = CircleGraphic;