import React from 'react'
import styled from 'styled-components/native'
import {
    View, Text, Animated, Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = getStatusBarHeight();

const DEF_VALUE_AVATAR = (20 / 100 * WINDOW_HEIGHT);
const DEF_VALUE_BACKGROUND = (40 / 100 * WINDOW_HEIGHT);

const Hero = ({
    id,
    color,
    title,
    name,
    description,
    image,
    scrollX
}) => {

    const backgroundAnim = new Animated.Value(DEF_VALUE_BACKGROUND);
    const avatarAnim = new Animated.Value(DEF_VALUE_AVATAR);
    const knowMoreAnim = new Animated.Value(1);
    const foregroundAnim = new Animated.Value(WINDOW_HEIGHT - 300);
    const background2Anim = new Animated.Value(WINDOW_HEIGHT);
    const titleAnim = new Animated.Value(0);
    const detailAnim = new Animated.Value(WINDOW_HEIGHT);

    const onKnowMorePress = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(backgroundAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(knowMoreAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.spring(avatarAnim, {
                    toValue: STATUSBAR_HEIGHT,
                    bounciness: 8,
                    useNativeDriver: true
                }),
                Animated.spring(foregroundAnim, {
                    toValue: WINDOW_HEIGHT - 500,
                    bounciness: 8,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(background2Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(titleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false
                }),
                Animated.timing(detailAnim, {
                    toValue: WINDOW_HEIGHT - 220,
                    duration: 300,
                    useNativeDriver: true
                })
            ])
        ]).start();
    }

    const onBackPress = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(background2Anim, {
                    toValue: WINDOW_HEIGHT,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(titleAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }),
                Animated.timing(detailAnim, {
                    toValue: WINDOW_HEIGHT,
                    duration: 300,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.spring(avatarAnim, {
                    toValue: DEF_VALUE_AVATAR,
                    bounciness: 8,
                    useNativeDriver: true
                }),
                Animated.spring(foregroundAnim, {
                    toValue: WINDOW_HEIGHT - 300,
                    bounciness: 8,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(backgroundAnim, {
                    toValue: DEF_VALUE_BACKGROUND,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(knowMoreAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                })
            ])
        ]).start();
    }

    const titleColor = titleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FFFFFF', '#000000']
    })

    return (
        <Container style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}>
            <AnimatedBackground style={{
                backgroundColor: color,
                transform: [{ translateY: backgroundAnim }]
            }} />
            <AnimatedBackground2 style={{
                transform: [{ translateY: background2Anim }]
            }} />
            <AnimatedAvatar
                source={image}
                style={{
                    width: WINDOW_WIDTH,
                    height: WINDOW_WIDTH,
                    transform: [{ translateY: avatarAnim }, {
                        scale: scrollX
                            ? scrollX.interpolate({
                                inputRange: [-WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 2],
                                outputRange: [0.1, 1, 0.1],
                                extrapolate: "clamp"
                            })
                            : 0
                    }]
                }}
            />
            <AnimatedForeground style={{
                transform: [{ translateY: foregroundAnim }],
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
                    transform: [{ translateX: knowMoreAnim }],
                }}>
                    <AnimatedKnowMoreLabel style={{
                        opacity: knowMoreAnim
                    }}>Know More</AnimatedKnowMoreLabel>
                </AnimatedKnowMore>
            </AnimatedForeground>
            <AnimatedDetail style={{
                width: WINDOW_WIDTH,
                transform: [{ translateY: detailAnim }]
            }}>
                <Description>
                    {description}
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
    padding: 32px 48px;
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
    font-size: 32px;
    font-weight: bold;
    text-transform: lowercase;
    color: #ffffff;
    padding-top: 8px;
    padding-bottom: 8px;
`

const AnimatedName = Animated.createAnimatedComponent(Name);

const KnowMore = styled.TouchableOpacity`
    
`

const AnimatedKnowMore = Animated.createAnimatedComponent(KnowMore);

const KnowMoreLabel = styled.Text`
    font-size: 24px;
    color: yellow;
    text-transform: lowercase;    
    padding-bottom: 8px;
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
