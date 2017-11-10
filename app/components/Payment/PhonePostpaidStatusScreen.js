import React, { Component } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableNativeFeedback, View }
  from 'react-native';

import { store } from '../../../App';


export default class PhonePostpaidStatusScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentGold: this.props.navigation.state.params.currentGold,
      amount: this.props.navigation.state.params.amount,
      phone: this.props.navigation.state.params.phone,
    }
  }

  _goBack() {
    this.props.navigation.navigate('mainStack');
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})

      // only when balance is enough to pay the specified amount,
      // substract balance with amount      
      let convertedGold = this.state.amount / store.getState().pricePerGoldGram;
      store.dispatch({
        type: 'PAY',
        amount: parseFloat(convertedGold.toFixed(2))
      });
      
    }, 3000);
  }

  render() {
    const { goBack } = this.props.navigation;

    // let newGoldStr = this.state.newGold.toFixed(2);    

    return this.state.isLoading
      ? (<ActivityIndicator style={{marginTop: 30, marginBottom: 70}} size="large" />)
      : (<View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.rowConfirmation}>
            <Text style={styles.confirmation}>Pembayaran telepon</Text>
            <Text style={styles.confirmationGram}>{this.state.phone}</Text>
            <Text style={styles.confirmation}>berhasil</Text>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <TouchableNativeFeedback
            onPress={() => this._goBack()}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          >
            <View style={styles.closeButton}>
              <Text style={styles.closeTextButton}>TUTUP</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>);
  }
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#eff1f5',
  },
  rowConfirmation: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  confirmation: {
    fontSize: 20
  },
  confirmationGram: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'green'
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 18
  },
  closeTextButton: {    
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});