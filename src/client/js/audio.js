// t=(i,n)=>(n-i)/n;


export const warning = (i) => {
  var n=2e4;
  if (i > n) return null;
  return Math.sin(i/20 - Math.sin(i/100)*Math.sin(i/61))  *Math.sin(2 * i / 2e4 * Math.PI) * 0.5;
}

export const notification = (i) => {
  var n=8e3;
  if (i > n) return null;
  return Math.sin(i/5 - Math.sin(i/2))  *Math.sin(i / (n/2) * Math.PI) * 0.2;
}

export const woah = (i) => {
  var n=2e4;
  if (i > n) return null;
  return Math.sin(i*0.0006*Math.sin(0.009*i)+Math.sin(i/400))*(n-i)/n*0.5;
}

export const haow = i => {
  var n=2e4;
  if (i > n) return null;
  i = n - i
  return Math.sin(i*0.0006*Math.sin(0.009*i)+Math.sin(i/400))*(n-i)/n*0.5;
}

// Sound player
export const playSound = (fn) => {
  if (!a || !noise) return
  const buffer = a.createBuffer(1,96e3,48e3)
  const data = buffer.getChannelData(0)
  for (let i=96e3; i--;) data[i] = fn(i)
  const source = a.createBufferSource()
  source.buffer = buffer
  source.connect(a.destination)
  source.start()
}

const playMusic = (frequency) => {

  notes.forEach((note, time) => {
    const osc = a.createOscillator()
    const gain = a.createGain()
    osc.connect(gain)
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.01, a.currentTime + time*duration)
    gain.gain.exponentialRampToValueAtTime(musicVolume, a.currentTime + time*duration + duration*0.05)
    gain.gain.setValueAtTime(musicVolume, a.currentTime + time*duration + duration*0.8)
    gain.gain.exponentialRampToValueAtTime(0.01, a.currentTime + time*duration + duration*1.5);
    osc.frequency.value = frequency / 1.06 ** note
    osc.start(a.currentTime + time*duration)
    osc.stop(a.currentTime + time*duration + duration*1.5)
  })
}

const noiseBuffer = () => {
  var bufferSize = a.sampleRate * 2;
  var buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  var output = buffer.getChannelData(0);

  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

const startNoiseLoop = (fadeIn) => {
  const a = new AudioContext()
  noise = a.createBufferSource();
  noise.loop = true
  noise.buffer = noiseBuffer();
  var noiseFilter = a.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 200;
  noise.connect(noiseFilter);
  const gain = a.createGain();
  noiseFilter.connect(gain);
  gain.connect(a.destination);
  if (fadeIn) {
    gain.gain.setValueAtTime(0.01, a.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, a.currentTime + 0.5)
  } else {
    gain.gain.setValueAtTime(0.35, a.currentTime);
  }
  noise.start(a.currentTime)
}

const notes = [
  9,7,9,13,17,13,
  9,7,9,13,17,13,
  9,7,9,13,17,12,

  9,7,9,12,18,12,
  9,7,9,12,18,12,
  9,7,9,12,18,13,

  10,8,10,13,18,13,
  10,8,10,13,18,13,
  10,8,10,13,17,12,
]
const duration = 0.55
const musicVolume = 0.3
let crossFade = 0
const variations = [420, 400, 420, 440, 460, 480, 460, 440]
let variation = variations.pop()
/**
 * @type {AudioContext}
 */
let a
/**
 * @type {AudioBufferSourceNode}
 */
let noise
let musicLoop

const startMusicLoop = () => {
  a = new AudioContext()
  playMusic(variation)
  musicLoop = setInterval(() => {
    crossFade += duration
    variations.unshift(variation)
    variation = variations.pop()
    playMusic(variation)
  }, notes.length * duration * 1000)
}

export const initAudio = () => {
  startMusicLoop()
  startNoiseLoop(true)
}

export const toggleSoundEffects = () => {
  if (noise) {
    noise.stop()
    noise = null
  } else {
    startNoiseLoop(true)
  }
}

export const toggleMusic = () => {
  if (musicLoop) {
    a.close()
    clearInterval(musicLoop)
    musicLoop = null
  } else {
    startMusicLoop(true)
  }
}