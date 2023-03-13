import {StyleSheet} from 'react-native';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated'
import Item from "./src/item";


const WORDS = ['hey jude','dont be afraid','take a song','and make','it better','remember!']

function App(): JSX.Element {
    const scale = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scale.value = event.contentOffset.x
    })

    return (
        <Animated.ScrollView horizontal style={styles.container} scrollEventThrottle={16} onScroll={scrollHandler}>
            {WORDS.map((item,index) => {
                return (
                    <Item item = {item} index = {index} key = {index} translateX = {scale}/>
                )
            })}
        </Animated.ScrollView>

    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
})

