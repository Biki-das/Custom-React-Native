import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StickyTabScroll} from './components/src/StickyTabsScroll';
import {Streak} from './components/src/Streak';
import {BehanceLogin} from './components/src/BehanceLogin';
import {CustomBottomSheet} from './components/src/CustomBottomSheet';
import {Waze} from './components/src/Waze';
import {TickerComponent} from './components/src/Ticker';
import {Bank} from './components/src/Bank';
import {Beat} from './components/src/Beat';
import {Spending} from './components/src/Spending';
import {ColorfulCard} from './components/src/Card';
import {InstagramStory} from './components/src/Story';
import {BankingSlider} from './components/src/BankSlider';
import {StackedCard} from './components/src/StackedCard';
import {MenuTransition} from './components/src/Menu';
import {CustomCarousel} from './components/src/CustomCarousel';
import {CustomSectionList} from './components/src/SectionList';
import {SmartRoom} from './components/src/SmartRoom';
import {Theme} from './components/src/Theme';
import {Todo} from './components/src/Todo';
import {HomeScreen} from './components/Home';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Components'}}
        />
        <Stack.Screen name="StickyTabScroll" component={StickyTabScroll} />
        <Stack.Screen name="Streak" component={Streak} />
        <Stack.Screen name="BehanceLogin" component={BehanceLogin} />
        <Stack.Screen name="CustomBottomSheet" component={CustomBottomSheet} />
        <Stack.Screen name="Waze" component={Waze} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Ticker" component={TickerComponent} />
        <Stack.Screen name="Theme" component={Theme} />
        <Stack.Screen name="Bank" component={Bank} />
        <Stack.Screen name="Beat" component={Beat} />
        <Stack.Screen name="Spending" component={Spending} />
        <Stack.Screen name="ColorfulCard" component={ColorfulCard} />
        <Stack.Screen name="InstagramStory" component={InstagramStory} />
        <Stack.Screen name="BankingSlider" component={BankingSlider} />
        <Stack.Screen name="StackedCard" component={StackedCard} />
        <Stack.Screen name="MenuTransition" component={MenuTransition} />
        <Stack.Screen name="CustomCarousel" component={CustomCarousel} />
        <Stack.Screen name="CustomSectionList" component={CustomSectionList} />
        <Stack.Screen name="SmartRoom" component={SmartRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
