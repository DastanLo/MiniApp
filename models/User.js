const {Schema, model,Types} = require('mongoose');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                if (!this.isModified('username')) return true;
                const user = await User.findOne({username: value});
                if (user) throw new Error('This user is already exist');
                return true;
            },
            message: 'This user is already exist',
        }
    },
    password: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    avatar: String,
    subscriptions : [{type : Types.ObjectId}],
    token: {
        type: String,
        required: true
    }
});
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

schema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

schema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

schema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = model('User', schema);
module.exports = User;
