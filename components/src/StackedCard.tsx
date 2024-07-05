import Constants from 'expo-constants';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const {width} = Dimensions.get('window');

import {Entypo} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  FadeIn,
  FadeInRight,
  FadeOut,
  FadeOutRight,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const data = [
  {
    id: '0fa08fa5-6d45-4d56-86e0-8fd56632dfd4',
    role: 'Subcontractor',
    type: 'Excavator',
    from: '10:52 AM',
    to: '9:40 PM',
    duration: 2,
    distance: 19.7,
  },
  {
    id: 'f8f798bb-c7bd-4080-9bc6-aa4cabfab482',
    role: 'Surveyor',
    type: 'Crawler',
    from: '11:45 AM',
    to: '4:08 PM',
    duration: 0,
    distance: 55.2,
  },
  {
    id: '068de8c4-1b87-4051-9885-ee28a48cd274',
    role: 'Surveyor',
    type: 'Scraper',
    from: '9:04 AM',
    to: '9:17 PM',
    duration: 5,
    distance: 1.9,
  },
  {
    id: '269b6feb-7768-41d2-b030-2be94082a974',
    role: 'Construction Expeditor',
    type: 'Dragline',
    from: '11:23 AM',
    to: '7:58 PM',
    duration: 5,
    distance: 38.4,
  },
  {
    id: 'c6ba0009-6a6f-45b0-98cd-730c9c0fd9b0',
    role: 'Surveyor',
    type: 'Dragline',
    from: '11:25 AM',
    to: '8:11 PM',
    duration: 3,
    distance: 33.4,
  },
  {
    id: 'ab915f69-ce68-411b-abee-1f5d984af4e2',
    role: 'Engineer',
    type: 'Compactor',
    from: '10:22 AM',
    to: '5:37 PM',
    duration: 4,
    distance: 46.4,
  },
  {
    id: '34d383d9-0f41-4c5c-b7fc-9d644b56956c',
    role: 'Construction Worker',
    type: 'Bulldozer',
    from: '10:50 AM',
    to: '4:10 PM',
    duration: 4,
    distance: 82.2,
  },
  {
    id: '23ccaf32-7a0b-4652-84e2-5941770006ea',
    role: 'Architect',
    type: 'Dragline',
    from: '9:34 AM',
    to: '2:42 PM',
    duration: 3,
    distance: 60.9,
  },
  {
    id: 'a2c6ba5a-5ead-4a8c-8170-7fbcf7cc74e7',
    role: 'Estimator',
    type: 'Grader',
    from: '9:17 AM',
    to: '6:57 PM',
    duration: 4,
    distance: 41.0,
  },
  {
    id: '0374d4ca-6db9-4f96-b6b0-48d5365640c6',
    role: 'Electrician',
    type: 'Excavator',
    from: '11:37 AM',
    to: '8:09 PM',
    duration: 1,
    distance: 87.5,
  },
  {
    id: '9c01c773-47b9-47a3-af6d-63f7050d334b',
    role: 'Supervisor',
    type: 'Dump Truck',
    from: '1:00 PM',
    to: '8:57 PM',
    duration: 4,
    distance: 61.0,
  },
  {
    id: 'b48e2d3f-9036-4b30-bde4-11822bcf3b7d',
    role: 'Electrician',
    type: 'Skid-Steer',
    from: '12:31 PM',
    to: '3:31 PM',
    duration: 0,
    distance: 13.6,
  },
  {
    id: '3ae4a618-0992-42da-bf1e-2bd654966705',
    role: 'Supervisor',
    type: 'Dragline',
    from: '8:49 AM',
    to: '6:33 PM',
    duration: 5,
    distance: 19.5,
  },
  {
    id: '77ffe17d-d8e1-463d-a52b-614a5a86bdc9',
    role: 'Construction Worker',
    type: 'Skid-Steer',
    from: '11:47 AM',
    to: '2:34 PM',
    duration: 3,
    distance: 73.0,
  },
  {
    id: '65eabab9-ae70-43cd-82e1-defb4ba90661',
    role: 'Construction Expeditor',
    type: 'Skid-Steer',
    from: '8:08 AM',
    to: '6:15 PM',
    duration: 0,
    distance: 97.5,
  },
  {
    id: '583b0a0b-525e-4913-9c1d-a723efc729c1',
    role: 'Engineer',
    type: 'Backhoe',
    from: '12:52 PM',
    to: '8:22 PM',
    duration: 3,
    distance: 97.6,
  },
  {
    id: '04fc95ec-dc61-4cdb-9a10-d7fd7c051e82',
    role: 'Electrician',
    type: 'Dragline',
    from: '8:16 AM',
    to: '2:22 PM',
    duration: 3,
    distance: 29.0,
  },
  {
    id: '3911163d-4f64-436a-96ff-8014e5c9947f',
    role: 'Electrician',
    type: 'Dump Truck',
    from: '10:57 AM',
    to: '4:53 PM',
    duration: 5,
    distance: 67.4,
  },
  {
    id: '4112aae1-eb2d-47fb-8c16-fd4849c31ec1',
    role: 'Estimator',
    type: 'Excavator',
    from: '12:15 PM',
    to: '4:14 PM',
    duration: 4,
    distance: 16.0,
  },
  {
    id: '03f15446-7567-445a-aaca-bc5d9459b93a',
    role: 'Construction Expeditor',
    type: 'Trencher',
    from: '8:16 AM',
    to: '6:00 PM',
    duration: 3,
    distance: 22.9,
  },
];

export const locationImage =
  'https://miro.medium.com/v2/resize:fit:1200/1*ybR6fbfwo6XTmWvTjXSOAA.png';

export type DataItem = (typeof data)[0];
export default data;

const duration = 300;
const _size = width * 0.9;
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};
const colors = {
  primary: '#6667AB',
  light: '#fff',
  dark: '#111',
};

// Define how many items you'd like to make visible
const maxVisibleItems = 6;

type CardProps = {
  totalLength: number;
  activeIndex: SharedValue<number>;
  index: number;
  info: DataItem;
};

function Card({info, index, totalLength, activeIndex}: CardProps) {
  const stylez = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: totalLength - index,
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [1 - 1 / maxVisibleItems, 1, 1],
      ),
      transform: [
        {
          translateY: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [-layout.cardsGap, 0, layout.height - layout.cardsGap * 2],
            {
              // If you'd like to stack the bottom cards on top of eachother
              // add CLAMP instead of EXTEND.
              // extrapolateRight: Extrapolate.CLAMP,
              extrapolateRight: Extrapolate.EXTEND,
            },
          ),
        },
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.95, 1, 1],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.card, stylez]}>
      <Text
        style={[
          styles.title,
          {
            position: 'absolute',
            top: -layout.spacing,
            right: layout.spacing,
            fontSize: 102,
            color: colors.primary,
            opacity: 0.05,
          },
        ]}>
        {index}
      </Text>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{info.type}</Text>
        <View style={styles.row}>
          <Entypo name="clock" size={16} style={styles.icon} />
          <Text style={styles.subtitle}>
            {info.from} - {info.to}
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="location" size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.distance} km</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="suitcase" size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.role}</Text>
        </View>
      </View>
      <Image source={{uri: locationImage}} style={styles.locationImage} />
    </Animated.View>
  );
}

// Menu component + data
const menu = ['Home', 'About', 'Contact', 'Settings', 'Logout'];
type MenuProps = {
  menu: typeof menu;
  activeMenuIndex?: number;
  onClose: () => void;
  onMenuPress: (index: number) => void;
  isMenuVisible: boolean;
};

function Menu({
  menu,
  activeMenuIndex = 0,
  onClose,
  onMenuPress,
  isMenuVisible,
}: MenuProps) {
  // We use LayoutAnimations to toggle mount/unmount
  if (!isMenuVisible) {
    return null;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.delay(500)}
      style={[StyleSheet.absoluteFillObject, {zIndex: 9999999}]}
      pointerEvents={'box-none'}>
      <Pressable onPress={onClose} style={StyleSheet.absoluteFillObject}>
        <View style={{backgroundColor: colors.dark, opacity: 0.45, flex: 1}} />
      </Pressable>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: layout.cardsGap * 2,
          gap: layout.spacing,
        }}
        pointerEvents="box-none">
        {menu.map((item, index) => {
          return (
            <Pressable onPress={() => onMenuPress(index)} key={index}>
              <Animated.Text
                entering={FadeInRight.delay(50 * index)}
                exiting={FadeOutRight.delay((menu.length - index) * 50)}
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: colors.light,
                }}>
                {index === activeMenuIndex ? '👉 ' : ''}
                {item}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

export function StackedCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const floatActiveIndex = useSharedValue(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (floatActiveIndex.value <= 0) {
        floatActiveIndex.value = 0;
        return;
      }
      floatActiveIndex.value = withTiming(floatActiveIndex.value - 1, {
        duration,
      });
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (floatActiveIndex.value === data.length) {
        return;
      }

      floatActiveIndex.value = withTiming(floatActiveIndex.value + 1, {
        duration,
      });
    });
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      'worklet';
      runOnJS(setIsMenuVisible)(false);
    });
  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      'worklet';
      runOnJS(setIsMenuVisible)(true);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      <Menu
        menu={menu}
        activeMenuIndex={activeIndex}
        onMenuPress={index => {
          setActiveIndex(index);
          setIsMenuVisible(false);
        }}
        onClose={() => setIsMenuVisible(false)}
        isMenuVisible={isMenuVisible}
      />
      <GestureDetector
        // We use Exclusive to prevent using different gestures at the same time
        // There's only one gesture that can be performed. This is by design.
        // If you would like to support multiple gestures, you can use `Simultaneous`
        gesture={Gesture.Exclusive(flingUp, flingDown, flingRight, flingLeft)}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: layout.cardsGap * 2,
          }}
          pointerEvents="box-none">
          {data.map((c, index) => {
            return (
              <Card
                info={c}
                key={c.id}
                index={index}
                totalLength={data.length - 1}
                activeIndex={floatActiveIndex}
              />
            );
          })}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    padding: layout.spacing,
  },
  card: {
    borderRadius: layout.borderRadius,
    width: layout.width,
    height: layout.height,
    padding: layout.spacing,
    backgroundColor: colors.light,
  },
  title: {fontSize: 32, fontWeight: '600'},
  subtitle: {},
  cardContent: {
    gap: layout.spacing,
    marginBottom: layout.spacing,
  },
  locationImage: {
    flex: 1,
    borderRadius: layout.borderRadius - layout.spacing / 2,
  },
  row: {
    flexDirection: 'row',
    columnGap: layout.spacing / 2,
    alignItems: 'center',
  },
  icon: {},
});
