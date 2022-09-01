/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                light: {
                    neutral: "#c8c8c8",
                    "base-100": "#ffffff",
                },

                dark: {
                    neutral: "#c8c8c8",
                    "base-100": "#1b1b1b",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
