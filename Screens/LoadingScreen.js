
import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
export default class Loading extends Component {

  componentDidMount() {

    setTimeout(() => {
      this.checkIfuserlogged();
    }, 1000)
  }

  checkIfuserlogged = () => {

    let value = AsyncStorage.multiGet(['username', 'password']).then((data) => {
      let username = data[0][1];
      let password = data[1][1];
      if (username && password != null) {
        this.props.navigation.navigate('Home')
      }
      else {
        this.props.navigation.navigate('Login')
      }

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00BCD4" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
