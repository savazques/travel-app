import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';



interface TripFolderProps {
    tripId: string;
    tripName: string;
    location: string; 
    dates: string; 
    onDelete: (tripId: string ) => void;
}

const TripFolder = ({ tripId, tripName, location, dates, onDelete }: TripFolderProps) => {
  return (
    <View className='h-1/5 w-full bg-red-500 rounded-md p-3 mb-1'>
      <Link href={`/trips/${tripId}?tripID=${encodeURIComponent(tripId)}&tripName=${encodeURIComponent(tripName)}&location=${encodeURIComponent(location)}&dates=${encodeURIComponent(dates)}`} asChild>
      <Pressable className='w-full h-5/6'>
        <View className='text-stone-100'>
          <Text>{tripName} {location} {dates}  </Text>
        </View>
      </Pressable>
    </Link>
    <Pressable onPress={() => onDelete(tripId)}>
          <FontAwesome name="trash" size={24} color="black" />
        </Pressable>
    </View>

  );
};

export default TripFolder;

