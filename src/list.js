
// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';


// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';


// const fragment = `
// ... on Issue {
//   body
//   authorAssociation,
//   assignees(last: 2) {
//     edges {
//       node {
//         id
//       }
//     }
//   }
//   author{
//     avatarUrl,
//     url,
//     resourcePath,
//     login
//   }
// }`

// const query = gql`
// query{
//   search(query: "Hackdie", type: ISSUE, first:10){
//     repositoryCount
//     edges{
//       node {
//         ${fragment}
//       }
//     }
//   }
// }
// `


// class List extends Component {
//   render() {
//     if (this.props.data.error)
//       return <View />;

//     if (this.props.data.loading)
//       return <View />;

//     console.log(this.props.data.search.edges[0])



//     return (
//       <View style={{}}>

//       </View>
//     );
//   }
// }

// export default graphql(query)(List);

