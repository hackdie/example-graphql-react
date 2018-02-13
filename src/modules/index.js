
import React, { PureComponent } from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Favorites from './favorites'
import Search from './search'
import Details from './details'
import About from './about'


const TabNav = TabNavigator(
  {
    Search: {
      screen: Search,
    },
    Favorites: {
      screen: Favorites,
    },
    About: {
      screen: About,
    },
  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'white',
        rippleColor: 'white',
        tabs: {
          Search: {
            barBackgroundColor: '#5A90DC',
          },
          Favorites: {
            barBackgroundColor: '#00796B',
          },
          About: {
            barBackgroundColor: '#37474F',
          },
        },
      },
    },
  }
)

export default StackNavigator(
  {
    Index: { screen: TabNav },
    Details: { screen: Details },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
)
