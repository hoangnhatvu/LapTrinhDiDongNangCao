import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../constants';
import styles from './profile.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {clearUserData, getUserData} from '../helpers/userDataManager';
import {logout} from '../helpers/handleAuthApis';
import {useToastMessage} from '../hook/showToast';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../redux/slices/isLogin.slice';
import {API_URL} from '@env';
import { clearToken } from '../helpers/tokenManager';
import useRefreshUser from '../hook/refreshUser';
import { Loading } from '../components';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const isLogin = useSelector(state => state.isLogin.value);
  const {showToast} = useToastMessage();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {refreshUser} = useRefreshUser();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const logoutAlert = () => {
    Alert.alert('Đăng xuất tài khoản', 'Bạn có chắc muốn đăng xuất không ?', [
      {
        text: 'Hủy',
        onPress: () => {},
      },
      {
        text: 'Tiếp tục',
        onPress: () => handleLogout(),
      },
    ]);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      await refreshUser();
      const data = await getUserData();
      if (isLogin && data) {
        setUserData(data);
      } else if (data) {
        dispatch(setIsLogin(true));
      } else {
        dispatch(setIsLogin(false))
      }
    } catch (error) {
      showToast("Phiên đăng nhập hết hạn !", "warning");
      dispatch(setIsLogin(false))
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isLogin]);

  useEffect(() => {
    loadData();
  }, []);

  handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      showToast('Đăng xuất thành công!', 'success');
      clearUserData();
      clearToken();
      dispatch(setIsLogin(false));
    } catch (error) {
      showToast(`${error.response.data.message}`, 'danger');
    } finally {
      setIsLoading(false);
    }
  };
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
            source={
              userData?.user_image
                ? {uri: API_URL + userData?.user_image}
                : require('../../assets/images/userDefault.png')
            }
            style={styles.profile}
          />
          <Text style={styles.name}>
            {isLogin === true ? userData?.user_name : 'Vui lòng đăng nhập'}
          </Text>
          {isLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData?.email}</Text>
            </View>
          )}

          {isLogin === false ? (
            <View></View>
          ) : (
            <ScrollView style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <View style={styles.menuItem(0.2)}>
                  <Ionicons
                    name="person-outline"
                    color={COLORS.primary}
                    size={24}   
                  />
                  <Text style={styles.menuText}>Hồ sơ cá nhân</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="key-change"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Đổi mật khẩu</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="book-open-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Sổ địa chỉ</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Đơn hàng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Giỏ hàng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={styles.menuText}>Yêu thích</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logoutAlert()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" color={COLORS.primary} size={24} />
                  <Text style={styles.menuText}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
      {isLoading && (
        // <View style={styles.loadingContainer}>
        //   <ActivityIndicator size={80} color={COLORS.primary} />
        // </View>
        <Loading/>
      )}
    </View>
  );
};

export default Profile;
