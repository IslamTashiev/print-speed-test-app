export default {
    fontFamily: ["Rambla", "sans-serif"].join(","),
    h1: {
        fontSize: 24,
        lineHeight: 1.5,
        fontWeight: 600,
        fontStyle: "normal",
    },
    h2: {
        fontSize: 22,
        lineHeight: 1.5,
        fontWeight: 600,
        fontStyle: "normal",
    },
    h3: {
        fontSize: 20,
        lineHeight: 1.5,
        fontWeight: 600,
        fontStyle: "normal",
    },
    body1: {
        fontSize: 12,
        lineHeight: 1.2,
        fontWeight: 600,
        fontStyle: "normal",
    },
    body2: {
        fontSize: 12,
        lineHeight: 1.2,
        fontWeight: 500,
        fontStyle: "normal",
    },
    button: {
        fontSize: 14,
        textTransform: "capitalize" as const,
        ":focus": {
            outline: "none"
        }
    },
    subtitle1: {
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 500,
        fontStyle: "normal",
    },
    subtitle2: {
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 500,
        fontStyle: "normal",
    },
    caption: {
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 500,
        fontStyle: "normal",
    },
};
