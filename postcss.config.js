const nested = require("postcss-nested")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
module.exports = {
  plugins: [
    nested(),
    tailwindcss(),
    autoprefixer(),
  ],
}
