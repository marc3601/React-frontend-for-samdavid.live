const setUserChoice = (choice, set) => {
  switch (choice) {
    case '0':
      set('remixes');
      break;
    case '1':
      set('dj-sets');
      break;
    case '2':
      set('original-music');
      break;
    case '3':
      set('projects');
      break;
    default:
      break;
  }
};

export default setUserChoice;
