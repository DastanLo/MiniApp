import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const PostCard = props => {
    const classes = useStyles();

    let image = 'https://www.tiffanyjonesre.com/assets/images/image-not-available.jpg';

    if (props.image) {
        image = process.env.REACT_APP_API_URL + '/' + props.image;
    }
    return (
        <Grid item xs={3} sm={12} md={6} lg={4}>
            <Paper className={classes.root}>
                {props.tags.map((data) => {
                    return (
                        <Chip
                            key={data}
                            label={data}
                            className={classes.chip}
                        />
                    );
                })}
            </Paper>
            <Card className={classes.card}>
                <CardMedia image={image} className={classes.media}/>
                <CardContent>
                    {props.text}
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PostCard;
