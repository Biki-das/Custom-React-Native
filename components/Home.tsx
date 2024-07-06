import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StickyTabScroll} from './src/StickyTabsScroll';
import {Streak} from './src/Streak';
import {BehanceLogin} from './src/BehanceLogin';
import {CustomBottomSheet} from './src/CustomBottomSheet';
import {Waze} from './src/Waze';
import {TickerComponent} from './src/Ticker';
import {Bank} from './src/Bank';
import {Beat} from './src/Beat';
import {Spending} from './src/Spending';
import {ColorfulCard} from './src/Card';
import {InstagramStory} from './src/Story';
import {BankingSlider} from './src/BankSlider';
import {StackedCard} from './src/StackedCard';
import {MenuTransition} from './src/Menu';
import {CustomCarousel} from './src/CustomCarousel';
import {CustomSectionList} from './src/SectionList';
import {SmartRoom} from './src/SmartRoom';
import {Theme} from './src/Theme';
import {Todo} from './src/Todo';
import React from 'react';

function ComponentItem({children}: {children: React.ReactNode}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 12,
    width: '90%',
    alignSelf: 'center',
    borderColor: 'gray',
    marginTop: 10,
    height: 50,
  },
});

type RootStackParamList = {
  Bank: React.ReactNode;
  BankingSlider: React.ReactNode;
  Beat: React.ReactNode;
  BehanceLogin: React.ReactNode;
  ColorfulCard: React.ReactNode;
  CustomBottomSheet: React.ReactNode;
  CustomCarousel: React.ReactNode;
  CustomSectionList: React.ReactNode;
  InstagramStory: React.ReactNode;
  MenuTransition: React.ReactNode;
  SmartRoom: React.ReactNode;
  Spending: React.ReactNode;
  StackedCard: React.ReactNode;
  StickyTabScroll: React.ReactNode;
  Streak: React.ReactNode;
  Todo: React.ReactNode;
  Ticker: React.ReactNode;
  Theme: React.ReactNode;
  Waze: React.ReactNode;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const screens = [
    {name: 'Bank', component: Bank},
    {name: 'BankingSlider', component: BankingSlider},
    {name: 'Beat', component: Beat},
    {name: 'BehanceLogin', component: BehanceLogin},
    {name: 'ColorfulCard', component: ColorfulCard},
    {name: 'CustomBottomSheet', component: CustomBottomSheet},
    {name: 'CustomCarousel', component: CustomCarousel},
    {name: 'CustomSectionList', component: CustomSectionList},
    {name: 'InstagramStory', component: InstagramStory},
    {name: 'MenuTransition', component: MenuTransition},
    {name: 'SmartRoom', component: SmartRoom},
    {name: 'Spending', component: Spending},
    {name: 'StackedCard', component: StackedCard},
    {name: 'StickyTabScroll', component: StickyTabScroll},
    {name: 'Streak', component: Streak},
    {name: 'Todo', component: Todo},
    {name: 'Ticker', component: TickerComponent},
    {name: 'Theme', component: Theme},
    {name: 'Waze', component: Waze},
  ];

  return (
    <View>
      <FlatList
        data={screens}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <ComponentItem>
            <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
              <Text style={{fontSize: 18}}>{item.name}</Text>
            </TouchableOpacity>
          </ComponentItem>
        )}
      />
    </View>
  );
}
