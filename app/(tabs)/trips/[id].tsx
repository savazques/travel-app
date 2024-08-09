import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
const TripDetails = () => {
  const { id } = useLocalSearchParams();
  const tripName = useLocalSearchParams().tripName as string;
  const location = useLocalSearchParams().location as string;
  const dates = useLocalSearchParams().dates as string;

  const router = useRouter()
  return (
    <View>
      <Text>Trip ID: {id}</Text>
      <Text>Trip Name: {tripName}</Text>
      <Text>Location: {location}</Text>
      <Text>Dates: {dates}</Text>
     <CustomButton
        onPress={() => router.back()}
        title='go back'
     />
    </View>
  );
};

export default TripDetails;



