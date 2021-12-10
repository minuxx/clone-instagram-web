import firebase from "./config";
import "firebase/compat/storage";

const storage = firebase.storage();

export async function handleFirebaseUpload(path, target) {
  const date = new Date();
  const fileName = `${date.getTime()}_${target.name}`;

  return new Promise(function (resolve, reject) {
    const uploadTask = storage.ref(`${path}/${fileName}`).put(target);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        reject(null);
        console.log(`upload fail: ${error}`);
      },
      function () {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            reject(null);
            console.log(`upload fail: ${error}`);
          });
      },
    );
  });
}
