import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs
    screenOptions={{
        headerShown: false,
    }}
    >
        <Tabs.Screen 
            name='trips'

        />
        <Tabs.Screen 
            name='map'
        />
    </Tabs>
  )
}

export default TabsLayout