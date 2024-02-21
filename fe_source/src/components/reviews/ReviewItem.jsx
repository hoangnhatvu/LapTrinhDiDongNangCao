import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import styles from './reviewItem.style';
import {API_URL} from '@env';
import {formatCurrency} from '../../helpers/formatCurrency';
import {COLORS, SIZES} from '../../../constants';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {addReivew, updateReivew} from '../../redux/slices/listReview.slice';

const ReviewItem = ({item, order}) => {
  const {color, size} = item?.option || {};

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleRating = ratedValue => {
    setRating(ratedValue);
  };

  useEffect(() => {
    const data = {
      order: order,
      product: item?.product?.id,
      rate: rating,
      content: text,
    };
    dispatch(addReivew(data));
  }, []);

  useEffect(() => {
    const data = {
      product: item?.product?.id,
      rate: rating,
      content: text,
    };
    dispatch(updateReivew(data));
  }, [rating, text]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const iconName =
        i <= rating
          ? 'star'
          : i - 0.5 <= rating
          ? 'star-half-outline'
          : 'star-outline';
      const starColor = i <= rating ? '#FFD700' : '#CCCCCC';
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRating(i)}
          style={styles.starContainer}>
          <IonIcon name={iconName} size={24} color={starColor} />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const optionText =
    color && size ? `${color}, ${size}` : color ? color : size && size;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.image}>
          <Image
            source={
              item?.option?.option_image
                ? {uri: API_URL + item?.option?.option_image}
                : require('../../../assets/images/no_image.png')
            }
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productTitle}>
            {item?.product?.product_name}
          </Text>
          {optionText && <Text style={styles.option}>{optionText}</Text>}
          <Text style={styles.option}>
            {formatCurrency(item?.option?.price)} x {item?.quantity}
          </Text>
        </View>
      </View>
      <View style={styles.ratingWrapper}>
        <Text style={{fontFamily: 'OpenSans-SemiBold', color: COLORS.primary}}>
          Chọn số sao:{' '}
        </Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>
      <View style={styles.reviewWrapper}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            color: COLORS.primary,
            marginBottom: SIZES.small,
          }}>
          Viết đánh giá:{' '}
        </Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Nhập văn bản..."
          value={text}
          maxLength={250}
          textAlignVertical= "top"
          onChangeText={newText => setText(newText)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ReviewItem;
