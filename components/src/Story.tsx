/*
Tap right => move to next post from story
Tap right => if is last item from the story, moves to next story
Tap left => move to prev post from story
Tap left => if is first post from story, moves to previous story
Slide right => next story
Slide left => Prev story
Timings:
- Image => 2 seconds
- Video => video duration
!Image and Videos are from Pexels.com!
*/

import * as React from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Easing,
} from 'react-native';
import {faker} from '@faker-js/faker';
import {StatusBar} from 'expo-status-bar';
import {Video} from 'expo-av';

const {width, height} = Dimensions.get('screen');

faker.seed(10);

const videos = [
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/5244402/5244402-uhd_1440_2560_25fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/8337330/8337330-hd_1080_1920_30fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/11856385/11856385-uhd_1440_2560_25fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/5010624/5010624-hd_1080_1920_30fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/4448895/4448895-hd_1080_1920_30fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/25915997/11920803_1920_1080_25fps.mp4',
  },
  {
    type: 'video',
    source:
      'https://videos.pexels.com/video-files/26792376/12007264_1080_1920_30fps.mp4',
  },
];

const images = [
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/2710131/pexels-photo-2710131.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/1237611/pexels-photo-1237611.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/4906249/pexels-photo-4906249.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/1964471/pexels-photo-1964471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/2234685/pexels-photo-2234685.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/3632869/pexels-photo-3632869.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/5380591/pexels-photo-5380591.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {
    type: 'image',
    source:
      'https://images.pexels.com/photos/2119560/pexels-photo-2119560.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

const slides = [...Array(10).keys()].map(() => {
  return {
    key: faker.datatype.uuid(),
    data: faker.helpers.arrayElements(
      faker.helpers.shuffle([...images, ...videos]),
      faker.datatype.number({min: 1, max: 5}),
    ),
  };
});

const StoryProgress = ({
  isLongPressed,
  done,
  activeIndex,
  index,
  onEnd,
  active,
  duration = 2000,
}) => {
  const progress = React.useRef(new Animated.Value(-width / 3)).current;
  const [progressWidth, setProgressWidth] = React.useState(null);
  const longPressElapsedDuration = React.useRef(0);

  const animation = durations =>
    Animated.timing(progress, {
      toValue: 0,
      duration: durations,
      easing: Easing.linear,
      useNativeDriver: true,
    });

  React.useEffect(() => {
    // we need to store the passed duration so when we
    // release the longpress is going to start the timing
    // from with the elapsed duration.
    const listener = progress.addListener(({value}) => {
      longPressElapsedDuration.current = Math.abs(
        (value * duration) / progressWidth,
      );
    });

    return () => {
      progress.removeListener(listener);
      progress.removeAllListeners();
    };
  });

  React.useEffect(() => {
    if (isLongPressed) {
      progress.stopAnimation();
    } else {
      if (active) {
        // start animation with elapsed duration
        animation(longPressElapsedDuration.current).start(status => {
          // in case of previous, we need to cancel the animation
          // or move to next when the animation has finished.
          if (status.finished) {
            onEnd(index + 1);
          }
        });
      }
    }
  }, [isLongPressed, progressWidth]);
  React.useEffect(() => {
    progress.setValue(-progressWidth);
    if (active) {
      progress.setValue(-progressWidth);
      animation(duration).start(status => {
        // in case of previous, we need to cancel the animation
        // or move to next when the animation has finished.
        if (status.finished) {
          onEnd(index + 1);
        }
      });
    }

    if (done) {
      progress.setValue(0);
      return;
    }
  }, [active, done]);

  React.useEffect(() => {
    progress.setValue(-progressWidth);
  }, [progressWidth]);

  return (
    <View
      key={index}
      style={{
        height: 4,
        flex: 1,
        overflow: 'hidden',
        marginRight: 8,
        backgroundColor: 'rgba(255,255,255,0.4)',
      }}>
      <Animated.View
        onLayout={e => setProgressWidth(e.nativeEvent.layout.width)}
        style={{
          height: 4,
          backgroundColor: 'white',
          transform: [
            {
              translateX: progress,
            },
          ],
        }}
      />
    </View>
  );
};

const Slide = ({
  isScrolling,
  item,
  index,
  active,
  onNextSlide,
  onPrevSlide,
}) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [duration, setDuration] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setActiveSlide(0);
  }, [active]);

  const goPrev = React.useCallback(
    newSlide => {
      if (newSlide < 0) {
        return onPrevSlide();
      }
      setLoading(true);
      setActiveSlide(newSlide);
    },
    [activeSlide],
  );

  const goNext = React.useCallback(
    newSlide => {
      if (newSlide > item.data.length - 1) {
        return onNextSlide();
      }
      setLoading(true);
      setActiveSlide(newSlide);
    },
    [activeSlide],
  );

  const [isLongPressed, setIsLongPressed] = React.useState(false);

  return (
    <View style={{width, height}}>
      <View style={[StyleSheet.absoluteFillObject]}>
        {item.data[activeSlide].type === 'video' ? (
          <Video
            onLoad={status => {
              setDuration(status.durationMillis);
              setLoading(false);
            }}
            source={{uri: item.data[activeSlide].source}}
            rate={1.0}
            volume={0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay={active && !isLongPressed && !isScrolling}
            isLooping={false}
            style={{flex: 1}}
          />
        ) : (
          <Image
            onLoad={() => {
              setLoading(false);
              setDuration(2000);
            }}
            source={{uri: item.data[activeSlide].source}}
            style={{flex: 1}}
          />
        )}
      </View>
      <View style={[StyleSheet.absoluteFillObject, {flexDirection: 'row'}]}>
        <TouchableWithoutFeedback
          delayLongPress={200}
          onPressOut={() => {
            setIsLongPressed(false);
          }}
          onLongPress={() => {
            setIsLongPressed(true);
          }}
          onPress={() => goPrev(activeSlide - 1)}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          delayLongPress={200}
          onPressOut={() => {
            setIsLongPressed(false);
          }}
          onLongPress={() => {
            setIsLongPressed(true);
          }}
          onPress={() => goNext(activeSlide + 1)}>
          <View style={{backgroundColor: 'transparent', flex: 1}} />
        </TouchableWithoutFeedback>
      </View>
      <View
        key={`story-progress-${index}`}
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          position: 'absolute',
          top: 50,
        }}>
        {item.data.map((_, i) => {
          return (
            <StoryProgress
              isLongPressed={isLongPressed || isScrolling}
              activeIndex={activeSlide}
              index={i}
              key={`story-progress-${index}-${i}`}
              done={activeSlide > i}
              active={activeSlide === i && !loading && active}
              duration={duration}
              onEnd={goNext}
            />
          );
        })}
      </View>
    </View>
  );
};

const perspective = width;
const angle = Math.atan(perspective / (width / 2));

export function InstagramStory() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(0);
  const ref = React.useRef();
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        data={slides}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        pagingEnabled
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
        onMomentumScrollEnd={ev => {
          setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 0.5) * width,
            index * width,
            (index + 0.5) * width,
          ];
          const rotateY = scrollX.interpolate({
            inputRange,
            outputRange: [`${angle / 2}rad`, '0rad', `-${angle / 2}rad`],
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          const translateX1 = scrollX.interpolate({
            inputRange,
            outputRange: [-width / 2, 0, width / 2],
            extrapolate: 'clamp',
          });
          const translateX2 = scrollX.interpolate({
            inputRange,
            outputRange: [width / 2, 0, -width / 2],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={{
                opacity,
                transform: [
                  {perspective: width * 4},
                  {translateX: translateX1},
                  {rotateY},
                  {translateX: translateX2},
                ],
              }}>
              <Slide
                item={item}
                index={index}
                active={index === activeIndex}
                onNextSlide={() => {
                  ref?.current?.scrollToOffset({
                    offset: (index + 1) * width,
                    animated: true,
                  });
                }}
                isScrolling={isScrolling}
                onPrevSlide={() => {
                  ref?.current?.scrollToOffset({
                    offset: (index - 1) * width,
                    animated: true,
                  });
                }}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
