import { PaletteMode } from '@mui/material'

const palette = (mode: PaletteMode) => ({
    mode,
    ...(mode === 'light'
        ? {
            primary: {
                main: '#fff',
            },
            secondary: {
                main: '#FF5252',
            },
            error: {
                main: '#e64a19',
            },
            background: {
                default: '#393E41',
                light: "#3F4649"
            },
            text: {
                primary: '#fff',
                dark: "#989898"
            },
        }
        : {
            primary: {
                main: '#fff',
            },
            secondary: {
                main: '#FF5252',
            },
            error: {
                main: '#e64a19',
            },
            background: {
                default: '#393E41',
                light: "#3F4649"
            },
            text: {
                primary: '#fff',
                dark: "#989898"
            },
        }),
})
export default palette