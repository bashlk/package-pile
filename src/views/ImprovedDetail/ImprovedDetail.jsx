import React, { Suspense, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GithubIcon from '@material-ui/icons/GitHub';
import PackageIcon from '@material-ui/icons/CardGiftcard';
import WeightIcon from '@material-ui/icons/FitnessCenter';
import { ImprovedMetaCard, ImprovedHeader } from './components';
import { Loader } from '../../components';
import { ImprovedApi } from '../../api';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '30px',
    },
}));

const Detail = () => {
    const classes = useStyles();
    const [currentFrameworkId] = useState('react');

    return (
        <div className={classes.root}>
             <Grid container spacing={3}>
                <Suspense fallback={<Loader fullHeight />}>
                    <ImprovedHeader frameworkId={currentFrameworkId} />
                    <Grid item xs={4}>
                        <Suspense fallback={<Loader />}>
                            <ImprovedMetaCard
                                frameworkId={currentFrameworkId}
                                renderIcon={() => <GithubIcon />}
                                getMeta={ImprovedApi.github.getById}
                            />
                        </Suspense>
                    </Grid>
                    <Grid item xs={4}>
                        <Suspense fallback={<Loader />}>
                            <ImprovedMetaCard
                                frameworkId={currentFrameworkId}
                                renderIcon={() => <PackageIcon />}
                                getMeta={ImprovedApi.npm.getById}
                            />
                        </Suspense>
                    </Grid>
                    <Grid item xs={4}>
                        <Suspense fallback={<Loader />}>
                            <ImprovedMetaCard
                                frameworkId={currentFrameworkId}
                                renderIcon={() => <WeightIcon />}
                                getMeta={ImprovedApi.bundlephobia.getById}
                            /> 
                        </Suspense>
                    </Grid>
                </Suspense>               
            </Grid>
        </div>
    )
}

export default Detail;
