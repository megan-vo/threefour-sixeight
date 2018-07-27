const React = require('react'); 
// import Tone from 'tone';
var Tone;

class Synth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {play: true,
                  mounted: false,
                  text: "Start Audio"}
  }

  componentDidMount() {
      Tone = require('tone'); 
      this.setState({mounted: true});
  }

  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  createSynth() {
    this.setState({play: !this.state.play});

    if(this.state.mounted && this.state.play) {
        var synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease("C4", "8n");
        this.setState({text: "Stop Audio"});
    } else {
      this.setState({text: "Start Audio"});
    }
  }

  render() {
    const { mounted, play, hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div>
        <button onClick={this.createSynth.bind(this)}>
          {this.state.text}
        </button>
      </div>
    );
  }
}

// Synth.defaultProps = {
//   mounted: false,
//   play: false,
// }

module.exports = Synth;



// this.state.mounted && this.state.play % 2 === 0 ? createSynth() : hello()