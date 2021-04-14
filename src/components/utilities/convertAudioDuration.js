const convertAudioDuration = (convert) => {
  var minutes = '0' + Math.floor(convert / 60);
  var seconds = '0' + Math.floor(convert - minutes * 60);
  var dur = minutes.substr(-2) + ':' + seconds.substr(-2);
  return dur;
};

export default convertAudioDuration;
