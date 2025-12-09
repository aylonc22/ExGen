import { User } from "../models/User";

export async function createUser(data) {
    return User.create(data);
}

export async function findUserByEmail(email) {
    return User.findOne({ email });
}

export async function getUser(id) {
    return User.findById(id);
}

export async function getAllUsers() {
    return User.find();
}

export async function deleteUser(id) {
    return User.findByIdAndDelete(id);
}
