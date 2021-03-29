import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

let globalObj: any = null;

const App = () => {
  const [state, setState] = useState({
    statusText: 'Init',
    result: '---',
  });

  const generateLoad = function () {
    let localObj: any = globalObj;
    const countLongStringLength = function () {
      if (localObj?.longString && localObj.longString.length % 2 === 0) {
        const result = `Found even length: ${
          localObj.longString.length
        }, TS: ${new Date().getTime()}`;
        setState(s => ({...s, result}));
      }
    };
    globalObj = {
      longString: new Array(Math.floor(Math.random() * 10000) + 5000000).join(
        '-',
      ),
      someMethod: function () {
        console.log('Some Message');
      },
    };
    countLongStringLength();
  };

  const testMemoryLeak = () => {
    console.log('Test Memory Leak');
    setState(s => ({...s, statusText: 'Testing started'}));
    setInterval(() => {
      setState(s => ({
        ...s,
        statusText: `Running, TS: ${new Date().getTime()}`,
      }));
      generateLoad();
    }, 100);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          testMemoryLeak();
        }}>
        <Text>Test Memory Leak</Text>
      </TouchableOpacity>
      <Text>{state.statusText}</Text>
      <Text>{state.result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingLeft: 20,
  },
});

export default App;
