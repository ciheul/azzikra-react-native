/* References
 *
 * Keyboard
 * https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580
 *
 * Redux
 * http://rants.broonix.ca/getting-started-with-react-native-and-redux/
 * https://medium.com/@aaronvb/a-simple-react-native-redux-example-b8e22a6e93d0
 * https://medium.com/@bosung90/how-to-structure-your-react-native-application-using-redux-aec1677b76ca
*/

import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux';


import HomeScreen from './app/components/Core/HomeScreen';

import LoginScreen from './app/components/Authentication/LoginScreen';
import SignUpScreen from './app/components/Authentication/SignUpScreen';
import ForgottenPasswordScreen from './app/components/Authentication/ForgottenPasswordScreen';

import GoldScreen from './app/components/Gold/GoldScreen';
import TopUpScreen from './app/components/Gold/TopUpScreen';
import TopUpConfirmationScreen from './app/components/Gold/TopUpConfirmationScreen';
import TopUpStatusScreen from './app/components/Gold/TopUpStatusScreen';
import MoneyWithdrawScreen from './app/components/Gold/MoneyWithdrawScreen';
import GoldWithdrawScreen from './app/components/Gold/GoldWithdrawScreen';

import PlnScreen from './app/components/PaymentPoint/PlnScreen';
import PulsaScreen from './app/components/PaymentPoint/PulsaScreen';


export var globalState = {
  gold: 257.12,
  pricePerGoldGram: 622553,
  priceUpdatedAt: new Date(),
};


function counter(state = {currentGold: 0, pricePerGoldGram: 0}, action) {
  switch (action.type) {
    case 'TOP_UP':
      return Object.assign({}, state, {
        'currentGold': state.currentGold + action.newGold      
      });
    case 'UPDATE_PRICE':
      return Object.assign({}, state, {
        'pricePerGoldGram': action.newPrice      
      });
    default:
      return state;
  }
}


export let store = createStore(counter);


const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signUpScreen: { screen: SignUpScreen },
  forgottenPasswordScreen: {
    screen: ForgottenPasswordScreen,
    navigationOptions: { title: 'Forgot Password' }
  }
}, {
  // remove header from Login/Sign Up/Forgotten Password
  headerMode: 'none'
});


const MainStack = StackNavigator({
  homeScreen: {
    screen: HomeScreen,
    navigationOptions: { headerTitle: 'AZZIKRA DIGITAL' }
  },
  
  // GOLD STACK
  goldScreen: {
    screen: GoldScreen,
    navigationOptions: { headerTitle: 'EMAS' }
  },
  topUpScreen: {
    screen: TopUpScreen,
    navigationOptions: { headerTitle: 'TOP UP' }
  },
  topUpConfirmationScreen: {
    screen: TopUpConfirmationScreen,
    navigationOptions: { headerTitle: 'TOP UP CONFIRMATION' }
  },
  topUpStatusScreen: {
    screen: TopUpStatusScreen,
    navigationOptions: { headerTitle: 'TOP UP STATUS' }
  },
  moneyWithdrawScreen: {
    screen: MoneyWithdrawScreen,
    navigationOptions: { headerTitle: 'Tarik Uang' }
  },
  goldWithdrawScreen: {
    screen: GoldWithdrawScreen,
    navigationOptions: { headerTitle: 'Tarik Emas' }
  },
  
  // PAYMENT POINT STACK
  pulsaScreen: {
    screen: PulsaScreen,
    navigationOptions: { headerTitle: 'PULSA' }
  },
  plnScreen: {
    screen: PlnScreen,
    navigationOptions: { headerTitle: 'PLN' }
  }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      elevation: 0,
      backgroundColor: 'darkorange',
      marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,      
    },
    headerTitleStyle: { alignSelf: 'center' },
    headerTintColor: 'white',
  })
});


const App = StackNavigator({
  loginStack: { screen: LoginStack },
  mainStack: { screen: MainStack },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
});


export default App;