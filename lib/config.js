export const server =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.hadith.vn";

// const apiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:8000/api" : "https://hages.dk/ditqapi/public/api"

const apiBase = "https://hadeethenc.com/api/v1";
const apiBaseUrl = "http://localhost:8000/api";

export const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  apiBaseUrl: apiBaseUrl,
  apiBase: apiBase,
  localizationCode: "vn",
  translationCode: "vietnamese_hassan",
  language: "vi",
};
