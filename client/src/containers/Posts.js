import React, {useEffect} from 'react';
import {getPost} from "../store/actions/postActions";
import {useDispatch, useSelector} from "react-redux";
import {PostCard} from "../components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);
    useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);
    return (
        <Grid container
              justify="center"
              alignItems="center" direction="row" spacing={2} style={{marginTop: 10}}>
            {posts.length > 0 ?
                posts.map((post, index) => <PostCard key={index} text={post.text} image={post.image} tags={post.tags}/>)
                :
                <Grid item xs>
                 <Typography>
                     There is no posts yet, but you can add or subscribe to someone to see his posts
                 </Typography>
                </Grid>
            }
        </Grid>
    );
};

export default Posts;
