import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Spark App',
  host: '192.168.0.3',
})
  .useReactNative({
    asyncStorage: true,
  })
  .connect();
