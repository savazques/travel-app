import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface TripFolderProps {
    onPress: () => void ;
    tripName: string;
    location: string; 
    dates: string; 
}
const TripFolder = ({onPress, tripName, location, dates}: TripFolderProps) => {
  return (
    <Pressable className='h-1/5 w-full bg-red-500 rounded-md p-3 mb-1'
                onPress={() => onPress}
    >
      <View className='text-stone-100'>
        <Text>{tripName} {location} {dates}</Text>
      </View>
    </Pressable>
  )
}

export default TripFolder