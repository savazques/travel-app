import { View, Text, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import React from 'react'
import CustomButton from '@/components/CustomButton'

const App = () => {
  const router = useRouter()
  return (
    <View className='flex-1 items-center justify-center bg-sky-400'>
      <SafeAreaView className='flex-1 px-1 justify-between'>
          <View>
            <Text> Travel the World Slay LEts get started on going where you want to go </Text>
          </View>
            <View>
              <CustomButton
                onPress={() => router.push('/trips')}
                title='Welcome'/>
            </View>

      </SafeAreaView>
    
    
    </View>
  )
}

export default App