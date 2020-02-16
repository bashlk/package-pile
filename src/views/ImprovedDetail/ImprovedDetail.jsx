import React, { Suspense, useState, useTransition } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GithubIcon from '@material-ui/icons/GitHub';
import PackageIcon from '@material-ui/icons/CardGiftcard';
import WeightIcon from '@material-ui/icons/FitnessCenter';
import LinearProgress from '@material-ui/core/LinearProgress';
import indexOf from 'lodash/fp/indexOf';
import { ImprovedMetaCard, ImprovedHeader } from './components';
import { Loader } from '../../components';
import { ImprovedApi, Api } from '../../api';

const useStyles = makeStyles(theme => ({
    container: {
        margin: '30px',
    },
}));

const frameworkIds = Api.getFrameworkIds();

const Detail = () => {
    const classes = useStyles();
    const [currentFrameworkId, setCurrentFrameworkId] = useState(frameworkIds[0]);
    const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

    return (
        <div>
            {isPending && <LinearProgress />}
            <div className={classes.container}>
                <Grid container spacing={3}>
                    <Suspense fallback={<Loader fullHeight />}>
                        <ImprovedHeader
                            frameworkId={currentFrameworkId}
                            onNextClick={() => {
                                startTransition(() => {
                                    const currentFrameworkIndex = indexOf(currentFrameworkId, frameworkIds);
                                    if(currentFrameworkIndex < (frameworkIds.length - 1)){
                                        setCurrentFrameworkId(frameworkIds[currentFrameworkIndex + 1]);
                                    } else {
                                        setCurrentFrameworkId(frameworkIds[0]);
                                    }
                                }) 
                            }}
                        />
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
        </div>
        
    )
}

export default Detail;
