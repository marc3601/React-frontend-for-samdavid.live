const setTableCategoryName = (choice) => {
  switch (choice) {
    case 'remixes':
      return 'Remixes.';
    case 'dj-sets':
      return 'Dj sets.';
    case 'original-music':
      return 'Original music.';
    case 'projects':
      return 'Projects.';
    default:
      break;
  }
};

export default setTableCategoryName;
