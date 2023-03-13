import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";

interface IItem {
    item: any,
    index: number,
    translateX: Animated.SharedValue<number>,
}

const {width, height} = Dimensions.get('window')
const SIZE = width * 0.7

const Item: FC<IItem> = ({item, index, translateX}) => {

    const rStyle = useAnimatedStyle(() => {

        const scale = interpolate(
            translateX.value, [
                (index - 1) * width, index * width, (index + 1) * width
            ], [0, 1, 0],
            Extrapolation.CLAMP
        )
        const borderRadius = interpolate(translateX.value,[
            (index - 1) * width, index * width, (index + 1) * width
        ],[0, width / 2, 0])

        return {
            transform: [{scale}],
            borderRadius,
        }

    })

    const textS = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value,[
            (index - 1) * width, index * width, (index + 1) * width
        ],[0, 1, 0])
        const translate = interpolate(translateX.value,[
            (index - 1) * width, index * width, (index + 1) * width
        ],[height / 2, 0, -height/2])
        return {
            opacity,
            transform:[{translateY:translate}]
        }
    })

    return (
        <View style={[styles.container, {backgroundColor: `rgba(0,0,256,0.${index + 2})`}]}>
            <Animated.View style={[styles.circle, rStyle]} key={index}>
                <Animated.Text style={[styles.text,textS]}>
                    {item}
                </Animated.Text>
            </Animated.View>
        </View>

    )
};

export default Item;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color:'#fff',
        textAlign:'center',
        fontSize:40
    }


})
