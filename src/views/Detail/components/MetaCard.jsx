import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import entries from 'lodash/entries';
import startCase from 'lodash/startCase';
import map from 'lodash/map';
import { Loader } from '../../../components'

const useStyles = makeStyles(theme => ({
    content: {
        color: '#586069',
    }
}))

const MetaCard = ({ renderIcon, getMeta, frameworkId }) => {
    const classes = useStyles();
    const [meta, setMeta] = useState(null);


    useEffect(() => {
        getMeta(frameworkId).then(setMeta);
    }, [getMeta, frameworkId])

    return (
        <Grid item xs={4}>
            <Card>
                <CardContent className={classes.content}>
                    {renderIcon()}
                    {meta
                        ? (
                            map(
                                entries(meta),
                                ([propertyName, value]) => (
                                    <Typography key={propertyName} variant="body2" component="p">
                                        <b>{startCase(propertyName)}: </b>
                                        {value}
                                    </Typography>
                                )
                            )
                        )
                        : (
                            <Loader/>
                        )
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}

export default MetaCard;
