// // In App.js in a new project
// import * as React from 'react';
// import {View, Text, TouchableOpacity, Button, TextInput} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// function HomeScreen({navigation, route}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button
//         title="Create post"
//         onPress={() => navigation.navigate('CreatePost')}
//       />
//       <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
//     </View>
//   );
// }

// function CreatePostScreen({navigation, route}) {
//   const [postText, setPostText] = React.useState('');

//   return (
//     <View>
//       <TextInput
//         multiline
//         placeholder="What's on your mind?"
//         style={{height: 200, padding: 10, backgroundColor: 'white'}}
//         value={postText}
//         onChangeText={setPostText}
//       />
//       <Button
//         title="Done"
//         onPress={() => {
//           // Pass params back to home screen
//           navigation.navigate('Home', {post: postText});
//         }}
//       />
//     </View>
//   );
// }

// function DetailsScreen({navigation, route}) {
//   const {data} = route.params;
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Details Screen {data}</Text>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{title: 'Overview'}}
//         />
//         <Stack.Screen
//           name="Details"
//           component={DetailsScreen}
//           initialParams={{data: 'Hehe'}}
//         />
//         <Stack.Screen
//           name="CreatePost"
//           component={CreatePostScreen}
//           initialParams={{data: 'Hehe'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {actions, types} from './src/redux/reducer/contentReducer';
import {Provider} from 'react-redux';
import store from './store';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      coverImage: '',
      duration: 0,
      title: null,
      artist: null,
      like: null,
      is_liked: null,
    };
  }
  componentDidMount = async () => {
    await this.props.get_data();
  };
  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.content.type === types.GET_DATA) {
      const {data} = nextProps.content;
      this.setState({
        isLoading: false,
        coverImage: data.cover,
        duration: data.duration,
        title: data.title,
        artist: data.artist,
        like: data.likes,
        is_liked: data.is_liked,
      });
    }
  }

  render() {
    const {
      isLoading,
      coverImage,
      duration,
      title,
      artist,
      like,
      is_liked,
    } = this.state;
    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator color="red" size="large" animating={isLoading} />
        </View>
      );
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri:
                'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767531-1502435.png',
            }}
            style={styles.iconGoBack}
            resizeMode="contain"
          />
          <Text styles={styles.textHeader}> Trucker Radio</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={{
              uri:
                coverImage !== null
                  ? coverImage
                  : 'https://www.shareicon.net/data/512x512/2016/09/14/829018_arrows_512x512.png',
            }}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
          <View style={{paddingHorizontal: 80}}>
            <Text style={{textAlign: 'center'}}>{title}</Text>
          </View>
          <View style={{paddingHorizontal: 80}}>
            <Text style={{textAlign: 'center'}}>{artist}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text>0:00</Text>
            <Text>{duration / 10}:00</Text>
          </View>
          <View
            style={{
              margin: 10,
              borderWidth: 1.5,
              borderColor: 'gray',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  'https://www.shareicon.net/data/512x512/2016/09/14/829018_arrows_512x512.png',
              }}
              style={styles.iconGoBack}
              resizeMode="contain"
            />
            <Image
              source={{
                uri:
                  'https://cdn3.iconfinder.com/data/icons/iconic-1/32/play_alt-512.png',
              }}
              style={styles.iconGoBack}
              resizeMode="contain"
            />
            <Image
              source={{
                uri:
                  'https://cdn3.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-3-1/16/5109-512.png',
              }}
              style={styles.iconGoBack}
              resizeMode="contain"
            />
            <View
              style={{
                position: 'absolute',
                width: 35,
                height: 35,
                right: 50,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri:
                    'https://img.favpng.com/1/11/6/computer-icons-like-button-facebook-png-favpng-Cpwg3F3hESqgPmbteS12aaNKR.jpg',
                }}
                resizeMode="contain"
                style={styles.iconGoBack}
              />
              <Text>{like}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({contentReducer}) => {
  return {
    content: contentReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    get_data: () => dispatch(actions.get_data()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    flex: 0.1,
    backgroundColor: 'brown',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  iconGoBack: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  textHeader: {
    fontSize: 18,
    color: 'white',
  },
  content: {
    flex: 0.7,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.2,
  },
});
