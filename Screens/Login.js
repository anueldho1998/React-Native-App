import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            date: '',

        };
    }


    saveValueFunction = () => {
        if (this.state.username.trim() && this.state.password.trim() != '') {

            const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");

            AsyncStorage.multiSet([
                ["username", this.state.username],
                ["password", this.state.password],
                ["date", date]
            ])
            this.props.navigation.navigate('Home')

        }
        else {
            alert("Please Fill Data")
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.Text}>Sign In</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <TextInput style={styles.inputtext} placeholder='Username'
                        placeholderTextColor='white' autoCapitalize="none" color="white"
                        value={this.state.username}
                        onChangeText={data => this.setState({ username: data })}>
                    </TextInput>
                    <TextInput style={styles.inputtext} placeholder='Password' autoCapitalize="none"
                        placeholderTextColor='white' secureTextEntry={true} color="white"
                        value={this.state.password}
                        onChangeText={data => this.setState({ password: data })}>
                    </TextInput>
                    <TouchableOpacity style={styles.button} onPress={this.saveValueFunction}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create(
    {

        container:
        {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

        },

        inputtext:
        {
            width: 300,
            borderColor: 'white',
            borderRadius: 50,
            paddingHorizontal: 16,
            fontSize: 15,
            backgroundColor: '#00BCD1',
            marginVertical: 8,

        },

        button:
        {
            width: 300,
            backgroundColor: '#00BCD4',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 12,
            marginTop: 20,

        },

        buttonText:
        {
            fontSize: 16,
            fontWeight: '500',
            color: 'white',
            textAlign: 'center',
        },
        Text: {
            fontSize: 40,
            fontWeight: '500',
            color: '#00BCD4',
            textAlign: 'center',
        }


    }
)
