import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, Image, KeyboardAvoidingView, Platform,
  StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, View }
  from 'react-native';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'winnuayi@gmail.com',
      password: 'indonesia',
      isLoading: false,
    }
  }

  _onLogin() {
    const { navigate } = this.props.navigation;

    this.setState({isLoading: true});

    // simulate login without networking
    setTimeout(() => {
      this.setState({isLoading: false});
      navigate('mainStack');
    }, 1000);
  }

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <KeyboardAvoidingView
          style={styles.loginScreen}          
          behavior={'position'}>
        <Text style={styles.titleLogin}>AZZIKRA DIGITAL</Text>
        
        <ActivityIndicator style={{marginBottom: 70, opacity: this.state.isLoading ? 1.0 : 0.0}} size="large" />

        <TextInput
          value={this.state.email}
          style={styles.textInputLogin}
          placeholder="Email"
          placeholderTextColor="#ffeeee"
          underlineColorAndroid="#ffeeee" />
        <TextInput
          value={this.state.password}
          style={styles.textInputLogin}
          placeholder="Password"
          placeholderTextColor="#ffeeee"
          underlineColorAndroid="#ffeeee"
          secureTextEntry={true} />        
        <TouchableNativeFeedback
            onPress={() => this._onLogin()}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
        >
          <View style={styles.buttonLogin}>
            <Text style={styles.buttonTextLogin}>MASUK</Text>
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  loginScreen: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'darkorange',
    padding: 20,
  },
  titleLogin: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 150,
    color: 'white'
  },
  textInputLogin: {
    height: 40,
    fontSize: 18,
    paddingBottom: 15,
    marginBottom: 25,
    color: 'white'
  },
  buttonLogin: {
    alignItems: 'center',
    backgroundColor: 'green',
    height: 48
  },
  buttonTextLogin: {    
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  }  
});


AppRegistry.registerComponent('edu', () => LoginScreen);