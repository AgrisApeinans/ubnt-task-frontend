import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const ChatView = ({ message, allMessages, onChangeMessage, onSubmitMessage }) => (
    <div>
        {console.log(allMessages)}
        <TextField
            value={message}
            onChange={onChangeMessage}
            autoFocus
            margin="normal"
            label="Message"
            type="text"
            fullWidth
        />
        <Button onClick={onSubmitMessage} color="primary">
            Submit
        </Button>
        {allMessages.map((message, index) => (
            <div key={index}>{message.message}</div>
        ))}
    </div>
)
export default ChatView
