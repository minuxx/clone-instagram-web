import { storageGet, storageSet } from "./expirySession";

function cleanUpStorage() {
  window.sessionStorage.clear();
  window.localStorage.clear();
}

export function checkLogin() {
  let isLogined = storageGet("isLogined");
  if (isLogined === null || isLogined === false) {
    cleanUpStorage();

    return false;
  }

  return true;
}

export function getJwt() {
  let jwt = storageGet("jwt");

  return typeof jwt === "string" ? jwt : "";
}

export function setLoginStorage(isLogined, jwt) {
  storageSet("isLogined", isLogined);
  storageSet("jwt", jwt);
}
