import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, View }
  from 'react-native';
import { store } from '../../../App';


export default class PhonePostpaidScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGold: store.getState().currentGold,
      pricePerGoldGram: store.getState().pricePerGoldGram,
      phone: "0811551121",
      description: "Kartu Halo - Winnu"
    }    
  }

  render() {
    const { navigate } = this.props.navigation;

    let currentGoldStr = this.state.currentGold.toFixed(2);

    return (
      <View style={styles.container}>
        <View style={styles.rowBalance}>
          <Text style={styles.balance}>Saldo</Text>
          <Text style={styles.balance}>{currentGoldStr} gram</Text>
        </View>
        <View style={styles.formPayment}>
          <Text style={styles.label}>Nomor Telepon</Text>
          <TextInput
            value={this.state.phone}
            style={styles.textInputPhone}
            placeholder="Masukkan Nomor Telepon"
            placeholderTextColor="#d9dee9"
            underlineColorAndroid="#cac7cf" />

          <Text style={styles.label}>Deksripsi</Text>
          <TextInput         
            value={this.state.description}
            style={styles.textInputDescription}
            placeholder="Deskripsi (opsional)"
            placeholderTextColor="#d9dee9"
            underlineColorAndroid="#cac7cf" />
        </View>
        <View>
          <TouchableNativeFeedback
            onPress={() => navigate('phonePostpaidPaymentScreen', {
              'phone': this.state.phone,
              'description': this.state.description
            })}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          >
            <View style={styles.confirmationButton}>
              <Text style={styles.confirmationTextButton}>CEK TAGIHAN</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#eff1f5',
  },
  rowBalance: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 18
  },
  formPayment: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  label: {
    color: '#c6c9d0',
    marginBottom: 10,
  },
  textInputPhone: {
    height: 40,
    fontSize: 18,
    paddingBottom: 15,
    marginBottom: 25,
    color: 'black'
  },
  textInputDescription: {
    height: 40,
    fontSize: 18,
    paddingBottom: 15,
    marginBottom: 15,
    color: 'black'
  },
  confirmationButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 18
  },
  confirmationTextButton: {    
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});