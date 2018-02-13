import React from 'react'
import { View, Image } from 'react-native'

const stargazers = ({ edges, style }) => {
  return (
    <View style={style} >
      {edges.map((it, index) => <Image key={it.node.avatarUrl} source={{ uri: it.node.avatarUrl }} style={{ width: 25, height: 25, borderRadius: 12.5, marginLeft: index === 0 ? 0 : - 10 }} />)}
    </View >)
}

export default stargazers