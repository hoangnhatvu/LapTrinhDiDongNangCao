import React from 'react';
import {View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const StarRating = ({averageRate, size}) => {
  const stars = Array.from({length: 5}, (_, index) => index + 1);

  return (
    <View style={{flexDirection: 'row'}}>
      {stars.map((star, index) => {
        const isHalfStar =
          averageRate - star + 0.5 >= 0 && averageRate - star < 0;
        return (
          <IonIcon
            key={index}
            name={
              isHalfStar
                ? 'star-half'
                : star <= averageRate
                ? 'star'
                : 'star-outline'
            }
            size={size}
            color="gold"
          />
        );
      })}
    </View>
  );
};

export default StarRating
