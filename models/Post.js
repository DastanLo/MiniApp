const {Schema, model, Types} = require('mongoose');


const CategorySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    tags: [String],
    user: {
        type: Types.ObjectId,
        ref : 'User',
        required: true,
    },
});

const Post = model('Post', CategorySchema);

module.exports = Post;
