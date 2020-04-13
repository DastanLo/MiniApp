import React from 'react';
import {PostForm} from "../components";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import {createPost, resetPostError} from "../store/actions/postActions";
import Alert from "@material-ui/lab/Alert";

const AddPostPage = () => {
    const error = useSelector(state => state.post.error);
    const dispatch = useDispatch();
    const newPostSubmit = (postData) => {
        dispatch(createPost(postData));
    };
    return (
        <Container maxWidth="sm">
            {
                error && <Alert severity="error" onClose={() => dispatch(resetPostError())}>{error.message}</Alert>
            }
            <Box pb={2} pt={2}>
                <Typography variant="h4">New Post</Typography>
            </Box>
            <PostForm tags={['lol', 'funny', 'family']} onSubmit={newPostSubmit}/>
        </Container>
    );
};

export default AddPostPage;
