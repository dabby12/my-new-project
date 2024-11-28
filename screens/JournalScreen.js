import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JournalScreen = ({ route }) => {
  const { mood, journal, date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Journal Entry</Text>

      <Text style={styles.date}>{date}</Text>

      <Text style={styles.mood}>Mood: {mood}</Text>
      <Text style={styles.journal}>Journal: {journal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    color: 'gray',
  },
  mood: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  journal: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});

export default JournalScreen;
