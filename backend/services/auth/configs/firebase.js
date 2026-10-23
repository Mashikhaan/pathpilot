
import { cert, initializeApp } from "firebase-admin/app";

const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!encodedServiceAccount) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is missing");
}

const decodedJson = Buffer.from(
  encodedServiceAccount,
  "base64"
).toString("utf8");

const serviceAccountKey = JSON.parse(decodedJson);

export const app = initializeApp({
  credential: cert(serviceAccountKey),
});
