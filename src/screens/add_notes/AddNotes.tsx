import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../../context/NotesContext';
import axios from 'axios';


const AddNotes = () => {
  var [title, setTitle] = useState('');
  var [body, setBody] = useState('');
  var [category, setCategory] = useState('');
  var [customCategory, setCustomCategory] = useState('');
  const { addNote } = useNotes();
  const navigation = useNavigation();

  const handleSaveNote = async () => {
    if (title.trim() === '') {
      title = 'Untitled';
    } 
    if (body.trim() === '') {
      body = 'No body';
    }
    if (category === 'custom' && customCategory.trim() === '') {
      customCategory = 'Other';
    }
    try {
      const response = await axios.post('http://10.0.2.2:3000/notes', {
        title,
        body,
        category
      });
  
      console.log(response.data.message); // Log the response
  
      if (response.data.error) {
        Alert.alert(response.data.error);
      } else {
        console.log(`title: "${title}"`);
        console.log(`body: "${body}"`);
        console.log(`category: "${category}"`);
        
        // Add the note only if there's no error in the response
        addNote(title, body, customCategory || category);
        
        // Reset the form fields
        setTitle('');
        setBody('');
        setCategory('');
        setCustomCategory('');
  
        // Navigate to the Home screen
        navigation.navigate('Home');
      }
    } catch (error: any) {
      console.error('Error saving note:', error.response?.data?.error || error.message);
    }
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
        <Picker.Item label="Work" value="work" />
        <Picker.Item label="Personal" value="personal" />
        <Picker.Item label="Family" value="family" />
        <Picker.Item label="Friends" value="friends" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Finance" value="finance" />
        <Picker.Item label="Education" value="education" />
        <Picker.Item label="Entertainment" value="entertainment" />
        <Picker.Item label="Travel" value="travel" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="Sports" value="sports" />
        <Picker.Item label="Technology" value="technology" />
        <Picker.Item label="Science" value="science" />
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
