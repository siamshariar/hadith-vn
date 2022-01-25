const slug = "1-chương-al-fātihah";

module.exports = {
  async redirects() {
    return [
      {
        source: "/chapters",
        destination: `/chapters/${slug}`,
        permanent: true,
      },
    ];
  },
};
