const React = require('react');
import CircleGraphic from './CircleGraphic.js';

var Tone;
var player;

class AudioPlayerSix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.file
    }
  }

  componentDidMount() {
    Tone = require('tone');
    player = new Tone.Player("static/music/" + this.state.file).toMaster();
    this.setState({ mounted: true });
  }



  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  playAudio() {
    // Play the audio when loaded and clicked and the transport isn't playing anything
    if (this.state.mounted && !this.state.play && Tone.Transport.state === "stopped") {
      this.props.updateProps({
        sync: true
      })
      player.start();
      Tone.Transport.start();
    } else {
      this.turnOff();
    }
    document.getElementById("audioSixPtr").classList.add("hide");
  }

  turnOff() {
    this.props.updateProps({
      sync: false
    })
    Tone.Transport.stop();
    player.stop();
    document.getElementById("audioSixPtr").classList.remove("hide");
  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div className="hoverableAudio" onMouseEnter={this.playAudio.bind(this)} onMouseLeave={this.turnOff.bind(this)}>
        <h4>6/8</h4>
        <img id="audioSix" src={"static/images/audio.svg"} opacity={.2} />
        <img id="audioSixPtr" src={"static/images/Pointer.svg"} opacity={.2} />
      </div>
    )
  }
}

module.exports = AudioPlayerSix;