import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ListItem from '@material-ui/core/ListItem'
import UserIcon from '@material-ui/icons/Person'
import RootRef from '@material-ui/core/RootRef'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const ChatView = ({
    message,
    allMessages,
    errors,
    setChatRef,
    onChangeMessage,
    onScrollChat,
    onSubmitMessage,
    onLogout,
}) => (
    <div className="chat-container">
        <RootRef rootRef={setChatRef}>
            <Paper elevation={2} onScroll={onScrollChat} className="padding-med margin-btm-med chat-area">
                <Typography variant="h6" align="center">
                    Messages
                </Typography>
                <List>
                    {allMessages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <UserIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="break-word"
                                primary={`${message.username}: `}
                                secondary={message.message}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </RootRef>
        <Paper elevation={2} className="padding-med">
            <form onSubmit={onSubmitMessage}>
                <TextField
                    value={message}
                    onChange={onChangeMessage}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    autoFocus
                    margin="normal"
                    label="Message"
                    type="text"
                    fullWidth
                />
                <Grid container justify="space-between">
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            onClick={onSubmitMessage}
                            color="primary"
                            className="margin-right-med">
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6} className="align-right">
                        <Button variant="outlined" onClick={onLogout} color="secondary">
                            Log out
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </div>
)
ChatView.propTypes = {
    errors: PropTypes.object.isRequired,
    allMessages: PropTypes.array.isRequired,
    setChatRef: PropTypes.func.isRequired,
    onChangeMessage: PropTypes.func.isRequired,
    onScrollChat: PropTypes.func.isRequired,
    onSubmitMessage: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
}

export default ChatView
