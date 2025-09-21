import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: To enable Google Authentication, you must replace the placeholder service account key below with your actual Firebase project credentials.
// 1. Go to your Firebase project console.
// 2. Navigate to Project Settings > Service accounts.
// 3. Click on "Generate new private key" to download a JSON file with your credentials.
// 4. Replace the placeholder 'serviceAccount' object below with the content of the downloaded JSON file.

const serviceAccount ={
  "type": "service_account",
  "project_id": "studio-3328471898-35d33",
  "private_key_id": "483687edfe470024233f437a8083f015def965d5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQaOc6lwb7LFn1\nRsF/5Z3mWa79xyvZRF+jWSswNZJOAW8tCD+Yi1ExArsuWZ6pmU8xKAMzkbFAKbVQ\nMfTySPy7p1BvdY+XMneGonXr+Gr0OeaiPJF+Z73+ey6PD8fIAEmWSNTgXDNSkAHh\nCVM594n1G5f8JtauFmr0vvZtQ6NtP4Kd3iSDeEPLUFSOmdYE286C2MB0K664WAvG\nXEO+zFulxr7YqvKugG50OS6Ac/MUVt2qJTfGw51ZiEc0RSbTeYQ7kZ93Eqk5Uxgc\nIsKw8j3l1y9+YxOgVrtuqJ4oZ0vE6G5T8X9EHoO+kVqVPq3YBKI3Xs4jeyIlXtYy\nzCzxcb4RAgMBAAECggEACGOjvTZdYDWXI0XhQ1wURHfEz/bkX/qWIL/zH5mZHoF8\nUy4lvaeoR5PcSmjH7BvdKyKjLvmBhdP2dcp1K6ccUY16gYMfnJ3ArlhdR+BWXEpJ\n0PZ6UFDYC4Ld9U8qIL8Nh1bDUSZiD+OQTGG1jUpJYC0icvJRqerg+0dluvrBMX02\n6YVJHey2iEpae/GXyndmLxrbRrviOSdOf6dHurtjD6qmvFIBqbXDtZZRwY7HJMfw\nWJk1ZMDHPlG0/QiJyRNVfmhlsIgFCahNJz3jTyvAw4HdBcYsbZ9GJkewHuXj0aYm\nuSHzyQ8+qJD4FV2I1icB4i3KaebnQIAwJaO/uQjoDQKBgQDLt3JXm3REQpjqPkRF\n+2+C9So+AXeaZwR1E/n0TrPG1cXltoQPGQToMknMBHO725oCLQO1aGQBDcOxO2Nz\ndyqvq1sINFZV/G2EDvLwaWGD29kN3qDh5nifiUrr7fFY9auGh/+RrujVMHsk3mKP\NMu21ISHEMiUWqkPlMUKF01qbQKBgQC1eOPzBG+ecGZn9Qzxv+IW+KzAo5wgwS2w\nSMxbGmycm9gkDsDv8QjrR24Xq9K21uXU6d8PSixOecwP+uWld8R6paL1ZtRb3ceV\ny/6mDGPMQqrnIfkD1OJxyqYjJwLEsm1x0lIwFSHMOHtC/RFCaeCDWmb8+m+jvEHp\nQe7FVewbtQKBgQC+PqQeooNy18rcPqgdvtEFuJTpcQ9T907XU3+DIxiK4Mq+WrN7\nMf8+JPB8AdBfKJbr30PuXv29ajBNzEt04l3PzjPmNpJGHMXdpORFlfRGYsKSTE1s\niYIuYtW//Ob+D/dOXKVUVMcFiRAHf1MFr+Vq6Y6WYBshSIVHksRsRxS6BQKBgAXP\n6GUZKEYHzY/YzmBTx/b6YfYNh2uZJFB4FGt6ji3549NL0awdqS537DO/4hDPEy9d\nijJgKskcp4d/fqltC5LuCSkY8QY8NS88CFzjGrMpE3YxpVsVD2ebmPSZREJugIjb\ntpwpoRp8WJ5Noqbg4zrxw0io8LhqyCWjYfVaCiTdAoGAEKOBhQcq9ikIWwfXD9f3\n7aCfP0UZCFWit7IBCkx/xv929xKeM15EBaUWYLEfqX/2OjzhxdE19yCHD3kvfjui\nf6qYEn9xXxKmMT3NKFmPD3cJt7fKHNXpsepFEGceZrqibPqSbb+xQ0lKdrqoHjB+\nrkhlFMW74TK06FB90YOmPLk=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@studio-3328471898-35d33.iam.gserviceaccount.com",
  "client_id": "107325654027495529738",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40studio-3328471898-35d33.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = process.env.PORT || 3001;

const API_KEY = "AIzaSyA3Lim2Ij6GO6pbBH-Xq7-rWA757QqGOMk";
const genAI = new GoogleGenerativeAI(API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/auth', async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    res.status(200).json({ message: 'Authentication successful', uid });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

app.post('/api/chatbot', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'Google AI API key not configured' });
  }
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error('Chatbot API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
