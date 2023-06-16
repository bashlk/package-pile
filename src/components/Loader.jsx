import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    container: ({ fullHeight }) => ({
        height: fullHeight ? '100vh' : 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
}))


const Loader = ({ fullHeight }) => {
    const classes = useStyles({ fullHeight });
    return (
        <div className={classes.container}>
            <CircularProgress />
        </div>
    )
}

export default Loader;
