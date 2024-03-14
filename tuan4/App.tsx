import {TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import tw from 'twrnc'

const Home = () => {

  return (
    <SafeAreaView style={tw`bg-offwhite flex-1"`}>
      <View style={tw`mx-22 mt-12`}>
        {/* <View style={tw`flex-row justify-between items-center`}>
          <IonIcon name="location-outline" size={24} />
          <Text style={tw`font-semibold text-base text-gray-500`}>
            Việt Nam
          </Text>
          <View style={tw`flex-end`}>
            <View
              style={tw`absolute bottom-4 w-4 h-4 rounded-2 bg-green-500 flex items-center justify-center z-50`}>
              <Text
                style={tw`font-normal font-semibold:text-600 text-xs text-lighwhite`}>
                8
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;
