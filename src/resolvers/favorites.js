import gql from 'graphql-tag';
import { remove, find } from 'lodash'


const getFavites = gql`
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
`;



export default {
  resolvers: {
    Mutation: {
      addFavorite: (_, { repo }, { cache }) => {

        const previous = cache.readQuery({ query: getFavites });
        let favorites = [...previous.favorites]

        if (find(favorites, it => it.id === repo.id)) {
          remove(favorites, it => it.id === repo.id)
        }
        else {
          favorites = favorites.concat({ ...repo })
        }

        const data = {
          favorites
        };

        cache.writeData({ data });
        return repo 
      },
    },
  },
  defaults: {
    favorites: []
  },
}