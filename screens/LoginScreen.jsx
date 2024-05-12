import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import React from 'react'

function LoginScreen ({ navigation })  {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Welcome back</Text>
            <View style={styles.sub_container}>
                <Text style={styles.subheading}>Login to your account or </Text>
                <Text style={styles.subheading_link}  onPress={() => navigation.navigate('Signup')}>create new account</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" placeholderTextColor='#FFFFFF40' />
                </View>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={[styles.input, styles.shadowProp]} placeholder="Password" placeholderTextColor='#FFFFFF40' secureTextEntry={true} />
                </View>
            </View>
            <View style={styles.btn_container}>
                <Pressable style={styles.btn}>
                    <Text style={styles.btn_text}>Login</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'grey',
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
        marginTop: '13%',
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
    shadowProp: {
        // shadowColor: '#FFFFFF',
        // shadowOffset: {width: 0, height: 5},
        // shadowOpacity: 0.5,
        // shadowRadius: 4,
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