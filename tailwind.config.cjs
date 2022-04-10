module.exports = {
    content: ['./src/**/*.svelte'],
    theme: {
        extend: {},
        fontFamily: {
            'sans': ['poppins', 'noto_sans_sc'],
            'serif': ['biz_udpmincho', 'noto_serif_sc'],
            'mono': ['ubuntu_mono', 'noto_sans_sc']
        }
    },
    plugins: [require('daisyui')]
}
