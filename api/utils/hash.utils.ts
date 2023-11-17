import crypto from "crypto";

const hashText = (text: string, salt?: string): string => {
  if (salt) {
    const newText = text + salt;
    return crypto.createHash("sha256").update(newText).digest("hex");
  }
  return crypto.createHash("sha256").update(text).digest("hex");
};
const generateSalt = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

const compareHash = (text: string, hash: string, salt?: string): boolean => {
  return hashText(text, salt) === hash;
};
export { hashText, compareHash, generateSalt };
