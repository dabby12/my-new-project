// screens/EntriesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EntriesScreen = () => {
  const [entries, setEntries] = useState([]);

  // Fetch all entries from AsyncStorage on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('entries');
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.error("Error loading entries", error);
      }
    };

    fetchEntries();
  }, []);

  // Function to handle deletion of an entry
  const handleDelete = async (index) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete", 
          onPress: async () => {
            const newEntries = [...entries];
            newEntries.splice(index, 1); // Remove the entry at the given index
            setEntries(newEntries); // Update the state
            await AsyncStorage.setItem('entries', JSON.stringify(newEntries)); // Update AsyncStorage
          }
        }
      ]
    );
  };

  // Render each entry in a FlatList
  const renderItem = ({ item, index }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entryText}>{item.date} {item.time}</Text>
      <Text style={styles.moodText}>{item.mood}</Text>
      <Text style={styles.journalText}>{item.journal}</Text>

      {/* Delete Button */}
      <Button
        title="Delete"
        color="red"
        onPress={() => handleDelete(index)} // Pass index to handleDelete function
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Mood Entries</Text>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  entryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  entryText: {
    fontSize: 14,
    color: '#555',
  },
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  journalText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});

export default EntriesScreen;
