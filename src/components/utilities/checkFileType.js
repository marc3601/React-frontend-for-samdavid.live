import FileType from 'file-type/browser';

const checkFileType = (input, setFileType, setFileName, ext) => {
  if (input.type) {
    const url = URL.createObjectURL(input);
    const title = input.name.slice(0, input.name.length - 4);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          setFileType(null);
        }
      })
      .then(async (blob) => {
        const type = await FileType.fromBlob(blob);
        setFileType(type.ext);
        if (type.ext === ext) {
          setFileName(title);
        } else setFileName('');
      })
      .catch((e) => {
        setFileType(null);
        console.log(
          'There has been a problem with your fetch operation: ',
          e.message
        );
      });
  }
};

export default checkFileType;
