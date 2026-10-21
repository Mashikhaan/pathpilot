import { cert, initializeApp } from "firebase-admin/app";
import { createRequire } from "module";

// ES Modules में JSON फ़ाइल को लोकल बैकअप के लिए लोड करने का तरीका
const require = createRequire(import.meta.url);

let serviceAccountKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // प्रॉडक्शन (Render) पर यह सीधे Environment Variable से JSON स्ट्रिंग को ऑब्जेक्ट में बदलेगा
    serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // लोकल कंप्यूटर पर यह आपकी पुरानी JSON फ़ाइल को ही उठाएगा
    serviceAccountKey = require("../serviceAccountKey.json");
}

// Initialize Firebase Admin SDK
export const app = initializeApp({
    credential: cert(serviceAccountKey)
});
