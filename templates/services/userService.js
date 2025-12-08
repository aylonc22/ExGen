import {userQueries} from '../db/index';

export async function getAllUsers() {
    return userQueries.getAllUsers();
}
export async function getUser(id) {
    return userQueries.getUser(id);
}

export async function createUser(data) {
    return userQueries.createUser(data);
}

export async function deleteUser(id) {
    return userQueries.deleteUser(id);
}

