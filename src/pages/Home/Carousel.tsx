import React from 'react';
import { viewportWidth,wp, hp } from '@/utils/index';
import Carousel from 'react-native-snap-carousel';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';
const data = [
    "https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF",
    "https://t7.baidu.com/it/u=3713375227,571533122&fm=193&f=GIF",
    "https://t7.baidu.com/it/u=2646899128,380997184&fm=193&f=GIF",
    "https://t7.baidu.com/it/u=3355440349,3059059541&fm=193&f=GIF",
    "https://t7.baidu.com/it/u=2493370084,3224128536&fm=193&f=GIF",
];
const sliderWidth = viewportWidth;
const slidwidth = wp(90);
const slidheight = hp(26);
const itemWidth = wp(90) + wp(2) *2;//每张图的真实宽度
class WCarousel extends React.Component{
    _renderItem = (
            {item}:{item:string},
            // parallaxProps?:AdditionalParallaxProps
    ) => {
        return (
            <Image source={{uri:item}} style={styles.Image}/>
        )
    }
    render(){
        return (
            <Carousel
                data={data}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            />
        )
    }
}
const styles = StyleSheet.create({
    Image:{
        width:slidwidth,
        height:slidheight,
    }
})
export default WCarousel;