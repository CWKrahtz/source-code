import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import React, { useCallback, useReducer, useState } from 'react';
import { validateInput } from '../utils/actions/formAction';
import { reducer } from '../utils/reducers/formReducers';
import Input from '../components/Input';
import { handleSignUp } from '../authService'; // Ensure correct import

const isTestMode = true;

const initialState = {
    inputValues: {
        fullName: isTestMode ? "Christian Krahtz" : "",
        email: isTestMode ? "example@gmail.com" : "",
        password: isTestMode ? "**********" : "",
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
    },
    formIsValid: false,
};

function SignupScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ type: 'UPDATE_INPUT', inputId, validationResult: result, inputValue });
    }, []);

    const authHandler = async () => {
        try {
            setIsLoading(true);

            // Call handleSignUp with email, password, and fullName (optional)
            await handleSignUp(
                formState.inputValues.email,
                formState.inputValues.password,
                formState.inputValues.fullName // Add fullName if needed
            );

            setIsLoading(false);
            Alert.alert("Account Successfully created", "Account Created");
            navigation.navigate('Login'); // Navigate to login screen after successful registration

        } catch (error) {
            console.error('Error during sign up:', error.message);
            setIsLoading(false);
            Alert.alert('Error during sign up. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            <View style={styles.sub_container}>
                <Text style={styles.subheading}>Create a new account or Login</Text>
                <Text style={styles.subheading_link} onPress={() => navigation.navigate('Login')}>
                    {' '}
                    here
                </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Username</Text>
                    <Input
                        id="fullName"
                        placeholder="Enter your username"
                        placeholderTextColor="#FFFFFF40"
                        errorText={!formState.inputValidities.fullName}
                        onInputChanged={inputChangedHandler}
                    />
                </View>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Email</Text>
                    <Input
                        id="email"
                        placeholder="Enter your email"
                        placeholderTextColor="#FFFFFF40"
                        errorText={!formState.inputValidities.email}
                        onInputChanged={inputChangedHandler}
                    />
                </View>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Password</Text>
                    <Input
                        id="password"
                        placeholder="Enter your password"
                        placeholderTextColor="#FFFFFF40"
                        secureTextEntry={true}
                        errorText={!formState.inputValidities.password}
                        onInputChanged={inputChangedHandler}
                    />
                </View>
            </View>
            <View style={styles.btn_container}>
                <Pressable style={styles.btn} onPress={authHandler}>
                    <Text style={styles.btn_text}>Register</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
        borderRadius: 10,
    },
    heading: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
    },
    sub_container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 24,
    },
    subheading: {
        color: 'white',
        fontSize: 14,
        fontWeight: '200',
    },
    subheading_link: {
        color: '#6573B6',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    inputrows: {
        marginTop: 24,
    },
    label: {
        color: 'white',
        fontSize: 14,
        fontWeight: '200',
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
        height: 150,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        borderRadius: 10,
        backgroundColor: '#19256F',
        width: '60%',
    },
    btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default SignupScreen;