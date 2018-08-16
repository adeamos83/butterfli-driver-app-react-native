import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

class TextInputField extends React.Component {
    
   
    render() {
        const { getInputData,  refField, onEnter, inputData, input: { value, onChange}, ...field } = this.props;
        
        handleInput = (key, val) => {
            getInputData({
                key,
                value: val
            });
        }
        return (
            <View>
            <TextInput
                {...field}
                ref = {refField}
                style={[styles.textInput]}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(value) => onChange(value)} 
                value={value} underlineColorAndroid="transparent" selectTextOnFocus={true} {...this.props}
                onSubmitEditing={onEnter}
            />
            {field.meta.touched && field.meta.error &&
                <Text style={styles.formError}>{field.meta.error}</Text>
            }
            </View>
        );
    }
}

const styles = {
    field: {
       borderRadius: 5,
       padding: 5,
       paddingLeft: 8,
       margin: 7,
       marginTop: 0,
       backgroundColor: 'white'
    },
    textInput: {
       height: 26,
       color: 'black'
    },
    formError: {
       color: 'red'
    }
 }

export { TextInputField };