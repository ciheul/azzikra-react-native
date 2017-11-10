import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, View }
  from 'react-native';

import { store } from '../../../App';
import { separateWithCommasTwoDecimals } from '../../utils/Helper';

export default class PhonePostpaidScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGold: store.getState().currentGold,
      pricePerGoldGram: store.getState().pricePerGoldGram,
      amount: 130092.00,
    }    
  }

  _modifyBalance(balance) {
    return "IDR " + separateWithCommasTwoDecimals(balance);
  }

  _selectConfirmationButton(isNotEnough) {
    const { navigate } = this.props.navigation;

    if (isNotEnough) {
      return (
        <TouchableNativeFeedback
          onPress={() => navigate('mainStack')}
          background={Platform.OS === 'android' ?
            TouchableNativeFeedback.SelectableBackground() : ''}
        >
          <View style={styles.cancelButton}>
            <Text style={styles.confirmationTextButton}>TUTUP</Text>
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableNativeFeedback
          onPress={() => navigate('phonePostpaidStatusScreen', {
            amount: this.state.amount,
            currentGold: this.state.currentGold,
            phone: phone
          })}
          background={Platform.OS === 'android' ?
            TouchableNativeFeedback.SelectableBackground() : ''}
        >
          <View style={styles.confirmationButton}>
            <Text style={styles.confirmationTextButton}>BAYAR</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;    

    let phone = this.props.navigation.state.params.phone;
    let description = this.props.navigation.state.params.description;

    let currentGoldStr = this.state.currentGold.toFixed(2);

    let balance = this.state.currentGold * this.state.pricePerGoldGram;    
    let balanceStr = this._modifyBalance(balance);

    let amountStr = separateWithCommasTwoDecimals(this.state.amount);

    let isNotEnough = balance < this.state.amount;

    let isRedStyle = balance < this.state.amount ?
      styles.balanceRed : styles.balance;

    let additionalInfo = balance < this.state.amount ?
      <Text style={styles.error}>(Konversi Rupiah tidak cukup)</Text> : "";  

    return (
      <View style={styles.container}>     
        <View style={styles.rowBalance}>
          <View>
            <Text style={styles.label}>Konversi</Text>
            <Text style={isRedStyle}>{balanceStr}</Text>
          </View>
          <View>
            <Text style={styles.label}>Saldo</Text>
            <Text style={styles.balance}>{currentGoldStr} gram</Text>
          </View>          
        </View>   
        
        <View style={styles.formPayment}>
          <View style={styles.confirmationRow}>
            <Text style={styles.label}>Produk</Text>
            <Text style={styles.value}>Telkomsel</Text>
          </View>
          <View style={styles.confirmationRow}>
            <Text style={styles.label}>Nomor</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
          <View style={styles.confirmationRow}>
            <Text style={styles.label}>Nama Pelanggan</Text>
            <Text style={styles.value}>Bapak WINNU AYI SATRIA</Text>
          </View>
          <View style={styles.confirmationRow}>
            <Text style={styles.label}>Jumlah</Text>
            <Text style={isRedStyle}>IDR {amountStr}</Text>
            {additionalInfo}
          </View>
          <View style={styles.confirmationRow}>
            <Text style={styles.label}>Deskripsi</Text>
            <Text style={styles.value}>{description}</Text>
          </View>
        </View>

        <View>
          <TouchableNativeFeedback
            onPress={() => navigate('phonePostpaidStatusScreen', {
              amount: this.state.amount,
              currentGold: this.state.currentGold,
              phone: phone
            })}
            background={Platform.OS === 'android' ?
              TouchableNativeFeedback.SelectableBackground() : ''}
          >
            <View style={styles.confirmationButton}>
              <Text style={styles.confirmationTextButton}>BAYAR</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 18
  },
  balanceRed: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'red',
  },
  error: {
    color: 'red'
  },
  formPayment: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  label: {
    color: '#c6c9d0',
  },
  value: {
    fontSize: 18
  },
  confirmationRow: {
    marginBottom: 20,
  },
  confirmationButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 18
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 18
  },
  confirmationTextButton: {    
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});