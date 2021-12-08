import moment from "moment";

export function storageSet(key, value, expirationInMin = 360) {
  let expirationDate = new Date(new Date().getTime() + 60000 * expirationInMin);
  let ISODate = moment(expirationDate).format("YYYY[-]MM[-]DD HH:mm:ss"); //포맷변경

  let newStorage = {
    value: value,
    expirationDate: ISODate,
  };

  window.sessionStorage.setItem(key, JSON.stringify(newStorage));
  window.localStorage.setItem(key, JSON.stringify(newStorage));
}

export function storageGet(key, expirationInMin = 360) {
  let stringValue = window.localStorage.getItem(key);
  if (stringValue !== null) {
    let storage = JSON.parse(stringValue);
    let expirationDate = new Date(storage.expirationDate);

    if (expirationDate > new Date()) {
      //시간 연장
      let expirationDate = new Date(
        new Date().getTime() + 60000 * expirationInMin,
      );
      let ISODate = moment(expirationDate).format("YYYY[-]MM[-]DD HH:mm:ss");

      let newStorage = {
        value: storage.value,
        expirationDate: ISODate,
      };

      window.sessionStorage.setItem(key, JSON.stringify(newStorage));
      window.localStorage.setItem(key, JSON.stringify(newStorage));

      return newStorage.value;
    } else {
      window.sessionStorage.removeItem(key);
      window.localStorage.removeItem(key);
    }
  }

  return null;
}
