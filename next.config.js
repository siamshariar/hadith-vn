module.exports = {
  async redirects() {
    return [
      {
        source: "/categories",
        destination: `/categories/1/hadiths`,
        permanent: true,
      },
      {
        source: "/hadiths",
        destination: `/hadiths/8402`,
        permanent: true,
      },
    ];
  },
};
