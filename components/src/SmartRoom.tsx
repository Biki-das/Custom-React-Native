import * as React from 'react';
import {Switch, Image, View, Text, Dimensions, StyleSheet} from 'react-native';

import {AnimatePresence, View as MView, Text as MText} from 'moti';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
const {width, height} = Dimensions.get('screen');

const ICON_SIZE = 42;
const colors = {
  active: '#FF4C1E',
  bg: '#F7F8FC',
};

const data = [
  {
    activeColor: '#FF4C1E',
    iconOn: 'lightbulb-outline',
    iconOff: 'lightbulb-off-outline',
    type: `Smart\nSpotlight`,
  },
  {
    activeColor: '#000',
    iconOn: 'volume-high',
    iconOff: 'volume-off',
    type: 'Smart\nSound',
  },
  {
    activeColor: '#228B22',
    iconOn: 'invert-colors',
    iconOff: 'invert-colors-off',
    type: 'Smart\nHumidifier',
  },
  {
    activeColor: '#BD97CB',
    iconOn: 'fan',
    iconOff: 'fan-off',
    type: 'Smart\nHumidifier',
  },
];

const ITEM_WIDTH = width * 0.38;
const ITEM_HEIGHT = ITEM_WIDTH * 1.67;
const SPACING = 20;

export function SmartRoom() {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: colors.bg}}>
      <StatusBar hidden />
      <Image
        style={[StyleSheet.absoluteFillObject, {opacity: 0.3}]}
        blurRadius={100}
        source={{
          uri: 'https://static-cse.canva.com/image/7209/Rose-Quartz_16.b7443828.png',
        }}
      />
      <View
        style={{
          padding: SPACING,
          paddingHorizontal: SPACING / 2,
          backgroundColor: 'white',
          margin: SPACING,
          borderRadius: 30,
        }}>
        <View style={{padding: SPACING}}>
          <Text style={{opacity: 0.8, fontSize: 18}}>A total of 4 devices</Text>
          <Text style={{fontSize: 26, fontWeight: '700'}}>Living Room</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}>
          {data.map(item => {
            return <RoomComponent key={item.activeColor} {...item} />;
          })}
          {data % 2 !== 0 && <View style={{width: ITEM_WIDTH}} />}
        </View>
      </View>
    </View>
  );
}
function RoomComponent({type, activeColor, iconOn, iconOff}) {
  const [isEnabled, setIsEnabled] = React.useState(false);
  return (
    <MView
      from={{backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.1)'}}
      animate={{
        backgroundColor: isEnabled ? activeColor : '#fff',
        borderColor: isEnabled ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0.1)',
      }}
      transition={{
        type: 'timing',
      }}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        padding: SPACING,
        marginBottom: SPACING / 2,
        borderRadius: 16,
        borderWidth: 1,
      }}>
      <View style={{width: ICON_SIZE, height: ICON_SIZE, marginBottom: 10}}>
        <AnimatePresence>
          {!isEnabled ? (
            <MView
              key={'off'}
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              style={{position: 'absolute'}}>
              <MaterialCommunityIcons
                name={iconOff}
                size={ICON_SIZE}
                color="black"
              />
            </MView>
          ) : (
            <MView
              key={'on'}
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              style={{position: 'absolute'}}>
              <MaterialCommunityIcons
                name={iconOn}
                size={ICON_SIZE}
                color="white"
              />
            </MView>
          )}
        </AnimatePresence>
      </View>
      <MText
        style={{
          fontWeight: '700',
          fontSize: 16,
          lineHeight: 18,
        }}
        from={{color: '#000'}}
        animate={{
          color: isEnabled ? '#fff' : '#000',
        }}
        transition={{
          type: 'timing',
        }}>
        {type}
      </MText>
      <Switch
        style={{
          transform: [{scale: 0.8}],
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
        trackColor={{true: 'rgba(255,255,255,0.3)', false: '#09c'}}
        thumbColor={'#fff'}
        ios_backgroundColor={!isEnabled ? '#000' : 'transparent'}
        onValueChange={() => setIsEnabled(isEnabled => !isEnabled)}
        value={isEnabled}
      />
    </MView>
  );
}
