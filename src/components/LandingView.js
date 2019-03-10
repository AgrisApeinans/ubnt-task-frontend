import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const LandingView = ({ username, errors, onChangeUsername, onLogin }) => (
    <Paper elevation={2} className="padding-med">
        <form onSubmit={onLogin}>
            <TextField
                value={username}
                onChange={onChangeUsername}
                error={Boolean(errors.username)}
                helperText={errors.username}
                autoFocus
                margin="normal"
                label="Username"
                type="text"
                fullWidth
            />
            <Button onClick={onLogin} variant="contained" color="primary">
                Login
            </Button>
            <Typography variant="body1" color="error" className="padding-top-small">
                {errors.server}
            </Typography>
        </form>
    </Paper>
)
LandingView.propTypes = {
    username: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
}
export default LandingView
