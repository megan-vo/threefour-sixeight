const React = require('react'); 

// import Tone from 'tone';
var Tone;
var synth;
var sampler;
var num;

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
          console.info(this.state.rotation);
          console.info(this.state.fill)
    }.bind(this), time);
  }

  // Function for time -> Angle

  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  playAudio() {
    this.setState({play: !this.state.play})
    // Play the audio when loaded and clicked
    var degrees = 0;
    if(this.state.mounted && this.state.play) {
        // Note that time is the duration of the note
        var pattern = new Tone.Pattern(function(time, note) {
          synth.triggerAttackRelease(note, .25);
          
          this.animateCircles(degrees, note, time);
          degrees += 60;
        }.bind(this), ["C4", "E4", "E4", "D4", "E4", "E4"]);
        pattern.start(0);

        
        Tone.Transport.start();
        this.setState({opacity: "1"});
        this.setState({text: "Stop Audio"});
    } else {
        Tone.Transport.stop();
        this.setState({text: "Start Audio"});
        this.setState({opacity: "0.8"});
    }

  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return [
      <div>
        <svg version="1.1"
            baseProfile="full"
            width="400" height="300"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.playAudio.bind(this)}>

          <g opacity={this.state.opacity}>
            <circle cx="200" cy="150" r="100" fill="black"/>  
            <circle cx="200" cy="150" r="110" stroke="black" fill="transparent" strokeWidth="8"/>
          </g>
            <circle cx="200" cy="50" r="10" fill="#FF851B" opacity={this.state.onBeat % 3 === 1 ? 1 : 0.5}/>
            <circle cx="200" cy="250" r="10" fill="#7FDBFF" opacity={this.state.onBeat % 3 === 2 ? 1 : 0.5}/>
            <line x1="200" y1="150" x2="200" y2="50" stroke="white" strokeWidth="5" transform={this.state.rotation}/>
        </svg>
        <button onClick={this.playAudio.bind(this)}>
          {this.state.text}
        </button>
      </div>
    ]
  }
}


module.exports = Synth;