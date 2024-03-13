import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../../context/NotesContext';

const AddNotes = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const { addNote } = useNotes();
  const navigation = useNavigation();

  const handleSaveNote = () => {
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Category:', customCategory || category);
    addNote(title, body, customCategory || category);
    setTitle('');
    setBody('');
    setCategory('');
    setCustomCategory('');
    navigation.navigate('Home'); // Navigate back to the Home screen after saving the note
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
        <Picker.Item label="Select category" value="" />
        <Picker.Item label="Other" value="custom" />
      </Picker>
      {category === 'custom' && (
        <TextInput
          style={styles.input}
          placeholder="Enter custom category"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}
      <Button title="Save Note" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  picker: {
    marginBottom: 10,
  },
});

export default AddNotes;
