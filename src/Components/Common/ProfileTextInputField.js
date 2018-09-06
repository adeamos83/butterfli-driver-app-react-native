import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

class ProfileTextInputField extends React.Component {
    
   
    render() {
        const { getInputData,  canEdit, refField, onEnter, inputData, input: { value, onChange}, ...field } = this.props;
        
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
                value={value} underlineColorAndroid="transparent" selectTextOnFocus={false} {...this.props}
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
       height: 50,
       color: 'black',
       textAlign: 'right',
       fontSize: 17
    },
    formError: {
       color: 'red'
    }
 }

export { ProfileTextInputField };