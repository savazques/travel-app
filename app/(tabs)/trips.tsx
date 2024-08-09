import { View, Text, TextInput, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import TripFolder from '@/components/TripFolder'
import CustomButton from '@/components/CustomButton'

type Trip = {
  tripName: string;
  location: string;
  dates: string;
};

const Home = () => {
  const [trip, setTrips] = useState<Trip[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');

  const addTrip = () => {
    setTrips([...trip, { tripName, location, dates }]);
    setModalVisible(false);
    setTripName('');
    setLocation('');
    setDates('');
  };

  return (
    <View className="flex-1 relative m-2">
      {trip.map((tripItem, index) => (
        <TripFolder 
          key={index}
          onPress={() => console.log('click')}
          tripName={tripItem.tripName}
          location={tripItem.location}
          dates={tripItem.dates}
        />
      ))}

      <View className='absolute bottom-0 w-full'>
        <CustomButton
          onPress={() => setModalVisible(true)}
          title='Plan a New Trip'
          textStyles='font-bold'
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-md w-3/4">
            <Text className="text-lg font-bold mb-4">Create New Trip</Text>
            <TextInput
              placeholder="Trip Name"
              value={tripName}
              onChangeText={setTripName}
              className="border p-2 rounded-md mb-4"
            />
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              className="border p-2 rounded-md mb-4"
            />
            <TextInput
              placeholder="Dates"
              value={dates}
              onChangeText={setDates}
              className="border p-2 rounded-md mb-4"
            />
            <Button title="Add Trip" onPress={addTrip} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Home

