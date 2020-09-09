import startPlayer from './player.js'
import startAskingMusic from './form.js'

startPlayer()
startAskingMusic()
if (
  location.host === '127.0.0.1:5500' ||
  location.host === 'localhost:5500'
) {
  console.log('Dev Mode')
  document.querySelectorAll('script#firebase').forEach(s => s.src = '')
}

