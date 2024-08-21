import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';

interface ModalProps {
  title: string;
  input1: string;
  input2: string | number;
  placeValue1: string;
  placeValue2: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (input1: string, input2: string) => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  input1,
  input2,
  placeValue1,
  placeValue2,
  visible,
  onClose,
  onSubmit,
}) => {
  const [value1, setValue1] = useState(input1);
  const [value2, setValue2] = useState(input2);

  const handleValueChange = (text:string) => {
    const convertValue = title === 'Add to Cost Breakdown' ? parseFloat(text) : text;
    setValue2(convertValue)
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-center items-center bg-black/50 backdrop-opacity-20'>
        <View className='bg-white p-5 rounded w-60'>
          <Text className='font-bold text-lg mb-3'>{title}</Text>
          <TextInput
            placeholder={placeValue1}
            value={value1}
            onChangeText={setValue1}
            className='border-b border-gray-300 mb-3'
          />
          <TextInput
            placeholder={placeValue2}
            value={value2.toString()}
            onChangeText={handleValueChange}
            keyboardType={title === 'Add to Cost Breakdown' ? 'numeric': 'default'}
            className='border-b border-gray-300 mb-3'
          />
          <View className='flex-row justify-between'>
            <Pressable onPress={onClose}>
              <Text>Close</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onSubmit(value1, value2);
                setValue1(''); 
                setValue2(''); 
              }}
            >
              <Text>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
