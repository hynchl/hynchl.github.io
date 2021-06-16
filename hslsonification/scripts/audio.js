// define elements for test
// let initBtn = document.querySelector('#init');
// let whiteNoiseBtn = document.querySelector('#whitenoise');
// let envelopBtn = document.querySelector('#envelope');
// let frequencyBtn = document.querySelector('#frequency');
// let filterCutoffSlider = document.querySelector('#cutoff');
// let filterQSlider = document.querySelector('#Q');
// let playHueBtn = document.querySelector('#playhue');
// let playHueSlider = document.querySelector('#playhue-slider');
// let delayBtn = document.querySelector('#delay-test-button');
// initBtn.addEventListener('click', init, false);
// whiteNoiseBtn.addEventListener('click', playWhiteNoise, false);
// envelopBtn.addEventListener('click', testEnvelope, false);
// frequencyBtn.addEventListener('click', testFrequency, false);
// delayBtn.addEventListener('click', TestDelay, false);
// filterCutoffSlider.addEventListener('input', function () {
//   filter.frequency.value = filterCutoffSlider.value;
//   filter.Q.value = filterQSlider.value;
//   console.log("good", filter.frequency);
// }, false);
// playHueBtn.addEventListener('click', testHuePlay, false);
// playHueSlider.addEventListener('input', function () {
//   hueFrequency = playHueSlider.value;
// }, false);


// making audio context and master gain
let audioContext= new AudioContext();
const channels = 2;
let main = audioContext.createGain();
main.gain.value = 0.1;
main.connect(audioContext.destination);
let filter = new BiquadFilterNode(audioContext, {type:'lowpass'});
let cutoff = 350;
let hueFrequency = 200;


function initialize() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    // ac = new AudioContext();

    let osc1 = audioContext.createOscillator();
    osc1.frequency.value = 220;
    osc1.start();
    osc1.connect(main);

  }
  catch(e) {
    console.log(e)
    alert('Web Audio API is not supported in this browser');

  }
}


function playWhiteNoise(){
  const buffer = GetWhiteNoise(1);
  let source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(main);
  source.start();
}

function GetWhiteNoise(duration) {
  console.log("Play White Noise");

  let frameCount = audioContext.sampleRate * duration;
  let myArrayBuffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);

  for (let channel=0; channel<channels; channel++) {
    let nowBuffering = myArrayBuffer.getChannelData(channel);
    for (let i=0; i<frameCount; i++) {
      nowBuffering[i] = Math.random() * 2 - 1;
    }
  }
  return myArrayBuffer;
}

function applyEnvelope(source, attack, sustain, decay, padding=44100) {
  const envelope = attack.concat(sustain, decay);

  let outcome = audioContext.createBuffer(channels, envelope.length+padding, audioContext.sampleRate);

  for (let channel=0; channel<channels; channel++) {
    let outcomeBuffering = outcome.getChannelData(channel);
    let sourceBuffering = source.getChannelData(channel);
    for (let i=0; i<envelope.length; i++) {
      outcomeBuffering[i] = sourceBuffering[i] * envelope[i]
    }
  }

  return outcome
}

function TestFrequency() {

  const attackDuration = 0.01;
  const sustainDuration = 0.5;
  const decayDuration = 0.2;

  let attack = arr.linspace(0, 1, attackDuration*audioContext.sampleRate);
  let sustain = arr.linspace(1, 1, sustainDuration*audioContext.sampleRate);
  let decay = arr.linspace(1, 0, decayDuration*audioContext.sampleRate);

  const whiteNoise = GetWhiteNoise(5);
  let buffer = applyEnvelope(whiteNoise, attack, sustain, decay);
  let source = audioContext.createBufferSource();

  source.buffer = buffer;
  filter.connect(main);
  source.start();

  setTimeout(TestFrequency, 60000/bpm/2);
}

function TestFrequency3() {

  const attackDuration = 0.01;
  const sustainDuration = 0.02;
  const decayDuration = 0.05;

  let attack = arr.linspace(0, 1, attackDuration*audioContext.sampleRate);
  let sustain = arr.linspace(1, 1, sustainDuration*audioContext.sampleRate);
  let decay = arr.linspace(1, 0, decayDuration*audioContext.sampleRate);

  const wave1 = GetSineWave(220, 5);
  const wave2 = GetSquareWave(440, 5);
  const wave3 = GetSineWave(20, 5);
  const wave = AddWaves([wave1, wave2, wave3], [2, 1, 1]);
  let buffer = applyEnvelope(wave2, attack, sustain, decay);
  let source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(main);
  source.start();

  setTimeout(TestFrequency2, 60000/bpm);
}

function TestFrequency2() {

  const attackDuration = 0.01;
  const sustainDuration = 0.01;
  const decayDuration = 0.1;

  let attack = arr.linspace(0, 1, attackDuration*audioContext.sampleRate);
  let sustain = arr.linspace(1, 1, sustainDuration*audioContext.sampleRate);
  let decay = arr.linspace(1, 0, decayDuration*audioContext.sampleRate);

  const wave1 = GetSineWave(880, 5);
  const wave2 = GetSquareWave(440, 5);
  const wave3 = GetSineWave(20, 5);
  const wave = AddWaves([wave1, wave2, wave3], [1,2,1]);
  let buffer = applyEnvelope(wave2, attack, sustain, decay);
  let source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(main);
  source.start();

  setTimeout(TestFrequency3, 60000/bpm/2);
  setTimeout(TestFrequency2, 60000/bpm/3);
  setTimeout(TestFrequency3, 60000/bpm/4);
}

function GetSineWave(frequency, duration) {
  // frequency
  // duration(sec)

  let frameCount = audioContext.sampleRate * duration;
  let buffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);

  for (let channel=0; channel<channels; channel++) {
    let nowBuffering = buffer.getChannelData(channel);
    let t = 0;
    for (let i=0; i<frameCount; i++) {
      nowBuffering[i] = Math.sin(t) //Math.random() * 2 - 1;
      t += (1/audioContext.sampleRate) * frequency * 2 * Math.PI;
    }
  }
  return buffer;
}

function GetSquareWave(frequency, duration, pulse=0.5) {
  // frequency
  // duration(sec)

  let frameCount = audioContext.sampleRate * duration;
  let buffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);

  for (let channel=0; channel<channels; channel++) {
    let nowBuffering = buffer.getChannelData(channel);
    let t = 0;
    for (let i=0; i<frameCount; i++) {
      let progress = t*frequency - Math.floor(t*frequency);
      if (progress < pulse) nowBuffering[i] = 1;
      else                  nowBuffering[i] = -1;

      t += (1/audioContext.sampleRate) * frequency * 2 * Math.PI;
    }
  }
  return buffer;
}

function GetTriangleWave(frequency, duration) {
  // frequency
  // duration(sec)

  let frameCount = audioContext.sampleRate * duration;
  let buffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);

  for (let channel=0; channel<channels; channel++) {
    let nowBuffering = buffer.getChannelData(channel);
    let t = 0;
    for (let i=0; i<frameCount; i++) {
      let progress = t*frequency - Math.floor(t*frequency);
      nowBuffering[i] = progress * 2 - 1;

      t += (1/audioContext.sampleRate) * frequency * 2 * Math.PI;
    }
  }
  return buffer;
}

function midi2freq(m) {
  return 440 * Math.pow(2, (m - 69) / 12.0);
}; 

function AddWaves(waves, weights){
  // waves : Array of waves

  // set buffer length
  let waveslength = new Array(waves.length);
  for (let i = 0; i < waveslength.length; i++){
    waveslength[i] = waves[i].getChannelData(0).length;
  }
  let frameCount = arr.max(waveslength);
  let buffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);

  // sum values
  for (let w=0; w<waves.length; w++){
    for (let channel=0; channel<channels; channel++) {
      let outBuffering = buffer.getChannelData(channel);
      let inBuffering = waves[w].getChannelData(channel);
      for (let i=0; i<frameCount; i++) {
        if (typeof(weights) != null) {
          outBuffering[i] += inBuffering[i] * weights[w]; 
        }else{
          outBuffering[i] += inBuffering[i]; 
        }
      }
    }
  }
  
  // normalize
  for (let channel=0; channel<channels; channel++) {
      let outBuffering = buffer.getChannelData(channel);
      outBuffering = arr.normalize(outBuffering);
  }

  return buffer;
}

function ArrayToAudioBuffer (array, duration){

  let frameCount = audioContext.sampleRate * duration;
  let buffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);
  let sample = arr.resample(array, frameCount);
  for (let channel=0; channel<channels; channel++) {
    let nowBuffering = buffer.getChannelData(channel);
    for (let i=0; i<frameCount; i++) {
      nowBuffering[i] = sample[i];
    }
    nowBuffering = arr.normalize(nowBuffering);
  }
  return buffer;
}

function ArrayToWave (array, frequency, duration){

  let frameCount = audioContext.sampleRate * duration;
  let unitLength = Math.floor(audioContext.sampleRate / frequency);
  let buffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate);
  let sample = arr.resample(array, unitLength);
  for (let channel=0; channel<channels; channel++) {
    let nowBuffering = buffer.getChannelData(channel);
    for (let i=0; i<frameCount; i++) {
      nowBuffering[i] = sample[i%unitLength];
    }
    nowBuffering = arr.normalize(nowBuffering);
  }
  return buffer;

}

function TestPlayHue(){
  let _h = arr.normalize(arr.getLengths(hueHist));
  let _s = arr.normalize(arr.getLengths(saturationHist));
  let _l = arr.normalize(arr.getLengths(lightnessHist));
  
  let note1 = getRandomNote(min=45, max=71);
  let note2 = note1 + 2
  let note3 = note1 + 5
  let buffer1 = ArrayToWave(_h, midiToFreq(note1), 1);
  let buffer2 = ArrayToWave(_h, midiToFreq(note2), 1);
  let buffer3 = ArrayToWave(_h, midiToFreq(note3), 1);

  let buffer = AddWaves([buffer1, buffer2, buffer3], [1,1,1]);
  let attack = arr.linspace(0, 1, 0.05*audioContext.sampleRate);
  let sustain = arr.linspace(1, 1, 0.1*audioContext.sampleRate);
  let decay = arr.linspace(1, 0, 0.2*audioContext.sampleRate);

  buffer = applyEnvelope(buffer, attack, sustain, decay);  
  let source = audioContext.createBufferSource();
  let delay = audioContext.createDelay();
  delay.delayTime.value = 0.2;
  
  source.buffer = buffer;
  source.connect(delay);
  source.connect(main);
  delay.connect(main);
  source.start();

}

function getRandomNote (min=21, max=108) {
  return m = Math.floor(Math.random() * (max - min + 1)) + min;
}