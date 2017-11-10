import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableNativeFeedback, View }
  from 'react-native';

import { store } from '../../../App';
import { separateWithDots, separateWithCommasTwoDecimals } from '../../utils/Helper';


export default class TopUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGold: store.getState().currentGold,
      pricePerGoldGram: store.getState().pricePerGoldGram,
    }    
  }

  _modifyDate() {
    // let d = globalState.priceUpdatedAt;
    let d = new Date();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let yyyy = d.getFullYear();
    let date = dd + '-' + mm + '-' + yyyy;
    return date;
  }

  _getSuggestionListByPrice() {    
    return [
      {key: 50000},
      {key: 100000},
      {key: 200000},
      {key: 500000},
      {key: 1000000},
      {key: 1500000},
      {key: 2000000},
      {key: 2500000},
      {key: 5000000},
      {key: 7500000},
      {key: 10000000},
      {key: 15000000},
      {key: 20000000},
      {key: 25000000},
      {key: 50000000},
      {key: 75000000},
      {key: 100000000}
    ];
  }

  _renderSuggestionItem(item) {
    let gram = item.key / this.state.pricePerGoldGram;
    const { navigate } = this.props.navigation;

    return (
      <TouchableNativeFeedback
          onPress={() => navigate('topUpConfirmationScreen', {
            'gram': gram, 
            'price': item.key,
            'pricePerGoldGram': this.state.pricePerGoldGram 
          })}
          background={Platform.OS === 'android' ?
            TouchableNativeFeedback.SelectableBackground() : ''}
      >
        <View style={styles.suggestionItem}>
          <Text style={styles.suggestionText}>IDR {separateWithCommasTwoDecimals(item.key)}</Text>
          <Text style={styles.suggestionText}>{parseFloat(gram).toFixed(2)} gram</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    let pricePerGoldGram = separateWithCommasTwoDecimals(this.state.pricePerGoldGram);
    
    let date = this._modifyDate();
    
    return (
      <View style={styles.container}>
        <View style={styles.rowBalance}>
          <Text style={styles.balance}>Antam ({date})</Text>          
          <Text style={styles.balance}>IDR {pricePerGoldGram}</Text>
        </View>
        <FlatList
          data={this._getSuggestionListByPrice()}
          renderItem={({item}) => this._renderSuggestionItem(item)}
        />
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
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 18
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 5
  },
  suggestionText: {
    fontSize: 20
  }
});