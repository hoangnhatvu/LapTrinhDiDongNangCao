import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './filter.style';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, SIZES} from '../../../constants';
import {getCategory} from '../../helpers/handleCategoryApis';
import {useToastMessage} from '../../hook/showToast';
import {API_URL} from '@env';
import Button from '../Button';

const Filter = ({onApplyFilter}) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortByPriceAscending, setSortByPriceAscending] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [sortByNewest, setSortByNewest] = useState(false);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {showToast} = useToastMessage();

  const handleCategoryToggle = category => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(category);

    if (index === -1) {
      updatedCategories.push(category);
    } else {
      updatedCategories.splice(index, 1);
    }
    setSelectedCategories(updatedCategories);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getCategory();
      setCategories(response.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const applyFilter = () => {
    const filters = {
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      sortByPriceAscending,
      selectedCategories,
      sortByPopularity,
      sortByNewest,
    };

    console.log(filters)
    onApplyFilter(filters);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subText}>Khoảng giá</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: SIZES.medium,
        }}>
        <TextInput
          placeholder="Giá thấp nhất"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={text => setMinPrice(text)}
          style={styles.inputText}
        />
        <Text style={{paddingHorizontal: SIZES.xSmall, fontSize: SIZES.medium}}>
          {' '}
          -{' '}
        </Text>
        <TextInput
          placeholder="Giá cao nhất"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={text => setMaxPrice(text)}
          style={styles.inputText}
        />
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.subText}>Sắp xếp theo giá từ thấp đến cao</Text>
        <Switch
          style={{marginTop: -10}}
          value={sortByPriceAscending}
          onValueChange={() => setSortByPriceAscending(!sortByPriceAscending)}
        />
      </View>

      <Text style={styles.subText}>Loại sản phẩm</Text>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : (
        <View style={{gap: 8, marginBottom: SIZES.medium}}>
          {categories?.map((item, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  value={selectedCategories.includes(item.id)}
                  onValueChange={() => handleCategoryToggle(item.id)}
                  style={{marginRight: SIZES.small}}
                />
                <View style={styles.categoryWrapper}>
                  <View style={styles.image}>
                    <Image
                      source={
                        item.category_image
                          ? {uri: API_URL + item.category_image}
                          : require('../../../assets/images/no_image.png')
                      }
                      style={styles.productImg}
                    />
                  </View>
                  <Text>{item.category_name}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <Text style={styles.subText}>Sắp xếp theo </Text>

      <View style={{marginVertical: 4}}>
        <View style={styles.sortContainer}>
          <Text style={styles.subText}>Phổ biến nhất</Text>
          <Switch
            style={{marginTop: -10}}
            value={sortByPopularity}
            onValueChange={() => setSortByPopularity(!sortByPopularity)}
          />
        </View>
      </View>

      <View style={{marginVertical: 4}}>
        <View style={styles.sortContainer}>
          <Text style={styles.subText}>Mới nhất</Text>
          <Switch
            style={{marginTop: -10}}
            value={sortByNewest}
            onValueChange={() => setSortByNewest(!sortByNewest)}
          />
        </View>
      </View>


      <Button loader={false} title="Áp dụng" onPress={applyFilter} />
    </ScrollView>
  );
};

export default Filter;
