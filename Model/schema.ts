import mongoose, { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    Role:{type:String, enum:['Admin','SalesMan'] ,default:'SalesMan'}
})

const Users = models.user ||mongoose.model('user',UserSchema);

export default Users