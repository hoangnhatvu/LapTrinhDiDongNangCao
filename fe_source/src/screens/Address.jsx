import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './address.style';
import {AddressList, Button, Heading, Loading} from '../components';
import useRefreshUser from '../hook/refreshUser';
import {useToastMessage} from '../hook/showToast';
import {getUserData} from '../helpers/userDataManager';

const Address = ({navigation}) => {
  const {refreshUser} = useRefreshUser();
  const [isLoading, setIsLoading] = useState(false);
  const {showToast} = useToastMessage();
  const [listAddress, setListAddress] = useState(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await refreshUser();
      const userData = await getUserData();
      setListAddress(userData.ship_infos);
    } catch (error) {
      showToast(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Heading
        navigation={navigation}
        text="Sổ địa chỉ"
        handleBack={() => {}}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <AddressList data={listAddress} />
          {listAddress && listAddress.length < 100 && (
            <Button
              title="Thêm địa chỉ"
              loader={false}
              onPress={() => navigation.navigate('EditAddress', {listAddress})}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Address;
