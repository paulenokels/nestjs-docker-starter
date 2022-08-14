import * as bcrypt from 'bcrypt';
export function createRandomString(length: number) {
  const secureMathRandom = () => {
    return require('crypto').randomFillSync(new Uint32Array(1))[0] / 4294967295;
  };

  const strList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let text = '';
  for (let j = 0; j < length; j++) {
    text += strList[Math.floor(secureMathRandom() * strList.length)];
  }
  return text;
}

export function createRandom6DigitNumber() {
  return require('crypto').randomInt(100000, 999999);
}

export async function createPasswordHash(password: string) {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
}

export async function checkPassword(password, hash): Promise<boolean> {
  const bcrypt = require('bcryptjs');

  return await bcrypt.compare(password, hash);
}
