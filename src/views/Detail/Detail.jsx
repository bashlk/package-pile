import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '@material-ui/icons/GitHub';
import PackageIcon from '@material-ui/icons/CardGiftcard';
import WeightIcon from '@material-ui/icons/FitnessCenter';
import { getFrameworkById, getGithubById, getNpmById, getBundlephobiaById } from '../../api';
import { Loader } from '../../components';
import { MetaCard } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '30px',
    },
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

const Detail = () => {
    const classes = useStyles();
    const [framework, setFramework] = useState(null);
    const [currentFrameworkId] = useState('react');
    
    useEffect(() => {
        getFrameworkById(currentFrameworkId).then(framework => {
            setFramework(framework);
        })
    }, [currentFrameworkId])
    
    return (
        <div className={classes.root}>
             <Grid container spacing={3}>
                {framework 
                    ? (
                    <>
                        <Grid item xs={12} className={classes.header}>
                            <img className={classes.logo} src={framework.logo} alt={`${framework.name}-logo`} />
                            <div className={classes.headerText}>
                                <Typography variant="h4" component="h1">{framework.name}</Typography>
                                <Typography variant="subtitle1" component="p" className={classes.description}>{framework.description}</Typography>
                            </div>
                        </Grid>
                        <MetaCard
                            frameworkId={currentFrameworkId}
                            renderIcon={() => <GithubIcon />}
                            getMeta={getGithubById}
                        />
                        <MetaCard
                            frameworkId={currentFrameworkId}
                            renderIcon={() => <PackageIcon />}
                            getMeta={getNpmById}
                        />
                        <MetaCard
                            frameworkId={currentFrameworkId}
                            renderIcon={() => <WeightIcon />}
                            getMeta={getBundlephobiaById}
                        />                        
                    </>
                    )
                    : (
                        <Loader/>
                    )
                }
            </Grid>
        </div>
    )
}

export default Detail;
