
export const handleMusicUpload = (
  e,
  fileType,
  fileName,
  duration,
  setAlert,
  setCompleted,
  uploadTime,
  storageRef,
  category,
  file,
  setProgress,
  setIsUploading,
  setMessage,
  db,
  setDuration,
  setFileName,
  downloadMusic,
  setFileType
) => {
  e.preventDefault();
  if (
    fileType === 'mp3' &&
    fileName.length !== 0 &&
    !/^ *$/.test(fileName) &&
    duration
  ) {
    setAlert(false);
    setCompleted(false);
    const metadata = {
      name: fileName,
      duration: duration,
      uploadTime: uploadTime,
    };
    const uploadTask = storageRef
      .child(`${category}/${metadata.name}`)
      .put(file, metadata);

    setProgress(0);
    uploadTask.on(
      'state_changed',
      (snapschot) => {
        setIsUploading(true);
        const progress = Math.round(
          (snapschot.bytesTransferred / snapschot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setIsUploading(false);
        setProgress(0);
        setAlert(true);
        setMessage(err.message);
      },
      () => {
        const audioDataUpload = new Promise((resolve, reject) => {
          resolve(
            uploadTask.snapshot.ref.getMetadata().then((data) => {
              db.collection(category).doc(metadata.name).set({
                name: data.name,
                duration: duration,
                uploadTime: uploadTime,
              });
            })
          );
        });

        audioDataUpload
          .then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection(category).doc(metadata.name).update({
                musicSrc: downloadURL,
              });
            });
          })
          .then(() => {
            setIsUploading(false);
            setCompleted(true);
            setDuration(null);
            setFileName('');
            setFileType(null);
            downloadMusic(category);
          })
          .catch((err) => {
            setIsUploading(false);
            setProgress(0);
            setAlert(true);
            setMessage(err.message);
          });
      }
    );
  } else {
    if (file == null || fileType !== 'mp3') {
      setAlert(true);
      setMessage('Please choose mp3 file.');
    } else if (duration === null) {
      setAlert(true);
      setMessage('Wait a second... Duration data is being loaded.');
    } else if (fileName.length === 0 || /^ *$/.test(fileName)) {
      setAlert(true);
      setMessage('Filename cannot be empty.');
    }
  }
};

export const handleImageUpload = (
  e,
  fileType,
  fileName,
  setAlert,
  setCompleted,
  uploadTime,
  storageRef,
  file,
  setProgress,
  setIsUploading,
  setMessage,
  db,
  setDuration,
  setFileName,
  setFileType,
  downloadImages
) => {
  e.preventDefault();
  if (fileType === 'jpg' && fileName.length !== 0 && !/^ *$/.test(fileName)) {
    setAlert(false);
    setCompleted(false);
    const metadata = {
      name: fileName,
      uploadTime: uploadTime,
    };
    const uploadTask = storageRef
      .child(`images/${metadata.name}`)
      .put(file, metadata);

    setProgress(0);
    uploadTask.on(
      'state_changed',
      (snapschot) => {
        setIsUploading(true);
        const progress = Math.round(
          (snapschot.bytesTransferred / snapschot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setIsUploading(false);
        setProgress(0);
        setAlert(true);
        setMessage(err.message);
      },
      () => {
        const imageDataUpload = new Promise((resolve, reject) => {
          resolve(
            uploadTask.snapshot.ref.getMetadata().then((data) => {
              db.collection('images').doc(metadata.name).set({
                name: data.name,
                uploadTime: uploadTime,
              });
            })
          );
        });

        imageDataUpload
          .then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection('images').doc(metadata.name).update({
                imageSrc: downloadURL,
              });
            });
          })
          .then(() => {
            setIsUploading(false);
            setCompleted(true);
            setDuration(null);
            setFileName('');
            setFileType(null);
            setTimeout(() => {
              downloadImages('images');
            }, 500);
          })
          .catch((err) => {
            setIsUploading(false);
            setProgress(0);
            setAlert(true);
            setMessage(err.message);
          });
      }
    );
  } else {
    if (file == null || fileType !== 'jpg') {
      setAlert(true);
      setMessage('Please choose jpg file.');
    } else if (fileName.length === 0 || /^ *$/.test(fileName)) {
      setAlert(true);
      setMessage('Filename cannot be empty.');
    }
  }
};

export const handleVideoUpload = (
  e,
  fileType,
  fileName,
  setAlert,
  setCompleted,
  uploadTime,
  storageRef,
  file,
  setProgress,
  setIsUploading,
  setMessage,
  db,
  setDuration,
  setFileName,
  setFileType,
  downloadVideos
) => {
  e.preventDefault();
  if (fileType === 'mp4' && fileName.length !== 0 && !/^ *$/.test(fileName)) {
    setAlert(false);
    setCompleted(false);
    const metadata = {
      name: fileName,
      uploadTime: uploadTime,
    };
    const uploadTask = storageRef
      .child(`videos/${metadata.name}`)
      .put(file, metadata);

    setProgress(0);
    uploadTask.on(
      'state_changed',
      (snapschot) => {
        setIsUploading(true);
        const progress = Math.round(
          (snapschot.bytesTransferred / snapschot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        setIsUploading(false);
        setProgress(0);
        setAlert(true);
        setMessage(err.message);
      },
      () => {
        const imageDataUpload = new Promise((resolve, reject) => {
          resolve(
            uploadTask.snapshot.ref.getMetadata().then((data) => {
              db.collection('videos').doc(metadata.name).set({
                name: data.name,
                uploadTime: uploadTime,
              });
            })
          );
        });

        imageDataUpload
          .then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection('videos').doc(metadata.name).update({
                imageSrc: downloadURL,
              });
            });
          })
          .then(() => {
            setIsUploading(false);
            setCompleted(true);
            setDuration(null);
            setFileName('');
            setFileType(null);
            setTimeout(() => {
              downloadVideos('videos');
            }, 500);
          })
          .catch((err) => {
            setIsUploading(false);
            setProgress(0);
            setAlert(true);
            setMessage(err.message);
          });
      }
    );
  } else {
    if (file == null || fileType !== 'mp4') {
      setAlert(true);
      setMessage('Please choose mp4 file.');
    } else if (fileName.length === 0 || /^ *$/.test(fileName)) {
      setAlert(true);
      setMessage('Filename cannot be empty.');
    }
  }
};