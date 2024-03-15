import React from 'react';
import {View, Text} from 'react-native';

const NoteScreen = ({route}) => {
  const {note} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{note.content}</Text>
    </View>
  );
};

export default NoteScreen;
