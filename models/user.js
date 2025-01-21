import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    sub: { 
        type: String, 
        required: true, 
        unique: true }, // Auth0 user identifier
    name: { 
        type: String,
        required: true
     },
    email: { 
        type: String, 
        required: true
     }
});

const User = mongoose.model('User', userSchema);

export default User;
