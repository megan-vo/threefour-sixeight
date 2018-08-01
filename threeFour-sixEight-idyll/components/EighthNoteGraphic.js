const React = require('react'); 
import CircleGraphic from './CircleGraphic.js';

// WARNING: NaN probably due to not specifying
// text coordinates 

// Map -> opacity and color

var Tone;
var samplerDefault;
var samplerRhythm; // for 6/8 and 3/4

const threeFourPattern = ["C4", "E4", "D4", "E4", "D4", "E4"];
const sixEightPattern = ["C4", "E4", "E4", "D4", "E4", "E4"];
const defaultPattern = ["C4", "C4", "C4", "C4", "C4", "C4"];

const defaultColors = ["#C1839F", "#C1839F", "#C1839F", "#C1839F", "#C1839F", "#C1839F"];
const threeFourColors = ["#FF851B", "#FF851B", "#087E8B", "#087E8B", "#C1839F", "#C1839F"];
const sixEightColors = ["#FF851B", "#FF851B", "#FF851B", "#087E8B", "#087E8B", "#087E8B"];

class EighthNoteGraphic extends React.Component {
  // Toggles between 6/8 and 3/4
  constructor(props) {
    super(props);
    this.state = {play: false,
              mounted: false,
              text: "Start Audio",
              opacity: "0.8",
              onBeat: 0,
              rotation: "rotate(0  200 150)",
              degrees: 0,
              mode: 0};
  }


render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    var beat = this.state.onBeat;

    var modeFill = this.state.mode === 0 ? defaultColors : this.state.mode === 1 ? sixEightColors : threeFourColors;
    return [
      <div onClick={() => {}}>
        <CircleGraphic numCircles={6} placement={[90, 150, 210, 270, 330, 390]} opacity={this.state.opacity}
                       miniOpacity={[0.5, 0.5, 0.5, 0.5, 0.5, 0.5]}
                       fill={modeFill} 
                       rotation={this.state.rotation}
                       showText={this.props.steps % 2 === 1}/>
                        
      </div>,
      <button onClick={() => {}}>
          {this.state.text}
      </button>
    ]
  }
}

module.exports = EighthNoteGraphic;


  //   super(props);
  //   this.state = {mode: 0, // default 3/4 6/8
  //                 onBeat: 0,
  //                 rotation: "rotate(0  200 150)",
  //                 degrees: 0,
  //                 currPattern: defaultPattern,
  //                 currSequence: null,
  //                 mounted: false,
  //                 play: false,
  //                 sampler: null,
  //                 text: "ThreeFour!"};
  // }

  // componentDidMount() {
  //   Tone = require('tone');

  //   samplerDefault = new Tone.Sampler({
  //       "C4" : "/static/sounds/hihat3.wav",
  //   }).toMaster();

  //   samplerRhythm = new Tone.Sampler({
  //       "C4" : "/static/sounds/bassdrum4.wav",
  //       "E4" : "/static/sounds/hihat3.wav",
  //       "D4" : "/static/sounds/snare.wav"
  //   }).toMaster();

  //   this.setState({sampler: samplerDefault});

  //   this.setState({currSequence: new Tone.Sequence(function(time, note) {
  //         this.animateCircles(note, time);
  //         this.state.sampler.triggerAttackRelease(note, .25);
  //       }.bind(this), this.state.currPattern, "4n")});
    
  //   this.setState({mounted: true});
  // }

  // // Animates the circle in sync with the current
  // // note being played
  // animateCircles(note, time) {
  //   Tone.Draw.schedule(function() {
  //         this.setState({degrees: this.state.degrees + 60});
  //         this.setState({rotation: "rotate(" + this.state.degrees + "  200 150)"});
  //         this.setState({onBeat: this.state.onBeat + 1});
  //   }.bind(this), time);
  // }

  // // Function for time -> Angle

  // // Toggles play on and off and creates a synth
  // // to be played. Changes the button text to 
  // // on/off
  // playAudio() {

  //   // Play the audio when loaded and clicked
  //   if(this.state.mounted && !this.state.play && Tone.Transport.state === "stopped") {
  //       this.setState({play: true})
  //       this.setState({degrees: 0}); 
  //       this.setState({onBeat: 0});

  //       this.state.currSequence.start(0);
  //       Tone.Transport.start();
  //       this.setState({opacity: "1"});
  //   } else if(this.state.play) {
  //       this.setState({play: false})
  //       Tone.Transport.stop();
  //       this.state.currSequence.stop();
  //       this.setState({opacity: "0.7"});
  //   }
  // }

  // modeOpacity(beat) {
  //   var results = [];
  //   if(this.state.mode === 0) {
  //       for(var i = 0; i < 6; i++) {
  //         results.push(beat % 6 === i ? 0.9 : 0.5);
  //       }
  //   } else if(this.state.mode === 1) {

  //   } else {

  //   }
  //   return results;
  // }

  // switchModes() {
  //   this.setState({mode: (this.state.mode + 1) % 3});
  //   if(this.state.mode === 0) {
  //     this.setState({text: "ThreeFour!"});
  //     this.setState({sampler: samplerDefault});
  //     this.setState({currPattern: defaultPattern});
  //   } else {
  //     this.setState({sampler: samplerRhythm});
  //     if(this.state.mode === 1) {
  //       this.setState({text: "SixEight!"});
  //       this.setState({currPattern: threeFourPattern});
  //     } else {
  //       this.setState({currPattern: sixEightPattern});
  //       this.setState({text: "Default!"});
  //     }
  //   }
  //   this.setState({currSequence: new Tone.Sequence(function(time, note) {
  //         this.animateCircles(note, time);
  //         this.state.sampler.triggerAttackRelease(note, .25);
  //   }.bind(this), this.state.currPattern, "4n")});
  // }