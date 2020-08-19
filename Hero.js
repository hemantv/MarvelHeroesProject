import React from 'react'
import styled from 'styled-components/native'
import {
    View, Text, Animated, Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = getStatusBarHeight();

const Hero = ({
    id,
    color,
    title,
    name,
    image
}) => {

    const backgroundAnim = new Animated.Value(0);

    const animateBackground = (value, callback) => {
        Animated.timing(backgroundAnim, {
            toValue: value,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const background = backgroundAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0]
    })

    const avatarAnim = new Animated.Value(0);

    const animateAvatar = (value, callback) => {
        Animated.spring(avatarAnim, {
            toValue: value,
            bounciness: 8,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const avatar = avatarAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [200, STATUSBAR_HEIGHT]
    })

    const knowMoreAnim = new Animated.Value(0);

    const animateKnowMore = (value, callback) => {
        Animated.timing(knowMoreAnim, {
            toValue: value,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const knowMoreOpacity = knowMoreAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    const foregroundAnim = new Animated.Value(0);

    const animateForeground = (value, callback) => {
        Animated.spring(foregroundAnim, {
            toValue: value,
            bounciness: 8,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const foreground = foregroundAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 160]
    })

    const background2Anim = new Animated.Value(0);

    const animateBackground2 = (value, callback) => {
        Animated.timing(background2Anim, {
            toValue: value,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const background2 = background2Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_HEIGHT, 0]
    })

    const titleAnim = new Animated.Value(0);

    const animateTitle = (value, callback) => {
        Animated.timing(titleAnim, {
            toValue: value,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const titleColor = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ffffff', '#000000']
    })

    const detailAnim = new Animated.Value(0);

    const animateDetail = (value, callback) => {
        Animated.timing(detailAnim, {
            toValue: value,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            if (callback) {
                callback();
            }
        });
    }

    const detail = detailAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [WINDOW_HEIGHT, WINDOW_HEIGHT - 260]
    })

    const onKnowMorePress = () => {
        console.log('clicked');
        animateBackground(1);
        animateKnowMore(1, () => {
            animateAvatar(1);
            animateForeground(1, () => {
                animateBackground2(1);
                animateTitle(1);
                animateDetail(1);
            });
        });
    }

    const onBackPress = () => {
        animateBackground2(0);
        animateTitle(0);
        animateDetail(0, () => {
            animateAvatar(0);
            animateForeground(0, () => {
                animateBackground(0);
                animateKnowMore(0);
            });
        });
    }

    return (
        <Container style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}>
            <AnimatedBackground style={{
                backgroundColor: color,
                transform: [{ translateY: background }]
            }} />
            <AnimatedBackground2 style={{
                transform: [{ translateY: background2 }]
            }} />
            {/* <AnimatedAvatar
                source={image}
                style={{
                    width: WINDOW_WIDTH,
                    height: WINDOW_WIDTH,
                    transform: [{ translateY: avatar }]
                }}
            /> */}
            <AnimatedForeground style={{
                bottom: foreground
            }}>
                <AnimatedTitle style={{
                    color: titleColor
                }}>
                    {title.split(' ').join('\n')}
                </AnimatedTitle>
                <AnimatedName style={{
                    color: titleColor
                }}>
                    {name}
                </AnimatedName>
                <AnimatedKnowMore onPress={onKnowMorePress} style={{
                    left: knowMoreAnim
                }}>
                    <AnimatedKnowMoreLabel style={{
                        opacity: knowMoreOpacity
                    }}>Know More</AnimatedKnowMoreLabel>
                </AnimatedKnowMore>
            </AnimatedForeground>
            <AnimatedDetail style={{
                width: WINDOW_WIDTH,
                transform: [{ translateY: detail }]
            }}>
                <Description>
                    Toney Stark is a genius, billionaire, philanthropist and the former head of Stark Industries. Using his own great wealth and exceptional technical knowledge,

                    </Description>
                <Back onPress={onBackPress}>
                    <BackLabel style={{ color: color }}>Back</BackLabel>
                </Back>
            </AnimatedDetail>
        </Container>
    )
}

const Container = styled.View`        
    
`

const Background = styled.View`       
    width: 100%;   
    height: 100%; 
    bottom: 0;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
`

const AnimatedBackground = Animated.createAnimatedComponent(Background);

const Background2 = styled.View`   
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    background-color: #ffffff;    
`

const AnimatedBackground2 = Animated.createAnimatedComponent(Background2);

const Foreground = styled.View`
    position: absolute;
    padding: 48px 48px 48px 48px;
`

const AnimatedForeground = Animated.createAnimatedComponent(Foreground);

const Avatar = styled.Image`
    position: absolute;
`

const AnimatedAvatar = Animated.createAnimatedComponent(Avatar);

const Title = styled.Text`
    font-size: 60px;
    font-weight: bold;    
    text-transform: lowercase;
    color: #ffffff;
    line-height: 60px;
`

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Name = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-transform: lowercase;
    color: #ffffff;
    line-height: 40px;
`

const AnimatedName = Animated.createAnimatedComponent(Name);

const KnowMore = styled.TouchableOpacity`
    
`

const AnimatedKnowMore = Animated.createAnimatedComponent(KnowMore);

const KnowMoreLabel = styled.Text`
    font-size: 24px;
    color: yellow;
    text-transform: lowercase;
    line-height: 60px;
`

const AnimatedKnowMoreLabel = Animated.createAnimatedComponent(KnowMoreLabel);

const Detail = styled.View`    
    position: absolute;
    padding: 0px 48px;
`

const AnimatedDetail = Animated.createAnimatedComponent(Detail);

const Description = styled.Text`
    font-size: 18px;
    color: #888888;
    text-transform: lowercase;    
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #dddddd;
    padding: 16px 0px;
`

const Back = styled.TouchableOpacity``;

const BackLabel = styled.Text`
    font-size: 24px;    
    text-transform: lowercase;
    line-height: 60px;
`

export default Hero
