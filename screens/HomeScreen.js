// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from 'luxon';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [mood, setMood] = useState('');
  const [journal, setJournal] = useState('');
  const [animationKey, setAnimationKey] = useState(null);

  // Define the animations based on mood
  const getAnimation = (mood) => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return require('../assets/happy.json');  // Replace with actual path or URL
      case 'sad':
        return require('../assets/sad.json');
      case 'angry':
        return require('../assets/angry.json');
      case 'neutral':
        return require('../assets/neutral.json');
      default:
        return require('../assets/neutral.json');  // Default animation
    }
  };

  // Handle saving mood and journal entry
  const handleSave = async () => {
    const currentDateTime = DateTime.now();
    const currentDate = currentDateTime.toISODate();
    const currentTime = currentDateTime.toFormat('HH:mm:ss'); // Capture time

    try {
      const entry = { mood, journal, date: currentDate, time: currentTime }; // Save mood, journal, date, and time
      const existingEntries = JSON.parse(await AsyncStorage.getItem('entries')) || [];
      existingEntries.push(entry);
      await AsyncStorage.setItem('entries', JSON.stringify(existingEntries));

      // Navigate to Entries screen after saving
      navigation.navigate('Entries');
    } catch (error) {
      console.error("Error saving mood entry:", error);
    }
  };

  // Handle mood change to trigger animation
  const handleMoodChange = (newMood) => {
    setMood(newMood);
    setAnimationKey(Math.random()); // Trigger re-render to update the animation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How are you feeling today?</Text>

      {/* Mood selection */}
      <TextInput
        style={styles.input}
        placeholder="Enter your mood (e.g., happy, sad)"
        value={mood}
        onChangeText={(text) => handleMoodChange(text)}
      />

      {/* Journal entry */}
      <TextInput
        style={[styles.input, styles.journalInput]}
        placeholder="Write a journal entry"
        value={journal}
        onChangeText={setJournal}
        multiline
      />

      {/* Display animation based on mood */}
      {mood && (
        <LottieView
          key={animationKey}  // Trigger animation change
          source={getAnimation(mood)}
          autoPlay
          loop
          style={styles.animation}
        />
      )}

      {/* Save button */}
      <Button title="Save Mood & Journal" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  journalInput: {
    height: 100,
  },
  animation: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});

export default HomeScreen;
