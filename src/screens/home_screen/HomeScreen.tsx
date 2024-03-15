import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NotesContext} from '../../context/NotesContext';
export {NotesContext} from '../../context/NotesContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {notes} = useContext(NotesContext);

  function AddNewNotes() {
    navigation.navigate('AddNotes');
  }

  function EditNotes(noteId) {
    fetch('http://10.0.2.2:3000/notes/' + noteId)
      .then(response => response.json())
      .then(note => {
        navigation.navigate('EditNotes', {note: note});
      })
      .catch(error => console.error(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notes App</Text>
      <TouchableOpacity style={styles.addButton} onPress={AddNewNotes}>
        <Image
          style={styles.addButtonImage}
          source={require('../../images/add-circle.png')}
        />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.notesContainer}>
          {notes.map((note, index) => (
            <View key={index}>
              {/* <TouchableOpacity onPress={EditNotes}> */}
              <TouchableOpacity key={index} onPress={() => EditNotes(note)}>
                <View style={styles.note}>
                  <Text style={styles.title}>{note.title}</Text>
                  <Text style={styles.body}>{note.body}</Text>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryLabel}>Category: </Text>
                    <Text style={styles.category}>{note.category}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 15,
    elevation: 5, // Shadow elevation
    zIndex: 1,
  },
  addButtonImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
    zIndex: 1,
  },
  notesContainer: {
    marginTop: 20,
  },
  note: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow elevation
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    fontWeight: 'bold',
  },
  heading: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
