/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bgdty: {
                    light: "#a4bcbc",
                    DEFAULT: "#FFF",
                    dark: "#051126",
                },
            },
            fontFamily: {
                body: ['"Quick Sand"'],
            },
        },
    },
    plugins: [],
};
