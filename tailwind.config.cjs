module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["poppins", "BlinkMacSystemFont"],
      serif: ["STZhongsong", "STSong"],
      mono: ["ubuntu_mono", "STZhongsong"],
    },
  },
  plugins: [require("daisyui")],
};
