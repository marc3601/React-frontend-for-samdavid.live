import convertAudioDuration from './convertAudioDuration';
const getFileDuration = (input, setDuration) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    audioContext.decodeAudioData(e.target.result, (buffer) => {
      const duration = buffer.duration;
      setDuration(convertAudioDuration(duration));
    });
  };
  reader.onerror = (e) => {
    console.error('An error ocurred reading the file: ', e);
  };
  if (input instanceof Blob) {
    reader.readAsArrayBuffer(input);
  }
};

export default getFileDuration;
