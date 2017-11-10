import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, View }
  from 'react-native';

import { store } from '../../../App';

export default class TopUpConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGold: store.getState().currentGold,
      pricePerGoldGram: store.getState().pricePerGoldGram,
    }    
  }

  render() {
    const { navigate } = this.props.navigation;

    // initiate navigation states
    let gram = this.props.navigation.state.params.gram;
    let price = this.props.navigation.state.params.price;
    let pricePerGoldGram = this.props.navigation.state.params.pricePerGoldGram;

    // DO SIMPLE CALCULATION
    let gramAfterBuy = gram + this.state.currentGold;
    
    // two decimals
    let gramStr = gram.toFixed(2);
    let gramCurrentStr = this.state.currentGold.toFixed(2);
    let gramAfterBuyStr = gramAfterBuy.toFixed(2);    

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.rowConfirmation}>
            <Text style={styles.confirmation}>Emas dibeli</Text>
            <Text style={styles.confirmation}>{gramStr} gram</Text>
          </View>

          <View style={styles.rowConfirmation}>
            <Text style={styles.confirmation}>Emas saat ini</Text>
            <Text style={styles.confirmation}>{gramCurrentStr} gram</Text>
          </View>

          <View style={styles.rowConfirmation}>
            <Text style={styles.confirmation}>Emas setelah dibeli</Text>
            <Text style={styles.confirmation}>{gramAfterBuyStr} gram</Text>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <TouchableNativeFeedback
              onPress={() => navigate('topUpStatusScreen', {
                'newGold': gram
              })}
              background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          >
            <View style={styles.confirmationButton}>
              <Text style={styles.confirmationTextButton}>BELI</Text>
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
  rowConfirmation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  confirmation: {
    fontSize: 20
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