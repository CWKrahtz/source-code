import { StyleSheet, View, Text, SafeAreaView, Pressable, ImageBackground, ScrollView } from 'react-native'
import React from 'react'

const image = require('../assets/test_images/html-5.png')

function Competitions({ navigation }) {
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.header}>Competitions</Text>
                <Text style={styles.subhead}>Select competition to compete in</Text>
                <ScrollView style={styles.scroll}>
                    {/* Loop through possible compititions */}
                    <ImageBackground style={styles.card} source={image} resizeMode="cover">
                        <View style={styles.shadow}>
                            <Text style={styles.title}>Title</Text>
                            <Text style={styles.description}>
                                This is a description area for the competition.
                                It is just a simple explination on how it works
                            </Text>
                            <Pressable style={styles.btn}>
                                <Text style={styles.btn_text}>Enter</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>

                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000032',
    },
    container: {
        padding: 24,
    },
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
    scroll: {
        paddingTop: 24,
        height: '100%'
    },
    shadow: {
        backgroundColor: '#212B5B80',
        borderRadius: 10,
        padding: 15
    },
    card: {
        backgroundColor: '#212B5B',
        borderRadius: 10,
        // padding: 15
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    description: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 20
    },

    btn_container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        // paddingHorizontal: 50,
        borderRadius: 10,
        backgroundColor: '#2D4095',
        width: '100%',
    },
    btn_text: {
        fontSize: 12,
        // lineHeight: 21,
        fontWeight: 'bold',
        // letterSpacing: 0.25,
        color: 'white',
    }

});


export default Competitions