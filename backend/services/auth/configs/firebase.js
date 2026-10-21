import { cert, initializeApp } from "firebase-admin/app";

let serviceAccountKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // प्रॉडक्शन (Render) पर यह सीधे Environment Variable से डेटा उठाएगा
    serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // लोकल डेवलपमेंट के लिए: अगर आप अपने कंप्यूटर पर हैं, तो यहाँ अपनी फ़ाइल का डेटा या पाथ रख सकते हैं
    // अभी के लिए लोकल एरर से बचने के लिए हम इसे एक खाली ऑब्जेक्ट दे रहे हैं
    serviceAccountKey = {}; 
    console.log("Running in local environment without Firebase service account variable");
}

// Initialize Firebase Admin SDK
export const app = initializeApp({
    credential: cert(serviceAccountKey)
});
