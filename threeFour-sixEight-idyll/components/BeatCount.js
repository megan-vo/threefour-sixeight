const React = require('react'); 

// TODO Hover text effect

// Works just like incrementer on the docs
class BeatCount extends React.Component {
  constructor(props) {
    super(props);
  }

  boldLetters() {
    var beatCount = this.props.beatCount;
    var result = <p>1 2 3</p>;
    if(beatCount === 1)  {
      result = <p><strong>1</strong> 2 3</p>;
    } else if(beatCount === 2) {
      result = <p>1 <strong>2</strong> 3</p>;
    } else if(beatCount === 3) {
      result = <p>1 2 <strong>3</strong></p>;
    }
    return result;
  }

  render() {
    const { upTo, beatCount, hasError, idyll, updateProps, ...props } = this.props;

    return(
        <div>
          {this.boldLetters()}
        </div>
    )
  }
}

module.exports = BeatCount;