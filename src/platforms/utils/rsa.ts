import crypto from 'crypto';

/**
 * Generate RSA signature.
 *
 * @param {String} privateKey
 * @param {String} data
 * @param {String|Buffer} format
 * @returns {String}
 */
export const generateRSASignature = (privateKey: string, data: any, format: any = 'base64') => {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  return sign.sign(privateKey, format);
};

/**
 * Verify RSA key.
 *
 * @param {String} publicKey
 * @param {String} signature
 * @param {String} data
 * @param {String|Buffer} format
 * @returns {String}
 */
export const verifyRSA = (publicKey: string, signature: string, data: any, format: any = 'base64') => {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  return verify.verify(publicKey, signature, format);
};
