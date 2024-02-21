import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './search.style';
import {Filter, ProductList} from '../components';
import Modal from 'react-native-modal';
import {useToastMessage} from '../hook/showToast';
import {searchProducts} from '../helpers/handleProductApis';

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const {showToast} = useToastMessage();

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const responseResults = await searchProducts({});
      setProductList(responseResults.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApplyFilter = async filters => {
    toggleBottomSheet();
    setIsLoading(true);
    try {
      let data = {};
      if (searchKey) {
        data.searchText = searchKey;
      }
      if (filters.minPrice || filters.maxPrice) {
        if (
          filters.minPrice &&
          filters.maxPrice &&
          filters.minPrice >= filters.maxPrice
        ) {
          throw new Error(
            'Giá thấp nhất không được lớn hơn hoặc bằng giá cao nhất !',
          );
        }
        if (filters.minPrice) {
          data.minPrice = filters.minPrice;
        }
        if (filters.maxPrice) {
          data.maxPrice = filters.maxPrice;
        }
      }
      if (filters.sortByPriceAscending !== null) {
        data.sortByPriceAscending = `${filters.sortByPriceAscending}`;
      }
      if (filters.selectedCategories.length > 0) {
        data.selectedCategories = filters.selectedCategories;
      }
      console.log(data);
      const responseResult = await searchProducts(data);
      console.log(responseResult.data)
      setProductList(responseResult.data)
    } catch (error) {
      if (error?.message) {
        showToast(error?.message, 'danger');
      } else {
        showToast('Có lỗi xảy ra !', 'danger');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const responseResult = await searchProducts({searchText: searchKey});
      setProductList(responseResult.data);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder="Tìm kiếm sản phẩm"></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => handleSearch()}>
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{paddingLeft: 4, marginRight: -4}}
          onPress={toggleBottomSheet}>
          <AntDesign name="filter" size={36} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <ProductList data={productList} isLoading={isLoading} />
      <Modal
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleBottomSheet}
        onSwipeComplete={toggleBottomSheet}
        swipeDirection={['down']}
        style={styles.bottomSheet}>
        <Filter onApplyFilter={handleApplyFilter} />
      </Modal>
      <FlatList
        data={filteredProducts}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Search;
