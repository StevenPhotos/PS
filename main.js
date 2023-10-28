const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioCtx.createGain();
const playButton = document.getElementById('playBTN');
const fileInput = document.getElementById('fileInput'); // Assuming you have an input element of type 'file' in your HTML
let shifter;


fileInput.addEventListener('change', async (e) => {
  // if(shifter){
  // }

  const file = e.target.files[0];
  if (!file) return;

  // const reader = new FileReader();

  // reader.onload = function (e) {
  //   const audioData = e.target.result;
  // };

  // if (shifter) {
  //   shifter.off(); // remove any current listeners
  // }

  const response = await fetch(URL.createObjectURL(file));
  const audioData = await response.arrayBuffer();
    

  audioCtx.decodeAudioData(audioData, (audioBuffer) => {
    shifter = new PitchShifter(audioCtx, audioBuffer, 1024);
    shifter.on('play', (detail) => {
      // Handle play event details here
      // console.log(detail.timePlayed);
      // console.log(detail.formattedTimePlayed);
      // console.log(detail.percentagePlayed);
    });
    shifter.tempo = 0.9; // Set the initial tempo
    // shifter.pitch = 1; // Set the initial pitch
    // shifter.rate = 0.5;
  });

    // play();


  // reader.readAsArrayBuffer(file);
});

playButton.addEventListener('click', ()=>{
  shifter.pitch = 0.8;
  play();
});

function play() {
  if (shifter) {
    shifter.connect(gainNode); // Connect it to a GainNode to control the volume
    gainNode.connect(audioCtx.destination); // Attach the GainNode to the 'destination' to begin playback
  } else {
    console.error('No audio file loaded yet.');
  }
};
