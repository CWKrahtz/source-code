import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'

import { handleLogin } from '../authService'
import Input from '../components/Input'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formAction';

const isTestMode = true;

const initialState = {
    inputValues: {
        email: isTestMode ? "example@gmail.com" : "",
        password: isTestMode ? "**********" : "",
    },
    inputValidities: {
        email: false,
        password: false,
    },
    fomrIsValid: false,
}

function LoginScreen({ navigation }) {

    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue });
    }, [dispatchFormState])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        // setEmail(formState.inputValues.email); <--took to long to set the values before calling login
        // setPassword(formState.inputValues.password);
        handleLogin(formState.inputValues.email, formState.inputValues.password);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Welcome back</Text>
            <View style={styles.sub_container}>
                <Text style={styles.subheading}>Login to your account or </Text>
                <Text style={styles.subheading_link} onPress={() => navigation.navigate('Signup')}>create new account</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Email</Text>
                    <Input
                        placeholder="Enter your email"
                        placeholderTextColor='#FFFFFF40'
                        errorText={formState.inputValidities["email"]}
                        onInputChanged={inputChangedHandler} />
                </View>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Password</Text>
                    <Input
                        id='password'
                        placeholder="Enter your password"
                        placeholderTextColor='#FFFFFF40'
                        secureTextEntry={true}
                        errorText={formState.inputValidities["password"]}
                        onInputChanged={inputChangedHandler} />
                </View>
            </View>
            <View style={styles.btn_container}>
                <Pressable style={styles.btn} onPress={login}>
                    <Text style={styles.btn_text}>Login</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingTop: 75,
        backgroundColor: '#000032',
    },
    body: {
        backgroundColor: '#212B5B',
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        borderRadius: 10
    },
    heading: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    },
    sub_container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 24
    },
    subheading: {
        color: 'white',
        fontSize: 14,
        fontWeight: '200'
    },
    subheading_link: {
        color: '#6573B6',
        textDecorationLine: true,
        fontWeight: 'bold'
    },
    inputrows: {
        marginTop: 24,
    },
    label: {
        color: 'white',
        fontSize: 14,
        fontWeight: '200'
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
    btn_container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        height: 150,
        // backgroundColor: 'white',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        // paddingHorizontal: 50,
        borderRadius: 10,
        backgroundColor: '#19256F',
        width: '60%',
    },
    btn_text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }

});

export default LoginScreen