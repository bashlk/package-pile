import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import { ImprovedApi } from '../../../api';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    details: {
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
    },
    button: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const ImprovedHeader = ({ frameworkId, onNextClick }) => {
    const classes = useStyles();
    const framework = ImprovedApi.framework.getById(frameworkId);

    return (
        <Grid item xs={12} className={classes.header}>
            <div className={classes.details}>
                <img className={classes.logo} src={framework.logo} alt={`${framework.name}-logo`} />
                <div className={classes.headerText}>
                    <Typography variant="h4" component="h1">{framework.name}</Typography>
                    <Typography variant="subtitle1" component="p" className={classes.description}>{framework.description}</Typography>
                </div>
            </div>
            <div className={classes.button}>
                <IconButton onClick={onNextClick}>
                    <ForwardIcon  />
                </IconButton>
            </div>
        </Grid>
    )
}

export default ImprovedHeader;
