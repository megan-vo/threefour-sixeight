const React = require('react'); 

class CircleGraphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numCircles: props.numCircles,
      placement: props.placement,
    }
  }
}

module.exports = CircleGraphic;