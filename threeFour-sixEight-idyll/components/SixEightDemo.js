const React = require('react'); 
import CircleGraphic from './CircleGraphic.js';

var Tone;
var sampler;
var pattern;

class SixEightDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {play: false,
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
        "E4" : "/static/sounds/silence.mp3",
        "D4" : "/static/sounds/snare.wav"
      }).toMaster();

      // To avoid overlapping patterns, declare here
      // Allows stop and start to end where it left off
      pattern = new Tone.Sequence(function(time, note) {
          this.animateCircles(note, time);
          sampler.triggerAttackRelease(note, .25);
      }.bind(this), ["C4", "E4", "E4", "D4", "E4", "E4"], "4n");

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

    // Play the audio when loaded and clicked
    if(this.state.mounted && !this.state.play && Tone.Transport.state === "stopped") {
        this.setState({play: true})
        this.setState({degrees: 0}); 
        this.setState({onBeat: 0});    
        pattern.start(0);
        Tone.Transport.start();
        this.setState({opacity: "1"});
    } else if(this.state.play) {
        this.setState({play: false})
        Tone.Transport.stop();
        pattern.stop();
        this.setState({opacity: "0.7"});
    }
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    var beat = this.state.onBeat;
    return [
      <div onClick={this.playAudio.bind(this)}>
        <CircleGraphic numCircles={2} placement={[90, 270]} opacity={this.state.opacity}
                       miniOpacity={[beat % 6 === 1 ? 0.9 : 0.5, beat % 6 === 4 ? 0.9 : 0.5]}
                       fill={["#FF851B", "#087E8B"]} rotation={this.state.rotation}
                       showText={this.props.steps % 2 === 1}
                       name="SixEight"/>
                        
        {/* <button onClick={this.playAudio.bind(this)}>
          {this.state.text}
        </button> */}
      </div>
    ]
  }
}

module.exports = SixEightDemo;