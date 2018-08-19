// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Image,
  Text,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';

import { updateDeviceInfo } from '../shared/actions';
import { setWalletAddress } from '../shared/store/persistentStorage';

type Props = {
  wallet: string,
  updateDeviceInfo: Function
};

type State = {
  modalVisible: boolean,
  wallet: string
};

class UserSettings extends Component<Props, State> {
  state = {
    modalVisible: false,
    wallet: this.props.wallet
  };

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          right: 15,
          top: 15
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          style={{
            backgroundColor: '#0f4b77'
          }}
        >
          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 20,
              paddingBottom: 120,
              backgroundColor: '#0f4b77'
            }}
          >
            <View
              style={{
                backgroundColor: '#0f4b77'
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.props.updateDeviceInfo({
                    device: {
                      walletAddress: this.state.wallet,
                      wifi_only: false
                    }
                  });
                  setWalletAddress(this.state.wallet);
                }}
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 15
                }}
              >
                <Image
                  source={require('../../../assets/images/close.png')}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableHighlight>

              <Text
                style={{
                  marginTop: 80,
                  fontFamily: 'Exo-Regular',
                  color: 'white',
                  fontSize: 20
                }}
              >
                Path Wallet Address
              </Text>

              <TextInput
                style={{
                  fontFamily: 'Exo-Regular',
                  color: 'white',
                  fontSize: 20,
                  height: 60
                }}
                onChangeText={wallet => this.setState({ wallet })}
                value={this.state.wallet}
              />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.props.updateDeviceInfo({
                    device: {
                      walletAddress: this.state.wallet,
                      wifi_only: false
                    }
                  });
                  setWalletAddress(this.state.wallet);
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Exo-Regular',
                    color: 'white',
                    fontSize: 20,
                    marginTop: 10
                  }}
                >
                  Save
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Image
            source={require('../../../assets/images/cog.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.options.walletAddress
  };
};

const mapDispatchToProps = {
  updateDeviceInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
