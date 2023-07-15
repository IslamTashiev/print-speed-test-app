import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

import typography from "./typography";
import palette from "./palette";

const theme = (mode: PaletteMode) => {
    return createTheme({
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        cursor: "pointer",
                        underline: 'none',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px",
                        "&.MuiButton-outlined": {
                            borderWidth: "2px",
                        }
                    },
                },
                defaultProps: {
                    variant: "outlined"
                }
            }
        },
        typography: typography,
        palette: palette(mode),
        spacing: 8
    })
}
export default theme