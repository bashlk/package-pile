import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ImprovedApi } from '../../../api';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
    },
    logo: {
        width: 100,
        height: 100,
        objectFit: 'contain',
    },
    headerText: {
        marginLeft: '16px',
    },
    description: {
        color: '#586069'
    }
}));

const ImprovedHeader = ({ frameworkId }) => {
    const classes = useStyles();
    const framework = ImprovedApi.framework.getById(frameworkId);

    return (
        <Grid item xs={12} className={classes.header}>
            <img className={classes.logo} src={framework.logo} alt={`${framework.name}-logo`} />
            <div className={classes.headerText}>
                <Typography variant="h4" component="h1">{framework.name}</Typography>
                <Typography variant="subtitle1" component="p" className={classes.description}>{framework.description}</Typography>
            </div>
        </Grid>
    )
}

export default ImprovedHeader;
