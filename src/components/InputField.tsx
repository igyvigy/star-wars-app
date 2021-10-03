import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import {View, TextInput, StyleSheet} from 'react-native';

type Props = {
  style?: ViewStyle;
  text?: string;
  placeholder?: string;
  onChange?: (text?: string) => void;
};

const InputField: React.FC<Props> = props => {
  const {style, text: initialText, placeholder, onChange} = props;

  const [text, setText] = useState(initialText ?? '');

  useEffect(() => {
    onChange && onChange(text);
  }, [text, onChange]);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={text}
        placeholder={placeholder}
        onChangeText={text => {
          setText(text);
        }}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    marginHorizontal: 16,
  },
});
