import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import App from './components/App'
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        background: {
            default: 'lightblue',
        },
    },
})

window.onload = () => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>,
        root
    )
}
