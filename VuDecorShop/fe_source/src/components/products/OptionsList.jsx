import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {setOptionProduct} from '../../redux/slices/optionProduct.slice';
import OptionItem from './OptionItem';
import {SIZES} from '../../../constants';

const OptionsList = ({options}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [listColor, setListColor] = useState(null);
  const [listSize, setListSize] = useState(null);

  const dispatch = useDispatch();

  const uniqueSizes = [...new Set(options.map(option => option.size))].filter(
    Boolean,
  );
  const uniqueColors = [...new Set(options.map(option => option.color))].filter(
    Boolean,
  );

  useEffect(() => {
    if (!selectedColor && !selectedSize) {
      dispatch(setOptionProduct(null));
    }

    setListColor(
      uniqueColors.map(item => item && {color: item, isAvailable: true}),
    );
    setListSize(
      uniqueSizes.map(item => item && {size: item, isAvailable: true}),
    );
  }, []);

  const getSizesForColor = color => {
    const sizesForColor = options
      .filter(option => option.color === color && option.size)
      .map(option => option.size);

    return sizesForColor.length > 0 ? sizesForColor : null;
  };

  const getColorsForSize = size => {
    const colorsForSize = options
      .filter(option => option.size === size && option.color)
      .map(option => option.color);

    return colorsForSize.length > 0 ? colorsForSize : null;
  };

  const handleColorPress = color => {
    setSelectedColor(color);
    const sizesForColor = getSizesForColor(color);
    if (!sizesForColor) {
      setListSize(
        listSize.map(item => ({size: item.size, isAvailable: false})),
      );
      dispatch(
        setOptionProduct(options.filter(option => option.color === color)[0]),
      );
    } else {
      dispatch(setOptionProduct(null));
      setListSize(
        listSize.map(item => ({
          size: item.size,
          isAvailable: sizesForColor.includes(item.size) ? true : false,
        })),
      );
    }

    if (selectedSize) {
      dispatch(
        setOptionProduct(
          options.filter(
            option => option.color === color && option.size === selectedSize,
          )[0],
        ),
      );
    }
  };

  const handleSizePress = size => {
    setSelectedSize(size);
    const colorsForSize = getColorsForSize(size);
    setListColor(
      listColor.map(item => ({color: item.color, isAvailable: false})),
    );
    if (!colorsForSize) {
      dispatch(
        setOptionProduct(options.filter(option => option.size === size)[0]),
      );
    } else {
      dispatch(setOptionProduct(null));
      setListColor(
        listColor.map(item => ({
          color: item.color,
          isAvailable: colorsForSize.includes(item.color) ? true : false,
        })),
      );
    }
    if (selectedColor) {
      dispatch(
        setOptionProduct(
          options.filter(
            option => option.size === size && option.color === selectedColor,
          )[0],
        ),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.textStyle}>Màu: </Text>

        <FlatList
          horizontal
          data={listColor}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <OptionItem
              text={item.color}
              isSelected={selectedColor === item.color}
              isAvailable={item.isAvailable}
              onPress={() => handleColorPress(item.color)}
            />
          )}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.textStyle}>Size: </Text>

        <FlatList
          horizontal
          data={listSize}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <OptionItem
              text={item.size}
              isSelected={selectedSize === item.size}
              isAvailable={item.isAvailable}
              onPress={() => handleSizePress(item.size)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  textStyle: {
    paddingRight: SIZES.small,
    width: 50,
    fontFamily: 'OpenSans-Medium',
  },
});

export default OptionsList;
