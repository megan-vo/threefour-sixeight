const React = require('react'); 
import { VictoryAnimation } from 'victory';
import CircleGraphic from './CircleGraphic.js';

// import Tone from 'tone';
var Tone;
var synth;
var sampler;
var pattern;


class Synth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {play: true,
                  mounted: false,
                  text: "Start Audio",
                  opacity: "0.8",
                  onBeat: 0,
                  rotation: "rotate(0  200 150)"};
  }

  componentDidMount() {
      Tone = require('tone'); 

      // creates it once to avoid overlapping synths
      synth = new Tone.Synth().toMaster(); 
      sampler = new Tone.Sampler({
        "C4" : "/static/sounds/bassdrum4.wav",
        "E4" : "/static/sounds/hihat3.wav",
        "D4" : "/static/sounds/snare.wav"
      }).toMaster();

      // To avoid overlapping patterns, declare here
      // Allows stop and start to end where it left off
      var degrees = 0;
      pattern = new Tone.Pattern(function(time, note) {
          this.animateCircles(degrees, note, time);
          sampler.triggerAttackRelease(note, .25);
          degrees += 60;
        }.bind(this), ["C4", "E4", "E4", "D4", "E4", "E4"]);

      // Make sure it is mounted before loading up
      // sampler
      this.setState({mounted: true});
  }

  // Animates the circle in sync with the current
  // note being played
  animateCircles(degrees, note, time) {
    Tone.Draw.schedule(function() {
          if(note === "C4") {
            this.setState({onBeat: 1});
          } else if (note === "D4") {
            this.setState({onBeat: 2});
          } else {
            this.setState({onBeat: 3})
          }
          this.setState({rotation: "rotate(" + degrees + "  200 150)"});
          // console.info(this.state.rotation);
          // console.info(this.state.fill)
          console.info(note);
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
        // Note that time is the duration of the note
        
        pattern.start(0);

        Tone.Transport.start();
        this.setState({opacity: "1"});
        // this.setState({text: "Stop Audio"});
    } else {
        Tone.Transport.stop();
        // this.setState({text: "Start Audio"});
        this.setState({opacity: "0.8"});
    }

  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    var beat = this.state.onBeat;

    return [
      <div>
        <CircleGraphic numCircles={2} placement={[0, 180]}/>
        <svg version="1.1"
            baseProfile="full"
            width="400" height="300"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.playAudio.bind(this)}>

          <g opacity={this.state.opacity}>
            <circle cx="200" cy="150" r="100" fill="black"/>  
            <circle cx="200" cy="150" r="110" stroke="black" fill="transparent" strokeWidth="8"/>
          </g>
            <circle cx="200" cy="50" r="10" fill="#FF851B" opacity={beat % 3 === 1 ? 1 : 0.5} />
            <circle cx="200" cy="250" r="10" fill="#7FDBFF" opacity={beat % 3 === 2 ? 1 : 0.5}/>
            {/* <VictoryAnimation data={{rotate: this.state.rotation}}>
              {(data) =>{
                return( */}
                  <line x1="200" y1="150" x2="200" y2="50" stroke="white" strokeWidth="5" transform={this.state.rotation}/>
            {/* //     );
            //   }}
            // </VictoryAnimation> */}
            
        </svg>
        {/* <button onClick={this.playAudio.bind(this)}>
          {this.state.text}
        </button> */}
      </div>
    ]
  }
}


module.exports = Synth;