/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                rubik: ["Rubik", "sans-serif"],
            },
            colors: {
                "very-dark-gray": "hsl(0, 0%, 17%)",
                "dark-gray": "hsl(0, 0%, 59%)",
                "off-black": "#222222",
            },
            backgroundColor: {
                "very-dark-gray": "hsl(0, 0%, 17%)",
                "dark-gray": "hsl(0, 0%, 59%)",
                "off-black": "#222222",
            },
            backgroundImage: {
                "pattern-bg-desktop": "url('/images/pattern-bg-desktop.png')",
                "pattern-bg-mobile": "url('/images/pattern-bg-mobile.png')",
            },
            width: {
              "full-leaving-space": "calc(100% - 2rem)",
            },
        },
    },
    plugins: [],
};
