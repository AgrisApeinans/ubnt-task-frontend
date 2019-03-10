import Grid from '@material-ui/core/Grid'
import io from 'socket.io-client'

import 'src/style.scss'

import LandingView from './LandingView'
import ChatView from './ChatView'

const defaultErrors = {
    username: '',
    serverError: '',
    message: '',
}

const defaultState = {
    isUserSet: false,
    username: '',
    allMessages: [],
    message: '',
    isChatScrolledToBottom: true,
    errors: defaultErrors,
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = defaultState
        this.socket = io('http://localhost:3000')
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onLogin = this.onLogin.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
        this.onSubmitMessage = this.onSubmitMessage.bind(this)
        this.onLogout = this.onLogout.bind(this)
        this.setChatRef = this.setChatRef.bind(this)
        this.onScrollChat = this.onScrollChat.bind(this)
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onLogin(e) {
        e.preventDefault()
        if (!this.state.username.trim()) {
            this.setState({ errors: { ...this.state.errors, username: 'Username can not be empty' } })
        } else {
            this.setState({ errors: { ...this.state.errors, username: '' } })
            this.socket.open()
            this.socket.emit('NEW_USER_LOGIN', { username: this.state.username })
        }
    }

    setChatRef(el) {
        this.chatRef = el
    }

    onScrollChat() {
        const { chatRef } = this
        const isChatScrolledToBottom = chatRef.scrollHeight - chatRef.scrollTop === chatRef.clientHeight
        this.setState({ isChatScrolledToBottom })
    }

    onChangeMessage(e) {
        this.setState({ message: e.target.value })
    }

    onSubmitMessage(e) {
        e.preventDefault()
        if (!this.state.message.trim()) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    message: 'Message can not be empty',
                },
            })
        } else {
            this.socket.emit('NEW_MESSAGE', {
                message: this.state.message,
            })

            this.setState({
                message: '',
                errors: { ...this.state.errors, message: '' },
            })
        }
    }
    onLogout() {
        this.socket.disconnect()
        this.setState(defaultState)
    }

    componentDidMount() {
        this.socket.on('NEW_MESSAGE', data => {
            this.setState({ allMessages: [...this.state.allMessages, data] })

            // scroll chat window to bottom on new message, if user is not looking at previous messages
            if (this.state.isChatScrolledToBottom) {
                this.chatRef.scrollTop = this.chatRef.scrollHeight
            }
        })
        this.socket.on('NEW_USER_LOGIN_ERROR', data => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    username: data.error,
                },
            })
        })
        this.socket.on('NEW_MESSAGE_ERROR', data => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    message: data.error,
                },
            })
        })
        this.socket.on('NEW_USER_LOGIN_SUCCESS', () => {
            this.socket.open()
            this.setState({ isUserSet: true })
        })
        this.socket.on('error', error => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    server: error,
                },
            })
        })
        this.socket.on('disconnect', reason => {
            if (reason === 'transport close') {
                this.setState({
                    ...defaultState,
                    errors: {
                        ...defaultErrors,
                        server: 'Server unavailable',
                    },
                })
            } else {
                this.setState({
                    ...defaultState,
                    errors: {
                        ...defaultErrors,
                        server: 'You have been disconnected due to inactivity',
                    },
                })
            }
        })
        this.socket.on('connect_error', () => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    server: 'Failed to connect, please try later',
                },
            })
        })
        this.socket.on('connect_timeout', () => {
            this.setState({
                errors: {
                    ...this.state.errors,
                    server: 'Connection timeout, please try later',
                },
            })
        })
    }

    componentWillUnmount() {
        this.socket.close()
    }

    render() {
        return (
            <Grid container className="padding-med full-viewport-height">
                {this.state.isUserSet ? (
                    <Grid item xs={12} className="full-height">
                        <ChatView
                            message={this.state.message}
                            allMessages={this.state.allMessages}
                            errors={this.state.errors}
                            onChangeMessage={this.onChangeMessage}
                            onSubmitMessage={this.onSubmitMessage}
                            onScrollChat={this.onScrollChat}
                            onLogout={this.onLogout}
                            setChatRef={this.setChatRef}
                        />
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <LandingView
                            username={this.state.username}
                            errors={this.state.errors}
                            onChangeUsername={this.onChangeUsername}
                            onLogin={this.onLogin}
                        />
                    </Grid>
                )}
            </Grid>
        )
    }
}
export default App
