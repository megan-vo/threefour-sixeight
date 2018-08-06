const React = require('react'); 
import { VictoryAnimation } from 'victory';

var Tone;
var pattern;
var sampler;

// TODO: Pass in beatNum to LinearBeats as a prop to line up with visualization

class LinearBeats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {play: false,
                  mounted: false,
                  text: "Start Audio",
                  opacity: "0.8",
                  onBeat: 0};
    }

    componentDidMount() {
        Tone = require('tone');
        // creates it once to avoid overlapping synths
        sampler = new Tone.Sampler({
          "E4" : "/static/sounds/hihat3.wav",
        }).toMaster();

        // To avoid overlapping patterns, declare here
        // Allows stop and start to end where it left off
        pattern = new Tone.Sequence(function(time, note) {
            this.animateCircles(note, time);
            sampler.triggerAttackRelease(note, .25);
        }.bind(this), ["E4", "E4", "E4", "E4", "E4", "E4"], "4n");

        // Make sure it is mounted before loading up
        // sampler
        this.setState({mounted: true});
    }

    // Animates the circle in sync with the current
    // note being played
    animateCircles(note, time) {
      Tone.Draw.schedule(function() {
            this.props.updateProps({
                beatNum: ((this.props.beatNum) % 6) + 1
            })

            this.setState({onBeat: this.state.onBeat + 1});
      }.bind(this), time);
    }

    // Function for time -> Angle

    // Toggles play on and off and creates a synth
    // to be played. Changes the button text to 
    // on/off
    playAudio() {
      // Play the audio when loaded and clicked and the transport isn't playing anything
      if(this.state.mounted && !this.state.play && Tone.Transport.state === "stopped") {
          this.setState({onBeat: 0});
          // this.props.updateProps({
          //   beatNum: 0
          // })

          // starts the transport and lets
          // us know that playback is on
          Tone.Transport.start();
          pattern.start(0);
          this.setState({opacity: "1"});
          this.setState({play: true});
      } else if(this.state.play) {
          // Stops transport and lets us know
          // playback is free to start playing
          // the next thing
          Tone.Transport.stop();
          pattern.stop();
          this.setState({opacity: "0.7"});
          this.setState({play: false});
      }
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    var beat = this.state.onBeat; // later switch to ternary when using props
    return (
      <div onClick={this.playAudio.bind(this)}>
        <svg version="1.1"
              baseProfile="full"
              width="100%" height="100%"
              xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="50" cy="50" r="12" fill="#D1495B" opacity={beat % 6 === 1 ? 1 : 0.7}/>  
              <circle cx="90" cy="50" r="12" fill="#D1495B" opacity={beat % 6 === 2 ? 1 : 0.7}/>
              <circle cx="130" cy="50" r="12" fill="#D1495B" opacity={beat % 6 === 3 ? 1 : 0.7}/>
              <circle cx="170" cy="50" r="12" fill="#D1495B" opacity={beat % 6 === 4 ? 1 : 0.7}/>
              <circle cx="210" cy="50" r="12" fill="#D1495B" opacity={beat % 6 === 5 ? 1 : 0.7}/>
              <circle cx="250" cy="50" r="12" fill="#D1495B" opacity={beat % 6 === 0 ? 1 : 0.7}/>
            </g>   
        </svg>
      </div>
    )
  }
}

module.exports = LinearBeats;