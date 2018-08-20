const React = require('react');
const Latex = require('react-latex-patched');

class Label extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }



  // Toggles play on and off and creates a synth


  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div id="labelThree">
        <Latex>$3\frac{3}{4}$</Latex>
      </div>
    )
  }
}

module.exports = Label;