import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import SearchScreen from './screens/SearchScreen'
import BookTransaction from './screens/BookTransaction'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'




export default class App extends React.Component {
render()
{
  return(
    <AppContainer/>
  )
}
  
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen:BookTransaction},
  Search: {screen:SearchScreen}
},

{defaultNavigationOptions: ({navigation}) => ({

  tabBarIcon: ({}) => {
    const routeName = navigation.state.routeName
    if(routeName === "Transaction")
    {
      return(
        <Image source = {require("./assets/book.png")} style={{width: 35 , height: 35}}/>
      )
    }
    else if(routeName === "Search")
    {
      return(
        <Image source = {require('./assets/searchingbook.png')} style={{width: 35 , height: 35}}/>
      )
    }
  }

})}
);


const AppContainer = createAppContainer(TabNavigator);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
