const pixelSampleNum = 1000;
const W = 400, H=600;


let capture;
let hue = new Array(pixelSampleNum);
let saturation = new Array(pixelSampleNum);
let lightness = new Array(pixelSampleNum);
let prevhue = new Array(pixelSampleNum);

let R = new Array(pixelSampleNum);
let G = new Array(pixelSampleNum);
let B = new Array(pixelSampleNum);

let osc, playing, freq, amp;
let polySynth;
let bins = 50;

let hueHist = new Array(bins);
let saturationHist = new Array(bins);
let lightnessHist = new Array(bins);

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function setup() {
  let cnv = createCanvas(W,H);
  cnv.mouseClicked(initializeSound)
  pixelDensity(1);


  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
  };
  if (isMobile()) {
    capture = createCapture(constraints);
  }else{
    capture = createCapture(VIDEO);
  }
  capture.hide(); 
}

function draw() {
  background(0);
  
  // load video frame
  capture.loadPixels();
  
  // render video
  image(capture, 50, 20, 300, 300 * capture.height / capture.width);

  // sample pixels and convert those into HSL values
  let pixelNum = capture.width * capture.height * pixelDensity() * pixelDensity();
  for (let i = 0; i < pixelSampleNum; i++) {
    let idx = Math.floor(Math.random() * pixelNum);
    let hsl = RGB2HSL(capture.pixels[(idx*4)], capture.pixels[(idx*4)+1], capture.pixels[(idx*4)+2])
    hue[i] = hsl[0]
    saturation[i] = hsl[1]
    lightness[i] = hsl[2]
    R[i] = capture.pixels[(idx*4)];
    G[i] = capture.pixels[(idx*4)+1];
    B[i] = capture.pixels[(idx*4)+2];
  }

  // calculate histogram and draw line
  hueHist = Histogram(hue, domain=[0,1], n_bin=100)
  saturationHist = Histogram(saturation, domain=[0,1], n_bin=100)
  lightnessHist = Histogram(lightness, domain=[0,1], n_bin=100)

  let _h = arr.getLengths(hueHist);
  let _s = arr.getLengths(saturationHist);
  let _l = arr.getLengths(lightnessHist);

  drawHistLine(_h, strokeColor=[0,255,0])
  drawHistLine(_s, strokeColor=[255,0,0])
  drawHistLine(_l, strokeColor=[255,255,255])

  updateAmbient();

  playDistributionGain = 1 - arr.mean(saturation);

}

function drawHistLine(data, strokeColor=[255, 255, 255]){
  // draw histogram line
  const margin = {side:20, bottom:20}
  translate(margin.side,0);
  translate(0,-margin.bottom);

  const contentWidth = width - 2 * margin.side;
  const contentHeight = 300;
  const step = contentWidth/data.length;
  const yScale = 100;
  
  noFill();
  beginShape();

  stroke(strokeColor[0], strokeColor[1], strokeColor[2]);
  for (let i = 0; i <data.length; i++){
    vertex(i*step, height - map(data[i], 0, yScale, 0, contentHeight));
  }
  endShape();

  translate(-margin.side,0);
  translate(0,margin.bottom);
}

function RGB2HSL(r, g, b) {
  // rgb to hsl
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [ h, s, l ];
}

let initialized = false;
let audioContext= null;
let main = null;
const channels = 2;
function initializeSound() {
  if (!initialized) {
    
    audioContext= new AudioContext();
    main = audioContext.createGain();
    main.gain.value = 0.1;
    main.connect(audioContext.destination);

    let testOsc = audioContext.createOscillator();
    testOsc.frequency.value = 440;
    testOsc.connect(main);

    initAmbient();
    setInterval(playTick, 60000/(tempo*6));
    setInterval(playDistribution, 60000/(tempo*3));
    initialized = true;
    alert("mobile sound problem1");
  }
}

///// BACKGROUND NOISE AFFTECTED BY LIGHTNESS
const backgroundTrack = {
  source:audioContext.createBufferSource(),
  filter1: audioContext.createBiquadFilter(),
  filter2: audioContext.createBiquadFilter(),
  output: audioContext.createGain()
}

function initAmbient() {
  
  // generate noises
  backgroundTrack.source.buffer = GetWhiteNoise(1);;
  backgroundTrack.source.loop = true;
  backgroundTrack.source.connect(backgroundTrack.filter1);
  backgroundTrack.source.start();
  
  // 1st filter in which the parameter frome video input
  // update in `update`
  backgroundTrack.filter1.type = 'lowpass';
  backgroundTrack.filter1.connect(backgroundTrack.filter2);
  backgroundTrack.filter1.frequency.value = 220;
  backgroundTrack.filter1.Q.value = 10;

  // 2nd filter in which the cutoff frequency is dependent on the 1st filter.
  backgroundTrack.filter2.type = 'notch';
  backgroundTrack.filter2.frequency.value = backgroundTrack.filter1.frequency.value-50;
  backgroundTrack.filter2.connect(backgroundTrack.output);

  // apply the local gain and connect to main.
  backgroundTrack.output.gain.value = 0.2;
  backgroundTrack.output.connect(main);

  console.log("initTrackBackground");
}

function updateAmbient() {
  /// lightness mean  ==> cutoff frequency
  /// saturation mean ==> Q
  
  backgroundTrack.filter1.frequency.value = map(arr.mean(lightness), 0, 1, 150, 500);
  backgroundTrack.filter1.Q.value = map(arr.mean(saturation), 0, 1, 0, 10);
}


//play
let tempo = 48;
// setInterval(playTrackBass, 60000/tempo);



///// BACKGROUND TRACK
function playTrackBass() {
  let source = audioContext.createBufferSource();
  let souurcegain = audioContext.createGain();
  let output = audioContext.createGain();
  let delay = audioContext.createDelay();
  let feedback = audioContext.createGain();
  let lowpassfilter = audioContext.createBiquadFilter();
  
  
  // generate noises
  // let note = clamp(prevBassNote + pick([-2, -2, -1, 1, 2, 2]), 48, 59);
  let note = Math.floor(map(arr.mean(lightness), 0, 1, 32, 72));
  console.log(note);
  prevBassNote = note;
  //getRandomNote(min=48, max=59)
  let wave1 = GetSineWave(midiToFreq(note), 5);
  let wave2 = GetSineWave(midiToFreq(note+7), 5);
  let wave3 = GetSineWave(midiToFreq(note+14), 5);

  let buffer = AddWaves([wave1, wave2, wave3], [1, 1, 1]);

  buffer = applyEnvelope(buffer,
                      arr.linspace(0, 0.8, 0.1 *audioContext.sampleRate),
                      arr.linspace(0.8, 1, 0.8 *audioContext.sampleRate),
                      arr.linspace(1, 0, 0.2 *audioContext.sampleRate),
                      padding= 5*audioContext.sampleRate);

  souurcegain.gain.value = 0.9;
  source.buffer = buffer;
  source.connect(souurcegain);
  souurcegain.connect(delay);
  souurcegain.connect(lowpassfilter);
  source.start();
  
    
  //
  delay.delayTime.value = 0.15;
  feedback.gain.value = 0.5;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(lowpassfilter);

  lowpassfilter.type = 'lowpass';
  lowpassfilter.frequency.value = 200;
  lowpassfilter.connect(output);

  // apply the local gain and connect to main.
  output.gain.value = 0.3;
  output.connect(main);
}

///// MAIN TRACK

function playTick() {

  let source = audioContext.createBufferSource();
  let sourcegain = audioContext.createGain();
  let output = audioContext.createGain();
  let lowpass = audioContext.createBiquadFilter();

  // saturation mean ==> frequency
  // R ==> Triangle Wave
  // G ==> Square Wave
  // B ==> Sine Wave
  let frequency = map(arr.mean(saturation), 0, 1, 32+14, 72);
  let r = GetTriangleWave(midi2freq(frequency), 1);
  let g = GetSquareWave(midi2freq(frequency), 1);
  let b = GetSineWave(midi2freq(frequency), 1);
  
  // The weighted mean of R,G,B ==> Output
  let buffer = AddWaves([r,g,b], [arr.mean(R), arr.mean(G), arr.mean(B)]);

  // Apply envelope
  buffer = applyEnvelope(buffer,
    arr.linspace(0, 1, Math.floor(0.02 *audioContext.sampleRate)),
    arr.linspace(1, 1, Math.floor((0.1 + random() * 0.1) *audioContext.sampleRate)),
    arr.linspace(1, 0, Math.floor((0.07 + random() * 0.05) *audioContext.sampleRate)),
    padding= 1*audioContext.sampleRate);

  source.buffer = buffer;
  source.connect(sourcegain);
  source.start();
    
  sourcegain.gain.value = arr.mean(saturation);
  sourcegain.connect(lowpass);

  // To avoid noise
  lowpass.type='lowpass';
  lowpass.frequency.value = 2000;
  lowpass.connect(output);

  // Apply the local gain and connect to main.
  output.gain.value = 4 + arr.mean(saturation) * 2;
  output.connect(main);

}

let playDistributionGain = 1;
function playDistribution(){

  let source = audioContext.createBufferSource();
  let delay = audioContext.createDelay();
  let output = audioContext.createGain();

  let _h = arr.normalize(arr.getLengths(hueHist));
  
  let note1 = map(arr.mean(lightness), 0, 1, 32+14, 72);
  let note2 = note1 + 7
  let note3 = note1 + 14
  let buffer1 = ArrayToWave(_h, midiToFreq(note1), 3);
  let buffer2 = ArrayToWave(_h, midiToFreq(note2), 3);
  let buffer3 = ArrayToWave(_h, midiToFreq(note3), 3);

  let buffer = AddWaves([buffer1, buffer2, buffer3], [1,1,1]);
  let attack = arr.linspace(0, 0.5, Math.floor(0.2*audioContext.sampleRate));
  let sustain = arr.linspace(0.5, 0.5, Math.floor((1.5+random())*audioContext.sampleRate));
  let decay = arr.linspace(0.5, 0, Math.floor(0.2*audioContext.sampleRate));

  buffer = applyEnvelope(buffer, attack, sustain, decay, 
    padding=3*audioContext.sampleRate);  
  
  source.buffer = buffer;
  delay.delayTime.value = 0.2;
  source.connect(delay);
  source.connect(output);
  delay.connect(output);

  output.gain.value = 0.20 * playDistributionGain;
  output.connect(main);
  source.start();
}


//======================================
function clamp(val, min, max){
  return Math.max(Math.min(val, max), min);
}

function pick(X){
  const idx = Math.floor(random() * X.length);
  // console.log(idx);
  return X[idx];
}