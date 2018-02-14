import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Dimensions, SectionList } from 'react-native'
import { find } from 'lodash'

import Toolbar from '../components/toolbar'
import DetailsHeader from '../components/detailsHeader'
import RowDetails from '../components/rowSectionDetails'


import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const { width } = Dimensions.get('screen')
const keyExtractor = (item, index) => `item_${item.id}_${index}`

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
  sectionHeader: {
    height: 40,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    padding: 20,
  },
  lblSectionHeader: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
})


class Details extends PureComponent {
  constructor(props) {
    super(props)

    const repo = props.navigation.state.params

    this.state = {
      repo,
      loading: true,
      issues: [],
      subscribers: [],
      favorite: false,
    }

    console.log(this.props)
  }
  componentDidMount = () => {
    // this.getExtraData()
  }

  componentWillReceiveProps = props => {
    const { repo } = this.state
    const favorite = find(props.favorites.favorites, fv => fv.id === repo.id)
    this.setState({ favorite: !!favorite })
  }

  saveRepo = () => {
    this.props.addFavorite({ variables: { repo: this.state.repo } })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  renderHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.lblSectionHeader}>{title}</Text>
    </View>
  )

  renderIssues = ({ item: { issue: { user, title }, created_at } }) => (
    <RowDetails uri={user.avatar_url}>
      <RowDetails.Issues date={created_at} user={user.login} issue={title} />
    </RowDetails>
  )

  renderFollowers = ({ item: { login, avatar_url, html_url } }) => (
    <RowDetails uri={avatar_url}>
      <RowDetails.Follower user={login} url={html_url} />
    </RowDetails>
  )

  renderHeaderList = () => {
    const {
      createdAt,
      description,
      forks,
      id,
      owner,
      score,
      stargazers,
      name,
      watchers
    } = this.state.repo
    return (
      <DetailsHeader
        date={createdAt}
        description={description}
        forks={forks.totalCount}
        key={id}
        name={name}
        score={watchers.totalCount}
        starts={stargazers.totalCount}
        uri={owner.avatarUrl}
      />
    )
  }

  render = () => {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Toolbar
          title={this.state.repo.owner.login}
          description={this.state.repo.owner.url}
          leftImg="chevron-left"
          rightImg={this.state.favorite ? 'heart' : 'heart-outline'}
          leftAction={this.goBack}
          rightAction={this.saveRepo}
        />
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          keyExtractor={keyExtractor}
          refreshing={this.state.loading}
          onRefresh={this.getExtraData}
          ListHeaderComponent={this.renderHeaderList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          sections={[
            {
              data: this.state.subscribers,
              title: 'Followers',
              renderItem: this.renderFollowers,
            },
            {
              data: this.state.issues,
              title: 'Issues',
              renderItem: this.renderIssues,
            },
          ]}
        />
      </View>
    )
  }
}


const ADD_FAVORITE = gql`
  mutation addFavorite($repo: Repository) {
    addFavorite(repo: $repo) @client
  }
`;


const GET_ALL_FAVORITES = gql`
  query {
    favorites @client {
      id
      name
    }
  }
`


export default compose(
  graphql(ADD_FAVORITE, { name: 'addFavorite' }),
  graphql(GET_ALL_FAVORITES, { name: 'favorites' })
)(Details);
