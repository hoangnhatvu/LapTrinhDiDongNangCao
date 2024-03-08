import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { COLORS } from '../../../constants'

const Carousel = () => {
  const slides = [
    "https://homeoffice.com.vn/images/blog/5/y-tuong-trang-tri-phong-lam-viec-dep.jpg",
    "https://tunhuahanoi.com/wp-content/uploads/2019/11/TI%C3%8AU-CH%C3%8D-B%E1%BB%90-TR%C3%8D-G%C3%93C-H%E1%BB%8CC-T%E1%BA%ACP-CHO-B%C3%89-3-1.jpg",
    "https://homeoffice.com.vn/images/thumbnails/999/666/blog/5/y-tuong-trang-tri-phong-lam-viec-dep.jpg",
  ]
  return (
    <View style={styles.carouselContainer}>
      <SliderBox images={slides}
        dotColor={COLORS.primary}
        inavtiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center"
  }
})