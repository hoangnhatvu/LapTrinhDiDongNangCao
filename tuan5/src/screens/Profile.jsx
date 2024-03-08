import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import styles from './profile.style';

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <Image
            source={require('../../assets/images/coverProfile.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/userDefault.png')}
            style={styles.profile}
          />
          <Text style={styles.name}>Hello</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>ĐĂNG NHẬP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
