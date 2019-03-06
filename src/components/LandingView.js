import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LandingView = ({ username, onChangeUsername, onClickLogin }) => (
    <div>
        <TextField
            value={username}
            onChange={onChangeUsername}
            autoFocus
            margin="normal"
            label="Username"
            type="text"
            fullWidth
        />
        <Button onClick={onClickLogin} color="primary">
            Login
        </Button>
    </div>
)
export default LandingView
