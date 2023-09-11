import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { User, addUser, getUsers, deleteUser } from './storage';

export default function App() {

  const [userList, setUserList] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');

  useEffect(() => {
    getUsers('userList').then((users) => {
      setUserList(users);
    })
  })

  const handleAddUser = () => {
    const newUser: User = {
      id: 0,
      name: newUserName,
      email: newUserEmail
    }

    addUser('userList', newUser).then(() => {
      getUsers('userList').then((users) => {
        setUserList(users);
      })
    });

    setNewUserName('');
    setNewUserEmail('');
  }

  const deleteThisUser = (idToDeleted: number) => {
    deleteUser('userList', idToDeleted).then(
      () => {
        getUsers('userList').then((users) => {
          setUserList(users);
        })
      }
    )
  }
  
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>User List:</Text>
      {userList.map((user) => (
        <TouchableOpacity key={user.id} onPress={() => deleteThisUser(user.id)}>
          <View style={styles.userContainer} >
            <Text>{`ID: ${user.id}`}</Text>
            <Text>{`Name: ${user.name}`}</Text>
            <Text>{`Email: ${user.email}`}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Text style={styles.title}>Add New User:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newUserName}
        onChangeText={(text) => setNewUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newUserEmail}
        onChangeText={(text) => setNewUserEmail(text)}
      />
      <Button title="Add User" onPress={handleAddUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});
