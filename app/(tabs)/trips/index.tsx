import { View, Text, TextInput, Modal, Button, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import TripFolder from '@/components/TripFolder'
import CustomButton from '@/components/CustomButton'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';



type Trip = {
  id: string;
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
    const tripId = uuidv4()
    const newTrip = { id: tripId, tripName, location, dates };
    setTrips([...trip, newTrip]);
    setModalVisible(false);
    setTripName('');
    setLocation('');
    setDates('');
    saveTrip(tripId)
  };


  const saveTrip = async ( id: string) => {
    const {data, error} = await supabase
    .from ('tripData')
    .insert([
      {id: id, tripName: `${tripName}`, location: `${location}`, dates: `${dates}`}
    ])
    if (error) {
      console.error('Error saving trip', error)
    } else {
      console.log('Trip saved:', data)
    }
  }

  const deleteTrip = async(id:string) => {
    if (!id) return;
    console.log('delete data with id', id)
    const {data, error} = await supabase 
    .from('tripData')
    .delete()
    .eq('id', id )
    
    if (error) {
      console.error('Error', error.message)
      return
    } else {
      console.log('trip deleted')
      setTrips(trip.filter(tripItem => tripItem.id != id))
    }

  }

  useEffect(() => {
    const fetchTrips = async() => {
      const {data, error} = await supabase
        .from('tripData')
        .select('*')

      if (error) {
        console.error('Error Fetching Trips', error )
      } else {
        console.log('Added Trip Successfully') 
        setTrips(data)
      }
    }

    fetchTrips()
  }, []);


  return (
    <View className="flex-1 relative m-2">
      <View className='mt-20 w-full mb-5'>
        <View className='bg-indigo justify-center items-center '>
          <Text className='font-bold text-xl'>
            Trips
          </Text>
        </View>
      
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {trip.map((tripItem, index) => (
            <TripFolder 
              key={index}
              tripId={tripItem.id}
              tripName={tripItem.tripName}
              location={tripItem.location}
              dates={tripItem.dates}
              onDelete={deleteTrip}
            />
            
          ))}
      </ScrollView>
        
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

