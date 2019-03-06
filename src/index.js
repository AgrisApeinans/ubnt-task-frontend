import ReactDOM from 'react-dom'

import App from './components/App'

window.onload = () => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
    ReactDOM.render(<App />, root)
}
