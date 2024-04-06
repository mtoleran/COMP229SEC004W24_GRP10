import { createTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'
const theme = createTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: '#948BFC',
            main: '#948BFC',
            dark: '#673147',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000',
        },
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
    }
})
export default theme
