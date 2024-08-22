import { View, Text, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import ModalComponent from '@/components/Modal';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';


const TripDetails = () => {
  const { id } = useLocalSearchParams();
  const tripName = useLocalSearchParams().tripName as string;
  const location = useLocalSearchParams().location as string;
  const dates = useLocalSearchParams().dates as string;

  const [itinerary, setItinerary] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInput1, setModalInput1] = useState('');
  const [modalInput2, setModalInput2] = useState('');

  const [highlight, setHighlight] = useState([]);
  const [highlightmodalVisible, sethighlightModalVisible] = useState(false);
  const [highlightmodalInput1, sethighlightModalInput1] = useState('');
  const [highlightmodalInput2, sethighlightModalInput2] = useState('');
  
  const [costmodalVisible, setcostModalVisible] = useState(false);
  const [costmodalInput1, setcostModalInput1] = useState('');
  const [costmodalInput2, setcostModalInput2] = useState('');
  const [costTotal, setCostTotal] = useState(0)

  const router = useRouter();



  const addToCost = (description:string, amount:number) => {
    if (isNaN(amount)) {
      alert ('Please enter a number')
    }
    setCostTotal(prevTotal => prevTotal + amount);
    setcostModalInput1(''); // Clear inputs after submission
    setcostModalInput2('');
    setcostModalVisible(false);
    saveCost(amount, description)
  
  }
  const handleAddItinerary = (time: string, description: string) => {
    setItinerary([...itinerary, { time, description }]);
    setModalVisible(false);
    saveItinerary(time, description);
  };

  const handleaddToHighlights = (title: string, description: string) => {
    setHighlight([...highlight, {title, description}])
    sethighlightModalVisible(false)
    saveHighlights(title, description)
  }

  const saveHighlights = async(name: string, description: string) => {
    const {data, error} = await supabase
    .from('highlights')
    .insert({trip_id: id, highlight_name: name, highlight_description: description})

    if(error){
      console.log('Error adding highlight', error)
    } else {
      console.log('Successfully added highlight', data)
    }
  }
  const saveItinerary = async(time: string, description: string) => {
    const {data, error} = await supabase
    .from('itineraries')
    .insert({trip_id: id, time: time, description: description})

    if(error) {
      console.error('Error saving Itinerary', error)
    } else {
      console.log("Success saving itinerary", data)
    }
  }

  const saveCost = async(cost: number, description: string) => {
    const {data, error} = await supabase
    .from('expenses')
    .insert({trip_id: id, expense_name: description, expense_cost: cost})

    if (error) {
      console.error('Error Saving Cost', error)
    } else {
      console.log('Successful adding cost') 
    }
  }
  

  useEffect(() => {
    const fetchItinerary = async() => {
      const {data, error} = await supabase
        .from('itineraries')
        .select('*')

      if (error) {
        console.error('Error Fetching Trips', error )
      } else {
        console.log('Added Trip Successfully') 
        setItinerary(data)
      }
    }

    fetchItinerary()
  }, []);

  useEffect(() => {
    const fetchHighlights = async() => {
      const {data, error} = await supabase
      .from('highlights')
      .select('*')

      if(error) {
        console.error('Error fetching Highlights', error)
      } else {
        console.log('Successful Displaying Highlights', data)
        setHighlight(data)
      }
    }
    fetchHighlights()
  },[]);


  useEffect(() => {
    const fetchCost = async() => {
      const {data, error} = await supabase
        .from('expenses')
        .select('expense_cost')

      if (error) {
        console.error('Error Fetching Expenses', error )
      } else {
        console.log('Added Expense Successfully') 
        const total = data.reduce((sum, item) => sum + item.expense_cost, 0)
        setCostTotal(total)
      }
    }

    fetchCost()
  }, []);

 

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
        <View className='flex-row w-full justify-between mb-3'>
          <Text className='text-base font-bold'>Location: {location}</Text>
          <Text className='text-base font-bold'>Dates: {dates}</Text>
        </View>
        <View className='flex-row gap-2'>
          <View className='flex-1 min-h-[550] min-w-[60]'>
            <Text> Itinerary </Text>
            <Pressable onPress={() => setModalVisible(true)}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
            
            <FlatList
              data={itinerary}
              renderItem={({ item }) => (
                <View className='flex-row items-center'>
                  <Text>{item.time}: </Text>
                  <Text>{item.description}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              className='p-2 bg-white w-full h-1/2 rounded mt-2 border-2 border-black '
            />
          </View>
          <View className='flex-1 min-h-[400]'>
            <Text> Cost BreakDown</Text>
            <Pressable onPress={() => setcostModalVisible(true)}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
            <View className='bg-green-200 w-full h-20 rounded flex items-center justify-center border-2 border-black mb-3 mt-3'>
                <Text className='font-bold text-2xl'> {costTotal} </Text>
            </View>

            <Text> Highlights </Text>
            <Pressable onPress={() => sethighlightModalVisible(true)}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
            <View className='w-full h-20 rounded'>
               <FlatList
                data={highlight}
                renderItem={({item}) => (
                  <View className='flex-row items-center'>
                    <Text>{item.highlight_name} </Text>
                    <Text>{item.highlight_description}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                className='bg-white w-full h-3/4 rounded mt-2 border-2 border-black'
               /> 
            </View>

          </View>

      
        </View>
        
        <View className='min-h-[150]'>
          <Text> Photo Gallery </Text>
        </View>
      </View>

      <ModalComponent
        title="Add to Cost Breakdown"
        input1={costmodalInput1}
        input2={costmodalInput2}
        placeValue1="Cost Description"
        placeValue2="Amount"
        visible={costmodalVisible}
        onClose={() => setcostModalVisible(false)}
        onSubmit={addToCost}
      />
      <ModalComponent
        title="Add to Itinerary"
        input1={modalInput1}
        input2={modalInput2}
        placeValue1="Time"
        placeValue2="Itinerary Description"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddItinerary}
      />

      <ModalComponent
        title='Add a Highlight'
        input1={highlightmodalInput1}
        input2={highlightmodalInput2}
        placeValue1="Highlight Name"
        placeValue2="Hightlight Description"
        visible={highlightmodalVisible}
        onClose={() => sethighlightModalVisible(false)}
        onSubmit={handleaddToHighlights}
      />
  </View>
  );
};

export default TripDetails;





