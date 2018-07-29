const React = require('react'); 
import { VictoryAnimation } from 'victory';
import CircleGraphic from './CircleGraphic.js';

var Tone;
var sampler;
var pattern;

class ThreeFourDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {play: true,
                  mounted: false,
                  text: "Start Audio",
                  opacity: "0.8",
                  onBeat: 0,
                  rotation: "rotate(0  200 150)",
                  degrees: 0};
  }

  componentDidMount() {
      Tone = require('tone');
      // creates it once to avoid overlapping synths
      sampler = new Tone.Sampler({
        "C4" : "/static/sounds/bassdrum4.wav",
        "E4" : "/static/sounds/hihat3.wav",
        "D4" : "/static/sounds/snare.wav"
      }).toMaster();

      // To avoid overlapping patterns, declare here
      // Allows stop and start to end where it left off
      pattern = new Tone.Sequence(function(time, note) {
          this.animateCircles(note, time);
          sampler.triggerAttackRelease(note, .25);
      }.bind(this), ["C4", "E4", "D4", "E4", "D4", "E4"], "4n");

      // Make sure it is mounted before loading up
      // sampler
      this.setState({mounted: true});
  }

  // Animates the circle in sync with the current
  // note being played
  animateCircles(note, time) {
    Tone.Draw.schedule(function() {
          this.setState({onBeat: this.state.onBeat + 1});
          this.setState({rotation: "rotate(" + this.state.degrees + "  200 150)"});
          this.setState({degrees: this.state.degrees + 60});
    }.bind(this), time);
  }

  // Function for time -> Angle

  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  playAudio() {
    this.setState({play: !this.state.play})
    // Play the audio when loaded and clicked
    if(this.state.mounted && this.state.play) {
        this.setState({degrees: 0});
        this.setState({onBeat: 0});
        pattern.start(0);

        Tone.Transport.start();
        this.setState({opacity: "1"});
    } else {
        Tone.Transport.stop();
        pattern.stop();
        this.setState({opacity: "0.8"});
    }
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    var beat = this.state.onBeat;

    return [
      <div onClick={this.playAudio.bind(this)}>
        <CircleGraphic numCircles={3} placement={[90, 210, 330]} opacity={this.state.opacity}
                       miniOpacity={[beat % 6 === 1 ? 0.9 : 0.5, beat % 6 === 3 ? 0.9 : 0.5, beat % 6 === 5 ? 0.9 : 0.5]}
                       fill={["#FF851B", "#7FDBFF", "#7FDBFF"]} rotation={this.state.rotation}/>
      </div>
    ]
  }
}

module.exports = ThreeFourDemo;