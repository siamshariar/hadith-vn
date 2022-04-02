export const server =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.hadith.vn";

// const apiBaseUrl =
//   !process.env.NODE_ENV || process.env.NODE_ENV === "development"
//     ? "http://localhost:8000/api"
//     : "https://hadeethenc.com/api/v1";

const apiBaseUrl = "https://hadeethenc.com/api/v1";

export const config = {
  language: "vi",
  apiBaseUrl: apiBaseUrl,
  measurementId: process.env.MEASUREMENT_ID,
};
