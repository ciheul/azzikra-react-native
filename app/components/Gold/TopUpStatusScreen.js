import React, { Component } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableNativeFeedback, View }
  from 'react-native';

import { store } from '../../../App';


export default class TopUpStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newGold: this.props.navigation.state.params.newGold
    }
  }

  _goBack() {
    this.props.navigation.navigate('mainStack');
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})

      store.dispatch({
        type: 'TOP_UP',
        newGold: parseFloat(this.state.newGold.toFixed(2))
      });
    }, 3000);
  }

  render() {
    const { goBack } = this.props.navigation;

    let newGoldStr = this.state.newGold.toFixed(2);    

    return this.state.isLoading
      ? (<ActivityIndicator style={{marginTop: 30, marginBottom: 70}} size="large" />)
      : (<View>
        <View style={styles.rowConfirmation}>
          <Text style={styles.confirmation}>Top up emas seberat</Text>
          <Text style={styles.confirmationGram}>{newGoldStr} gram</Text>
          <Text style={styles.confirmation}>berhasil.</Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <TouchableNativeFeedback
            onPress={() => this._goBack()}
            // onPress={() => goBack('topUpConfirmationScreen')}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
          >
            <View style={styles.closeButton}>
              <Text style={styles.closeTextButton}>TUTUP</Text>
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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
    height: 48,      
  },
  closeTextButton: {    
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  }
});