
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Header
} from 'react-native-elements';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      date: '',
      loading: true,
      dataSource: [],
      modalVisible: false,

    };
  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.getValueFunction();
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => alert("Something went wrong"))
  }

  getValueFunction = () => {

    AsyncStorage.multiGet(['username', 'password', 'date']).then((data) => {
      let username = data[0][1];
      let password = data[1][1];
      let date = data[2][1];
      if (username && password != null) {
        this.setState({ username: username, password: password, date: date })
      } else {
        alert("Something went wrong")
      }
    })
  }
  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "grey",
      }}
      />
    );
  }

  renderItem = (data) => {

    return (
      <View>
        <Text style={styles.lightText}>Id:{data.item.id}</Text>
        <Text style={styles.lightText}>Name:{data.item.name}</Text>
        <Text style={styles.lightText}>Email:{data.item.email}</Text>
        <Text style={styles.lightText}>username:{data.item.username}</Text>
      </View>)


  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#00BCD4" />
        </View>
      )
    }
    return (
      <View>
        <View>
          <Header
            leftComponent={{ text: 'HOME', style: { color: 'white' } }}
            containerStyle={{
              backgroundColor: "#00BCD4",
              justifyContent: "space-around"
            }} />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.user}>
            <Icon name='user' color="white" size={40}></Icon>
            <Text style={{ color: '#fff', fontSize: 15, padding: 5 }} >username:{this.state.username}</Text>
            <Text style={{ color: '#fff', fontSize: 15, padding: 5 }}>password:{this.state.password} </Text>
            <Text style={{ color: '#fff', fontSize: 15, padding: 5 }}>Sign In Time:{this.state.date} </Text>
          </View>
          <Modal animationType={"slide"} transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { this.setState({ modalVisible: false }) }}>

            <View style={styles.modal}>
              <Text style={{ color: '#fff', fontSize: 15, padding: 5, fontWeight: '200' }}>USER DATA</Text>
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={item => this.renderItem(item)}
                keyExtractor={item => item.id.toString()}

              />
            </View>
          </Modal>
          <TouchableOpacity onPress={() => {
            this.toggleModal(!this.state.modalVisible)
          }}>
            <View style={{
              alignItems: 'center', justifyContent: 'center', backgroundColor: '#00BCD4', margin: 10, height: 50, borderRadius: 10,
              borderColor: '#fff',
            }}>

              <Text style={styles.text}>USER DATA</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create(
  {
    user:
    {
      padding: 5,
      backgroundColor: '#00BCD4',
      alignItems: 'center',
      marginTop: 5,
      borderRadius: 10,
      elevation: 30,
      justifyContent: 'space-between',
      margin: 10,
      height: 140,

    },
    modal: {

      backgroundColor: "#00BCD4",
      padding: 10,
      width: '100%',
      borderRadius: 10,
      elevation: 30,
      marginTop: 10,
      marginVertical: 20,
      marginBottom: 30,
    },

   
    lightText: {
      fontFamily: 'Verdana',
      fontSize: 15,
      color: 'white'
    },
    text: {
      color: 'white',

    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"
    },

  })
