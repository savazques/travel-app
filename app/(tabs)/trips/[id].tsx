import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const TripDetails = () => {
  const { id } = useLocalSearchParams();
  const tripName = useLocalSearchParams().tripName as string;
  const location = useLocalSearchParams().location as string;
  const dates = useLocalSearchParams().dates as string;

  const router = useRouter()
  return (
    <View className='flex-1 m-2 mt-20 justify-between'>
      <View className='flex-row items-center justify-center mb-3'>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </Pressable>
        <View className='flex-1 items-center'>
          <Text className='font-bold text-xl'>{tripName}</Text>
        </View>
        
      </View>

      
      <View>
        <View className='flex-row w-full justify-between '>
            <Text>Location: {location}</Text>
            <Text>Dates: {dates}</Text>
        </View>
        <View className='flex-row gap-1'>
          <View className='flex-1 bg-blue-300 min-h-[600] min-w-[60]'>
            <Text> Itinerary </Text>
          </View>
          <View className='flex-1 bg-red-300 min-h-[400]'>
            <Text> Cost BreakDown and Highlight </Text>
            <View>
              
            </View>
          </View>
        </View>
        <View className='min-h-[150]'>
          <Text> Photo Gallery </Text>
        </View>
      </View>


    </View>
  );
};

export default TripDetails;



