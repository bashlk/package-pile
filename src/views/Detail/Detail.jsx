import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '@material-ui/icons/GitHub';
import PackageIcon from '@material-ui/icons/CardGiftcard';
import WeightIcon from '@material-ui/icons/FitnessCenter';
import indexOf from 'lodash/fp/indexOf';
import { Api } from '../../api';
import { Loader } from '../../components';
import { MetaCard } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '30px',
    },
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

const frameworkIds = Api.getFrameworkIds();

const Detail = () => {
    const classes = useStyles();
    const [framework, setFramework] = useState(null);
    const [currentFrameworkId, setCurrentFrameworkId] = useState(frameworkIds[0]);

    useEffect(() => {
        Api.getFrameworkById(currentFrameworkId).then(framework => {
            setFramework(framework);
        })
    }, [currentFrameworkId])

    const goToNextFramework = useCallback(() => {
        const currentFrameworkIndex = indexOf(currentFrameworkId, frameworkIds);
        if(currentFrameworkIndex < (frameworkIds.length - 1)){
            setCurrentFrameworkId(frameworkIds[currentFrameworkIndex + 1]);
        } else {
            setCurrentFrameworkId(frameworkIds[0]);
        }
    }, [currentFrameworkId])
    
    return (
        <div className={classes.root}>
             <Grid container spacing={3}>
                {framework && (framework.id === currentFrameworkId)
                    ? (
                    <>
                        <Grid item xs={12} className={classes.header}>
                            <div className={classes.details}>
                                <img className={classes.logo} src={framework.logo} alt={`${framework.name}-logo`} />
                                <div className={classes.headerText}>
                                    <Typography variant="h4" component="h1">{framework.name}</Typography>
                                    <Typography variant="subtitle1" component="p" className={classes.description}>{framework.description}</Typography>
                                </div>
                            </div>
                            <div className={classes.button}>
                                <IconButton onClick={goToNextFramework}>
                                    <ForwardIcon  />
                                </IconButton>
                            </div>
                        </Grid>
                        <MetaCard
                            frameworkId={currentFrameworkId}
                            renderIcon={() => <GithubIcon />}
                            getMeta={Api.getGithubById}
                        />
                        <MetaCard
                            frameworkId={currentFrameworkId}
                            renderIcon={() => <PackageIcon />}
                            getMeta={Api.getNpmById}
                        />
                        <MetaCard
                            frameworkId={currentFrameworkId}
                            renderIcon={() => <WeightIcon />}
                            getMeta={Api.getBundlephobiaById}
                        />                        
                    </>
                    )
                    : (
                        <Loader fullHeight/>
                    )
                }
            </Grid>
        </div>
    )
}

export default Detail;
