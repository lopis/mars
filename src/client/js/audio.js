const playMusic = (frequency) => {

  notes.forEach(([time, note]) => {
    const o = a.createOscillator()
    const gain = a.createGain()
    o.connect(gain)
    gain.connect(a.destination)
    gain.gain.setValueAtTime(0.01, a.currentTime + time*duration)
    gain.gain.exponentialRampToValueAtTime(musicVolume, a.currentTime + time*duration + duration*0.05)
    gain.gain.setValueAtTime(musicVolume, a.currentTime + time*duration + duration*0.8)
    gain.gain.exponentialRampToValueAtTime(0.01, a.currentTime + time*duration + duration*1.5);
    o.frequency.value = frequency / 1.06 ** note
    o.start(a.currentTime + time*duration)
    o.stop(a.currentTime + time*duration + duration*1.5)
  })
}

const noiseBuffer = () => {
  var bufferSize = a.sampleRate;
  var buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  var output = buffer.getChannelData(0);

  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

let windValue = 0
let windVariation = 10
const playNoise = (fadeIn) => {
  const noise = a.createBufferSource();
  noise.buffer = noiseBuffer();
  var noiseFilter = a.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  windValue += Math.max(
    -windVariation,
    Math.min(
      windVariation, 2 * windVariation * Math.random() - windVariation
    )
  )
  noiseFilter.frequency.value = 100 + windValue;
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
  noise.stop(a.currentTime + 1)
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
const variations = [400, 460, 420, 440]
let variation = variations.pop()
let a

export const initMusic = () => {
  a = new AudioContext()

  playMusic(440)

  setInterval(() => {
    crossFade += duration
    variations.unshift(variation)
    variation = variations.pop()
    playMusic(variation)
  }, notes[notes.length - 1][0] * duration * 1000)

  playNoise(true)
  setInterval(() => {
    playNoise()
  }, 800)
}