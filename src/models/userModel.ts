import {Schema, SchemaTypes, model} from "mongoose";
import {compare, hash} from "bcrypt";

interface IUser extends Document {
    username: string,
    password: string,
    roles: [string],
    checkPassword(password: string): Promise<boolean>
}

const UserSchema = new Schema({
        username: {
            type: SchemaTypes.String,
            required: true
        },
        password: {
            type: SchemaTypes.String,
            required: true
        },
        roles: {
            type: [SchemaTypes.String],
            required: true
        }
    }
);

UserSchema.pre('save', async function (): Promise<void> {
    this.password = await hash(this.password, 10);
    this.roles.push('USER');
});

UserSchema.method('checkPassword', async function (password: string): Promise<boolean> {
    return await compare(password, this.password);
});

const User = model<IUser>('User', UserSchema, 'users');

export {
    IUser,
    User
}
