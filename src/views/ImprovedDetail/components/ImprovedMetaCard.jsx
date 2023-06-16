import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import entries from 'lodash/entries';
import startCase from 'lodash/startCase';
import map from 'lodash/map';

const useStyles = makeStyles(theme => ({
    content: {
        color: '#586069',
    }
}))

const MetaCard = ({ renderIcon, getMeta, frameworkId }) => {
    const classes = useStyles();
    const meta = getMeta(frameworkId);

    return (
        <Card>
            <CardContent className={classes.content}>
                {renderIcon()}
                {
                    map(
                        entries(meta),
                        ([propertyName, value]) => (
                            <Typography key={propertyName} variant="body2" component="p">
                                <b>{startCase(propertyName)}: </b>
                                {value}
                            </Typography>
                        )
                    )
                }
            </CardContent>
        </Card>
    )
}

export default MetaCard;
