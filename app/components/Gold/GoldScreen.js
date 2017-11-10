import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableNativeFeedback, View }
  from 'react-native';

import { separateWithCommasTwoDecimals } from '../../utils/Helper';
import { store } from '../../../App';

const GRID_PADDING = 15;
const NUM_COLS = 3;


function _getGridElementSize() {
  let dimensions = Dimensions.get('window');
  return (dimensions.width - GRID_PADDING*2*2) / NUM_COLS;
}


export default class GoldScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGold: store.getState().currentGold,
      pricePerGoldGram: store.getState().pricePerGoldGram,
    }    
  }

  _modifyBalance(balance) {
    return "IDR " + separateWithCommasTwoDecimals(balance);
  }  

  // return size for grid menu so that grid layout is created symmetrically
  // against padding on the both sides
  _getGridElementSize() {
    let dimensions = Dimensions.get('window');
    return (dimensions.width - GRID_PADDING*2) / NUM_COLS;
  }

  componentDidMount() {
    // TODO: temporary for simulation. should be using ajax to retrieve
    // this.setState({gold: parseFloat(257.12)});
    // this.setState({pricePerGoldGram: parseFloat(500000.00)});    
  }  

  render() {
    const { navigate } = this.props.navigation;

    let size = this._getGridElementSize();

    let balance = this.state.currentGold * this.state.pricePerGoldGram;
    
    let modifiedBalance = this._modifyBalance(balance);
    
    let currentGoldStr = this.state.currentGold.toFixed(2);

    return (
      <View style={styles.container}>
        <View style={styles.rowBalance}>
          <Text style={styles.balance}>Saldo</Text>
          <Text style={styles.balance}>{currentGoldStr} gram</Text>
        </View>

        <View style={styles.grid}>          
          <TouchableNativeFeedback
              onPress={() => navigate('topUpScreen')}
              background={Platform.OS === 'android' ?
                TouchableNativeFeedback.SelectableBackground() : ''}>
            <View style={styles.product}>
              <Text style={styles.productText}>Top Up</Text>
            </View>
          </TouchableNativeFeedback>
          
          <TouchableNativeFeedback
              onPress={() => navigate('moneyWithdrawScreen')}
              background={Platform.OS === 'android' ?
                TouchableNativeFeedback.SelectableBackground() : ''}>
            <View style={styles.product}>
              <Text style={styles.productText}>Tarik Uang</Text>
            </View>
          </TouchableNativeFeedback>
          
          <TouchableNativeFeedback
              onPress={() => navigate('goldWithdrawScreen')}
              background={Platform.OS === 'android' ?
                TouchableNativeFeedback.SelectableBackground() : ''}>
            <View style={styles.product}>
              <Text style={styles.productText}>Tarik Emas</Text>
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
    backgroundColor: 'white',
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 18
  },

  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: GRID_PADDING,
    paddingTop: GRID_PADDING,
    paddingRight: GRID_PADDING,
    paddingBottom: 0,
  },
  product: {
    width: _getGridElementSize(),
    height: _getGridElementSize(),
    borderWidth: 1,
    borderColor: 'darkorange',
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  productText: {
    fontSize: 14,
    color: 'darkorange'
  }
});