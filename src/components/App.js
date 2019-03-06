import { Component } from 'react'

import socket from 'src/services/Socket'
import ChatView from './ChatView'
import LandingView from './LandingView'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUserSet: false,
            username: '',
            allMessages: [],
            message: '',
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onClickLogin = this.onClickLogin.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
        this.onSubmitMessage = this.onSubmitMessage.bind(this)
    }

    onChangeUsername(e) { // todo make forms submit with enter
        console.log(e.target.value)
        console.log(this)
        this.setState({ username: e.target.value })
        // this.setState(() => {
        //     userName: e.target.value
        // })
    }

    onClickLogin() {
        socket.emit('NEW_USER_LOGIN', { username: this.state.username })
        this.setState({ isUserSet: true })
    }

    onChangeMessage(e) {
        this.setState({ message: e.target.value })
    }

    onSubmitMessage() {
        socket.emit('NEW_MESSAGE', { message: this.state.message })
        this.setState({ message: '' })
    }

    componentDidMount() {
        socket.on('NEW_MESSAGE', data => {
            console.log(data)
            console.log(this.state.allMessages)
            this.setState({ allMessages: [...this.state.allMessages, data] })
        })
    }

    componentWillUnmount() {}

    render() {
        return (
            <div>
                {this.state.isUserSet ? (
                    <ChatView
                        message={this.state.message}
                        allMessages={this.state.allMessages}
                        onChangeMessage={this.onChangeMessage}
                        onSubmitMessage={this.onSubmitMessage}
                    />
                ) : (
                    <LandingView
                        userName={this.state.username}
                        onChangeUsername={this.onChangeUsername}
                        onClickLogin={this.onClickLogin}
                    />
                )}
            </div>
        )
    }
}
export default App
