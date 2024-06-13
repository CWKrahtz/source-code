import { StyleSheet, View, Text, SafeAreaView, Pressable, ImageBackground, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { getMyCompList } from '../services/DbServices';
import { auth } from '../firebase';

// const image = [
//     require('../assets/test_images/java.png'),
//     require('../assets/test_images/html-5.png'),
// ]

function Competitions({ navigation }) {

    const [compItems, setCompItems] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            handleGettingOfData()
            return () => {
                console.log(compItems);
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                //DO NOTHING
            };
        }, [])
    );

    const handleGettingOfData = async () => {
        var allData = await getMyCompList();
        console.log("CompScreen Log: " + allData)
        console.log("Auth Log: " + JSON.stringify(auth.currentUser))
        setCompItems(allData);
    }

    return (
        <SafeAreaView style={styles.background}>
            {compItems != [] ? (
                <View style={styles.container}>
                    <Text style={styles.header}>Competitions</Text>
                    <Text style={styles.subhead}>Select competition to compete in</Text>
                    <Pressable style={styles.btn} onPress={() => navigation.navigate("CreateComp")}>
                        <Text style={styles.btn_text}>Create new Competition</Text>
                    </Pressable>
                    <ScrollView style={styles.scroll}>
                        {/* Loop through possible compititions */}
                        {compItems.map((item, index) => (
                            <ImageBackground style={styles.card} resizeMode="cover" key={index}>
                                <View style={styles.shadow}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>
                                        {item.desc}
                                    </Text>
                                    <Pressable style={styles.btn} key={index} data={this.item} onPress={() => navigation.navigate("Details", item)}>
                                        <Text style={styles.btn_text}>Enter</Text>
                                    </Pressable>
                                </View>
                            </ImageBackground>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <Text>No Competitions Found</Text>
            )}
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
        color: 'white',
        marginBottom: 15
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
        // padding: 15,
        marginBottom: 15
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