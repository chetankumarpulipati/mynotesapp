import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const EditNotes = ({ route, navigation }) => {
    //const { note } = route.params; 
    const { note } = route.params ? route.params : { note: '' };
    const [editableNote, setEditableNote] = useState(note); 

    // function to handle changes made to the note
    const handleNoteChange = (text) => {
        setEditableNote(text);
    };

    // function to update the note when the user navigates away from the screen
    const handleUpdateNote = () => {
        // update the note in your data source here
        navigation.goBack();
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', handleUpdateNote);

        return unsubscribe;
    }, [navigation, handleUpdateNote]);

    return (
        <View>
            <TextInput
                value={editableNote}
                onChangeText={handleNoteChange}
                multiline
            />
            <Text>Edit Page</Text>
        </View>
    );
};

export default EditNotes;