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
  if (!a) return
  const buffer = a.createBuffer(1,96e3,48e3)
  const data = buffer.getChannelData(0)
  for (let i=96e3; i--;) data[i] = fn(i)
  const source = a.createBufferSource()
  source.buffer = buffer
  source.connect(a.destination)
  source.start()
}

const playMusic = (frequency) => {

  notes.forEach(([time, note]) => {
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
    gain.gain.linearRampToValueAtTime(0.5, a.currentTime + 0.5)
  } else {
    gain.gain.setValueAtTime(0.5, a.currentTime);
  }
  noise.start(a.currentTime)
}

const notes = [
  [1,9],[2,7],[3,9],[4,13],[5,17],[6,13],
  [7,9],[8,7],[9,9],[10,13],[11,17],[12,13],
  [13,9],[14,7],[15,9],[16,13],[17,17],[18,13],
  [19,9],[20,7],[21,9],[22,13],[23,17],[24,12],
  [25,9],[26,7],[27,9],[28,12],[29,18],[30,12],
  [31,9],[32,7],[33,9],[34,12],[35,18],[36,12],
  [37,9],[38,7],[39,9],[40,12],[41,18],[42,13],
  [43,10],[44,8],[45,10],[46,13],[47,18],[48,13],
  [49,10],[50,8],[51,10],[52,13],[53,18],[54,13],
]
const duration = 0.45
const musicVolume = 0.3
let crossFade = 0
const variations = [400, 440, 480, 460, 420, 440]
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
  playMusic(440)
  musicLoop = setInterval(() => {
    crossFade += duration
    variations.unshift(variation)
    variation = variations.pop()
    playMusic(variation)
  }, notes[notes.length - 1][0] * duration * 1000)
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