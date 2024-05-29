import { StyleSheet, Text, View, Button, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { handleSignOut } from '../authService'

function ProfileScreen({ navigation }) {

    // TODO: handle logout
    const handleLogout = () => {
        handleSignOut();
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ padding: 20 }}>
                <Text style={styles.header}>Profile</Text>
                <Text style={styles.subhead}>your personal detail</Text>
                {/* TODO: Show logged in user info */}
                <Text>Email here</Text>
                <Text>Username here</Text>

                <View style={styles.btn_container}>
                    <Pressable style={styles.btn} onPress={handleLogout}>
                        <Text style={styles.btn_text}>Log Out</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 46,
        fontWeight: 'bold',
        color: 'white'
    },
    subhead: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white'
    },
    background: {
        flex: 1,
        backgroundColor: '#000032',
    },
    btn_container: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        // paddingHorizontal: 50,
        borderRadius: 10,
        backgroundColor: '#19256F',
        width: '100%',
    },
    btn_text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }

});

export default ProfileScreen