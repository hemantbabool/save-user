import AsyncStorage from '@react-native-async-storage/async-storage';


export type User = {
    id: number,
    name: string,
    email: string
}

// get maxId (helper function to find maxId)
const getCurrentMaxId = (userList: User[]): number => {
    if(userList.length === 0) {
        return 0;
    }
    const maxId = Math.max(...userList.map((user) => user.id));
    return maxId;
}

export const addUser = async (key: string, newUser: User) => {
    try {
        const userListJson = await AsyncStorage.getItem(key);
        const userList: User[] = userListJson? JSON.parse(userListJson) : [];
        const nextId = getCurrentMaxId(userList) + 1;
        newUser.id = nextId;
        userList.push(newUser);

        await AsyncStorage.setItem(key, JSON.stringify(userList));
        console.log('User added successfully!')
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

export const getUsers = async (key: string): Promise<User[]> => {

    try {
        const userListJson = await AsyncStorage.getItem(key);
        const userList: User[] = userListJson? JSON.parse(userListJson) : [];
        return userList;
    } catch (error) {
        console.log('error in retrieving users');
        return [];
    } 
}

export const deleteUser =async (key: string, id: number) => {
    try {
        const userListJson = await AsyncStorage.getItem(key);
        const userList: User[] = userListJson? JSON.parse(userListJson) : [];
        const updateUserList: User[] = userList.filter((user) => user.id !== id);
        await AsyncStorage.setItem(key, JSON.stringify(updateUserList));
        console.log('User deleted successfully!')
    } catch (error) {
        console.log('error in deleting user');
    } 
}
