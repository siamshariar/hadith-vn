export const server =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/api"
    : "https://hadeethenc.com/api/v1";

const apiBaseUrl = "http://127.0.0.1:8000/api";

export const config = {
  language: "vi", // Change this to your preferred language
  apiBaseUrl: apiBaseUrl,
  measurementId: process.env.MEASUREMENT_ID,
  enableMultiTranslations: false, // Set to false for single translation mode
};