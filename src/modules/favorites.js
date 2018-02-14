import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Dimensions,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Touchable from 'react-native-platform-touchable'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


import FavoriteCard from '../components/favoritCard'

const { width, height } = Dimensions.get('screen')
const keyExtractor = (node) => `item_${node.id}`

const noRepos = require('../../assets/icons/icNoInformation.png')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.75,
  },
  lblTextSearching: {
    color: '#666',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  }
})

class Favorites extends PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Favorites',
    tabBarIcon: () => <Icon size={24} color="white" name="heart" />,
  }

  state = {}

  seeDetails = item => {
    console.log(item)
    this.props.navigation.navigate('Details', { ...item })
  }

  renderItem = ({ item }) => (
    <Touchable style={{ flex: 1 }} onPress={() => this.seeDetails(item)}>
      <FavoriteCard {...item} />
    </Touchable>
  )

  renderNoItems = () => (
    <View style={styles.containerEmpty}>
      <Image source={noRepos} />
      <Text style={styles.lblTextSearching}>
        No Cool repos saved Try
        <Text style={{ fontWeight: 'bold' }}> sarching </Text>
        for some
      </Text>
    </View>
  )

  render() {
    if (this.props.favorites.error || this.props.favorites.loading) {
      return <View />
    }

    console.log(this.props.favorites)

    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1, marginTop: 22 }}
          removeClippedSubviews
          numColumns={2}
          ListEmptyComponent={this.renderNoItems}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
          extraData={this.props.favorites.favorites}
          data={this.props.favorites.favorites}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
}

const query = gql`
  query {
    favorites @client {
      owner{
        avatarUrl
        login
        url
      }
      stargazers(last: 3){
        totalCount
        edges {
          node {
            avatarUrl
          }
        }
      }
      forks{
        totalCount
      }
      watchers {
        totalCount
      }
      createdAt
      description
      name
      id
    }
  }
`

export default graphql(query,
  { name: 'favorites' }
)(Favorites)
