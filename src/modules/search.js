import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native'
import Touchable from 'react-native-platform-touchable'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


import SearchRow from '../components/rowSearch'
import EmptySearch from '../components/emptySearch'


const keyExtractor = ({ node }) => `item_${node.id}`

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    width: width - 80,
    alignSelf: 'flex-end',
    height: 1,
    backgroundColor: '#ddd',
  },
  searchContainer: {
    paddingTop: 20,
    backgroundColor: '#5A90DC',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtSearch: {
    height: 42,
    backgroundColor: '#f3f3f3',
    margin: 10,
    padding: 5,
    flex: 1,
  },
  btnSearch: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    backgroundColor: '#666',
    borderRadius: 20,
  },
})


class Search extends PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Newsstand',
    tabBarIcon: () => <Icon size={24} color="white" name="github-circle" />,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: 'React-native-',
    }
  }

  componentDidMount = () => { }

  componentWillReceiveProps = nextProps => {
    // this.setState({ query: nextProps.search.query })
  }

  onItemPressed = item => {
    this.props.navigation.navigate('Details', { ...item })
  }

  onNewSearch = () => {
    Keyboard.dismiss()
    if (this.state.query.trim() === '') return
    // this.props.newSearch(this.state.query)
    this.props.data.refetch({ queryRepo: this.state.query })
  }

  renderItem = ({ item: { node } }) => {
    return (
      <Touchable onPress={() => this.onItemPressed(node)}>
        <SearchRow {...node} />
      </Touchable>
    )
  }

  // TODO maybe put it in a diff component to use RX
  renderSearch = () => (
    <View style={styles.searchContainer}>
      <TextInput
        value={this.state.query}
        placeholder="My Awesome Repo"
        style={styles.txtSearch}
        onSubmitEditing={this.onNewSearch}
        onChangeText={query => {
          this.setState({ query })
        }}
      />
      <Touchable style={styles.btnSearch} onPress={this.onNewSearch}>
        <Icon size={24} color="white" name="magnify" />
      </Touchable>
    </View>
  )

  render = () => {


    console.log(this.props)


    if (this.props.data.error || this.props.data.loading) {
      return <View />
    }


    return (
      <View style={styles.container}>
        {this.renderSearch()}
        <FlatList
          style={{ flex: 1 }}
          refreshing={this.props.data.loading}
          onRefresh={this.onNewSearch}
          removeClippedSubviews
          renderItem={this.renderItem}
          extraData={this.props.data.search.edges}
          data={this.props.data.search.edges}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<EmptySearch query={this.state.query} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
}


const fragment = `
... on Repository {
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
}`

const query = gql`
query SearchRepos($queryRepo: String!){
  search(query: $queryRepo, type: REPOSITORY, first:15){
    repositoryCount
    edges{
      node {
        ${fragment}
      }
    }
  }
}
`

export default graphql(query, {
  options: {
    variables: {
      queryRepo: 'React-native-'
    }
  }
})(Search);
