import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

const Input = (props) => {

    const { colors, light } = useTheme();

    const onChangeText = (text) => {
        console.log("input change ..." + text + ' ' + props.id)
        if(props.id){
            props.onInputChanged(props.id, text)
        } else {
            props.onInputChanged(text)
        }
        
    }

    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                onChangeText={onChangeText}
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor='#FFFFFF40' />

            {props.errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText[0]}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    errorContainer: {
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 12
    },
    input: {
        width: '100%',
        height: 50,
        paddingLeft: 12,
        backgroundColor: '#2D4095',
        borderRadius: 10,
        fontSize: 16,
        color: 'white',
        marginTop: 10,
    },
})

export default Input