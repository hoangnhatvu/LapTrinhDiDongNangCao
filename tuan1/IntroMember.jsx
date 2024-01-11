import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const IntroMember = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View>
      <Text>Giới thiệu thành viên</Text>
      <Text>Hoàng Nhất Vũ – 20110751</Text>
      <Text>Lại Văn Quý – 20110708</Text>
      <Text>Lê Đình Bảo – 20110613</Text>
    </View>
  );
};

export default IntroMember;
