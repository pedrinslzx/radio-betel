import { getOption, setOption } from "./options.js";

const playButton = document.getElementById('play-button')
const muteButton = document.querySelector('#mute')
const volume = document.querySelector('input#vol-control')
const audio = document.createElement('audio');
const icons = {
  play: '<i class="fas fa-play"></i>',
  pause: '<i class="fas fa-pause"></i>',
  mute: '<i class="fas fa-volume-mute"></i>',
  volumeUp: '<i class="fas fa-volume-up"></i>',
  volumeDown: '<i class="fas fa-volume-down"></i>',
  volumeOff: '<i class="fas fa-volume-off"></i>'
};
const states = {
  play: true,
  mute: icons.volumeUp,
  volume: 50
}

function setVolume(value) {
  audio.volume = value / 100;
  states.volume = value
  setOption('volume', value)
  if (value <= 2) {
    states.mute = icons.mute
    if (!audio.muted) {
      muteButton.innerHTML = icons.mute
    }
  } else if (value <= 10) {
    states.mute = icons.volumeOff
    if (!audio.muted) {
      muteButton.innerHTML = icons.volumeOff
    }
  } else if (value <= 30) {
    states.mute = icons.volumeDown
    if (!audio.muted) {
      muteButton.innerHTML = icons.volumeDown
    }
  } else if (value >= 50) {
    states.mute = icons.volumeUp
    if (!audio.muted) {
      muteButton.innerHTML = icons.volumeUp
    }
  }
}
function togglePlayPause(to) {
  if (to) {
    if (to.pause) {
      setOption('play', false)
      audio.pause()
      playButton.innerHTML = icons.play
      states.play = false
      return;
    } else if (to.play) {
      audio.play()
      setOption('play', true)
      playButton.innerHTML = icons.pause
      states.play = true
      return;
    }
  }
  if (states.play) {
    audio.pause()
    setOption('play', false)
    playButton.innerHTML = icons.play
    states.play = false
    return;
  } else {
    audio.play()
    setOption('play', true)
    playButton.innerHTML = icons.pause
    states.play = true
    return;
  }
}
function toggleMuted(mute) {
  if (mute) {
    audio.muted = false;
  }
  audio.muted = !audio.muted;
  muteButton.innerHTML = audio.muted ? icons.mute : states.mute;
  if (audio.muted) {
    volume.value = 0
  } else {
    volume.value = states.volume;
    setVolume(states.volume)
  }
}
export default () => window.addEventListener("load", () => {
  volume.value = getOption('volume', 50)
  setVolume(getOption('volume', 50))
  if (getOption('muted', false)) toggleMuted(true)
  audio.setAttribute('src', 'https://ssl.xcast.com.br:11492/;type=mp3')
  audio.addEventListener("canplay", e => {
    if (getOption('play', true)) {
      togglePlayPause({
        play: true
      })
    }
  })
  muteButton.addEventListener('click', (e) => {
    e.preventDefault()
    setOption('muted', !audio.muted)
    toggleMuted()
  })
  playButton.addEventListener("click", (e) => {
    e.preventDefault()
    togglePlayPause()
  });
  volume.oninput = (e) => setVolume(e.target.value);
  volume.onchange = (e) => {
    setVolume(e.target.value)
    if (e.target.value <= 10) {
      states.mute = icons.volumeOff
      if (!audio.muted) {
        muteButton.innerHTML = icons.volumeOff
      }
    } else if (e.target.value <= 30) {
      states.mute = icons.volumeDown
      if (!audio.muted) {
        muteButton.innerHTML = icons.volumeDown
      }
    } else if (e.target.value >= 50) {
      states.mute = icons.volumeUp
      if (!audio.muted) {
        muteButton.innerHTML = icons.volumeUp
      }
    }
  };
  window.addEventListener('resize', () => {
    if (volume.style.display === 'none') {
      setVolume(100)
    }
  })
  document.body.append(audio);
})

