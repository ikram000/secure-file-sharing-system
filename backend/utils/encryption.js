const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(process.env.SECRET_KEY).digest();

exports.encrypt = (buffer) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  return { encrypted, iv };
};

exports.decrypt = (encrypted, iv) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};