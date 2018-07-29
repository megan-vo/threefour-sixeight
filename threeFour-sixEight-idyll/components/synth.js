const React = require('react'); 
import CircleGraphic from './CircleGraphic.js';

var Tone;
var sampler;
var pattern;

class Synth extends React.Component {
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
        "E4" : "/static/sounds/hihat3.wav",
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
                       showText={this.props.steps % 2 === 1}/>
                        
        {/* <button onClick={this.playAudio.bind(this)}>
          {this.state.text}
        </button> */}
      </div>
    ]
  }
}

module.exports = Synth;


        // <svg version="1.1"
        //     baseProfile="full"
        //     width="400" height="300"
        //     xmlns="http://www.w3.org/2000/svg"
        //     onClick={this.playAudio.bind(this)}>

        //   <g opacity={this.state.opacity}>
        //     <circle cx="200" cy="150" r="100" fill="black"/>  
        //     <circle cx="200" cy="150" r="110" stroke="black" fill="transparent" strokeWidth="8"/>
        //   </g>
        //     <circle cx="200" cy="50" r="10" fill="#FF851B" opacity={beat % 3 === 1 ? 1 : 0.5} />
        //     <circle cx="200" cy="250" r="10" fill="#7FDBFF" opacity={beat % 3 === 2 ? 1 : 0.5}/>
        //     {/* <VictoryAnimation data={{rotate: this.state.rotation}}>
        //       {(data) =>{
        //         return( */}
        //           <line x1="200" y1="150" x2="200" y2="50" stroke="white" strokeWidth="5" transform={this.state.rotation}/>
        //     {/* //     );
        //     //   }}
        //     // </VictoryAnimation> */}
            
        // </svg>