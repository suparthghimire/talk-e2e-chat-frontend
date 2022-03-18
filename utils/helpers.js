import crypto from "crypto-js";
import x64Core from "crypto-js/x64-core";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function modular_power(base, exponent, modulus) {
  if (modulus == 1) return 0;
  let c = 1;
  for (let e_prime = 0; e_prime < exponent; e_prime++) {
    c = (c * base) % modulus;
  }
  return c;
}
export const CALC_PUBLIC_KEY = (p, g, privateKey) => {
  return Math.pow(Number(g), privateKey) % p;
};
export const CALC_PRIVATE_KEY = (p) => {
  return randomIntFromInterval(1, p);
};
export const CALC_SHARED_KEY = (p, otherUserPublicKey, myPrivateKey) => {
  const sharedKey = modular_power(
    Number(otherUserPublicKey),
    Number(myPrivateKey),
    Number(p)
  );
  return sharedKey;
};

export const ENCRYPT_MSG = (message, sharedKey) => {
  const AES_ENC = crypto.AES.encrypt(message, String(sharedKey));
  return AES_ENC;
};
export const DECRYPT_MSG = (encMsg, sharedKey) => {
  const AES_DEC = crypto.AES.decrypt(encMsg, String(sharedKey)).toString(
    crypto.enc.Utf8
  );
  console.log(AES_DEC.toString());
  return AES_DEC.toString();
};
