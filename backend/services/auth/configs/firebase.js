import { cert, initializeApp } from "firebase-admin/app";

let serviceAccountKey;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // 🔒 Render पर यह Base64 स्ट्रिंग को वापस असली JSON ऑब्जेक्ट में बदलेगा
    const decodedJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8');
    serviceAccountKey = JSON.parse(decodedJson);
} else {
    // लोकल डेवलपमेंट के लिए पुराना तरीका (यह फाइल .gitignore में सुरक्षित है)
    serviceAccountKey = {}; 
}

export const app = initializeApp({
    credential: cert(serviceAccountKey)
});
