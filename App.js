import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: require('./images/ImageNotAvailable.png'),
      imageWidth: 225,
      imageHeight: 300
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>   
        <Image
          style={{width: this.state.imageWidth, height: this.state.imageHeight}}
          source={this.state.image}
        />
        <Button
          title="Take New Pic"
          onPress={()=>{
            this.props.navigation.navigate('Camera', {
              mainScreen: this
            })
          }}
        />
      </View>
    );
  }
}

class CameraScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };  
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(permStatus => {
      this.setState({ hasCameraPermission: permStatus.status === 'granted' });
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Camera: CameraScreen,
  },
  {
    initialRouteName: 'Main',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;