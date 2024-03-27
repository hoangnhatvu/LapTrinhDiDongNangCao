import {View, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './review.style';
import {Button, Heading, ReviewList} from '../components';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setListReview} from '../redux/slices/listReview.slice';
import {createReview} from '../helpers/handleReviewApis';
import {useToastMessage} from '../hook/showToast';

const Review = ({navigation}) => {
  const route = useRoute();
  const {listOrderProduct} = route.params;
  const listReview = useSelector(state => state.listReview.value);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {showToast} = useToastMessage();

  useEffect(() => {
    dispatch(setListReview());
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setListReview());
    });

    return unsubscribe;
  }, [navigation]);

  handleSendReview = async () => {
    console.log(listReview)
    try {
      setLoader(true);
      await Promise.all(listReview.map(item => createReview(item)));
      showToast('Gửi đánh giá thành công !', 'success');
      navigation.goBack();
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading navigation={navigation} text="Đánh giá sản phẩm" />
      <ScrollView>
        <ReviewList listOrderProduct={listOrderProduct} />
      </ScrollView>
      <Button
        title="Gửi đánh giá"
        loader={loader}
        onPress={() => handleSendReview()}
      />
    </SafeAreaView>
  );
};

export default Review;
