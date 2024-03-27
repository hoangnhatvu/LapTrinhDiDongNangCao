import React, {useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Button, Heading, Loading} from '../components';
import styles from './editProfile.style';
import useRefreshUser from '../hook/refreshUser';
import {getUserData} from '../helpers/userDataManager';
import {useToastMessage} from '../hook/showToast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updateUser} from '../helpers/handleUserApis';
import {API_URL} from '@env';
import {TextInput, Modal} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../helpers/formatDate';

const EditProfile = ({navigation}) => {
  const {refreshUser} = useRefreshUser();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const {showToast} = useToastMessage();
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState(null);
  const [isEditName, setIsEditName] = useState(false);
  const [openModalDatePicker, setOpenModalDatePicker] = useState(false);
  const [openModalGender, setOpenModalGender] = useState(false);
  const nameInputRef = useRef(null);

  const formData = new FormData();

  const loadData = async () => {
    try {
      setIsLoading(true);
      await refreshUser();
      const data = await getUserData();
      setUserData(data);
      setName(userData?.user_name);
    } catch (error) {
      showToast(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        mediaType: 'photo',
      });

      const allowedFormats = ['jpg', 'jpeg', 'png'];
      const imageExtension = image.path.split('.').pop().toLowerCase();

      if (!allowedFormats.includes(imageExtension)) {
        showToast(
          'Định dạng ảnh không hỗ trợ. Chọn ảnh có định dạng .jpg, .jpeg, hoặc .png !',
          'warning',
        );
        return;
      }
      setSelectedImage(image);
      setIsEdit(true);
    } catch (error) {
      console.log(error);
      showToast('Lỗi khi chọn ảnh !', 'danger');
    }
  };

  const handleSave = async () => {
    try {
      setLoader(true);

      if (selectedImage) {
        formData.append('user_image', {
          uri: selectedImage.path,
          type: selectedImage.mime,
          name: 'userAvatar.jpg',
        });
      }
      if (isEditName) {
        formData.append('user_name', name);
      }
      if (selectedGender) {
        formData.append('gender', selectedGender);
      }
      if (selectedDate) {
        formData.append('birth_date', selectedDate);
      }
      formData.append('updated_token', userData.updated_token);
      console.log(formData);

      await updateUser(formData);
      showToast('Cập nhật thông tin người dùng thành công !', 'success');
      setIsEdit(false);
      setIsEditName(false);
    } catch (error) {
      showToast(`${error.response.data.message || error}`, 'danger');
    } finally {
      setLoader(false);
    }
  };

  const handleSelectGender = gender => {
    setSelectedGender(gender);
    setOpenModalGender(false);
    setIsEdit(true);
  };

  const handleEditName = () => {
    setIsEditName(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isEditName) {
      nameInputRef.current.focus();
    }
  }, [isEditName]);

  return (
    <SafeAreaView style={styles.container}>
      <Heading
        navigation={navigation}
        text="Hồ sơ cá nhân"
        handleBack={() => {}}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={pickImage}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={
                selectedImage
                  ? {uri: selectedImage.path}
                  : userData?.user_image
                  ? {uri: API_URL + userData?.user_image}
                  : require('../../assets/images/userDefault.png')
              }
              style={styles.profile}
            />
            <Ionicons
              name="camera-outline"
              size={54}
              style={{position: 'absolute', opacity: 0.5}}
            />
          </TouchableOpacity>
          <View style={styles.menuWrapper}>
            <View style={styles.menuItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 85}}>
                  <Text style={styles.menuText}>Email: </Text>
                </View>
                <TextInput
                  editable={false}
                  style={styles.infoText}
                  value={userData?.email}
                />
              </View>
            </View>
            <View style={styles.menuItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 85}}>
                  <Text style={styles.menuText}>Họ tên: </Text>
                </View>
                <TextInput
                  ref={nameInputRef}
                  style={styles.infoText}
                  defaultValue={userData?.user_name}
                  editable={isEditName ? true : false}
                  onChangeText={text => setName(text)}
                />
              </View>
              <TouchableOpacity onPress={handleEditName}>
                <Ionicons name="create-outline" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.menuItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 85}}>
                  <Text style={styles.gender}>Giới tính: </Text>
                </View>
                <TextInput
                  style={styles.infoText}
                  value={selectedGender ? selectedGender : userData?.gender}
                  editable={false}
                />
              </View>
              <TouchableOpacity onPress={() => setOpenModalGender(true)}>
                <Ionicons name="create-outline" size={24} />
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={openModalGender}
                onRequestClose={() => setOpenModalGender(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setOpenModalGender(false)}>
                      <Ionicons name="close-outline" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.genderOption}
                      onPress={() => handleSelectGender('Nam')}>
                      <Text style={styles.infoText}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.genderOption}
                      onPress={() => handleSelectGender('Nữ')}>
                      <Text style={styles.infoText}>Nữ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.genderOption}
                      onPress={() => handleSelectGender('Khác')}>
                      <Text style={styles.infoText}>Khác</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.menuItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 85}}>
                  <Text style={styles.menuText}>Ngày sinh: </Text>
                </View>
                <TextInput
                  style={styles.infoText}
                  value={
                    selectedDate ? `${selectedDate}` : userData?.birth_date
                  }
                  editable={false}
                />
              </View>
              <TouchableOpacity onPress={() => setOpenModalDatePicker(true)}>
                <Ionicons name="create-outline" size={24} />
              </TouchableOpacity>
              <DatePicker
                modal
                open={openModalDatePicker}
                date={new Date()}
                mode="date"
                title="Chọn ngày sinh của bạn"
                onConfirm={date => {
                  setOpenModalDatePicker(false);
                  setSelectedDate(formatDate(date));
                  setIsEdit(true);
                }}
                onCancel={() => {
                  setOpenModalDatePicker(false);
                }}
              />
            </View>
          </View>
        </View>
      )}
      {(isEdit || isEditName) && (
        <Button title="Lưu" onPress={() => handleSave()} loader={loader} />
      )}
    </SafeAreaView>
  );
};

export default EditProfile;
