import {Dimensions, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Svg, {Circle} from "react-native-svg";
import Animated, {useAnimatedProps, useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";


const {width, height} = Dimensions.get('window')
const CIRCLE_LENGTH = 1000
const r = CIRCLE_LENGTH / (2 * Math.PI)


const AnimatedCircle = Animated.createAnimatedComponent(Circle)

function App(): JSX.Element {


    const progress = useSharedValue(0)


    useEffect(() => {
       progress.value = withTiming(1,{duration:2000})
    },[])

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset:withTiming(CIRCLE_LENGTH * progress.value,{duration:2000})
    }))


    return (
        <View style={styles.container}>
            <Svg>
                <Circle
                    cx={width / 2}
                    cy={height / 2}
                    r={r}
                    stroke={'rgb(54,54,70)'}
                    strokeWidth={30}
                    fill={'rgb(34,34,44)'}
                />
                <AnimatedCircle
                    cx={width / 2}
                    cy={height / 2}
                    r={r - 1}
                    stroke={'#A6E1FA'}
                    strokeWidth={15}
                    fill={'inherit'}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps = {animatedProps}
                />
            </Svg>

            <TouchableOpacity style={styles.btn} onPress = {() => {
                progress.value = Math.random()
            }}>
                <Text style={styles.text}>
                    Progress
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(34,34,44)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'#b3eea2',
        position:'absolute',
        bottom:60,
        borderRadius:10
    },
    text:{
        fontSize:20,
        color:'rgb(34,34,44)'
    }
})

