const React = require('react'); 
// TODO: Finding a formula to get a point on the circumference
// of the base circles

// newX = centerX + radius * cos(angle * pi / 180)

const centerX = 200;
const centerY = 150;
const radius = 100;

class CircleGraphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numCircles: props.numCircles,
      placement: props.placement,
    }
  }

  makeCircles() {
    var result = [];
    for (var i = 0; i < this.state.numCircles; i++) {
      var newX = centerX + radius * Math.cos((this.state.placement[i] + 90) * Math.PI / 180);
      var newY = centerY + radius * Math.sin((this.state.placement[i] + 90) * Math.PI / 180);
      result.push(<circle cx={newX} cy={newY} r="10" fill="#FF851B" opacity={0.5} />)
    }
    return result;
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div>
      <svg version="1.1"
            baseProfile="full"
            width="400" height="300"
            xmlns="http://www.w3.org/2000/svg">
          <g opacity={this.state.opacity}>
            <circle cx="200" cy="150" r="100" fill="black"/>  
            <circle cx="200" cy="150" r="110" stroke="black" fill="transparent" strokeWidth="8"/>
          </g>
          {this.makeCircles()}
      </svg>
      </div>
    )
  }
}

module.exports = CircleGraphic;