import React, { createContext, useState, useContext } from 'react';

// Define the type for notes
type Note = {
  title: string;
  body: string;
  category: string;
};

// Define the type for context value
type NotesContextType = {
  notes: Note[];
  addNote: (title: string, body: string, category: string) => void;
};

// Create the context
export const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Define the provider component
export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (title: string, body: string, category: string) => {
    setNotes(prevNotes => [...prevNotes, { title, body, category }]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to consume the context
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
