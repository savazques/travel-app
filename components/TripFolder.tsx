import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

interface TripFolderProps {
    tripId: string;
    tripName: string;
    location: string; 
    dates: string; 
}

const TripFolder = ({ tripId, tripName, location, dates }: TripFolderProps) => {
  return (
    <Link  href={`/trips/${tripId}?tripName=${encodeURIComponent(tripName)}&location=${encodeURIComponent(location)}&dates=${encodeURIComponent(dates)}`} asChild>
      <Pressable className='h-1/5 w-full bg-red-500 rounded-md p-3 mb-1'>
        <View className='text-stone-100'>
          <Text>{tripName} {location} {dates}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default TripFolder;

