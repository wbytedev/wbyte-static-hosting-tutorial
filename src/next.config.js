const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  output: "export",
  images: {
    unoptimized: true,
  }
});
