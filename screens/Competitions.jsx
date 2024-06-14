import { StyleSheet, View, Text, SafeAreaView, Pressable, ImageBackground, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getMyCompList } from '../services/DbServices';
import { auth } from '../firebase';

function Competitions({ navigation }) {

    const [compItems, setCompItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
                console.log(compItems);
            };
        }, [])
    );

    const handleGettingOfData = async () => {
        setIsLoading(true);
        var allData = await getMyCompList();
        console.log("CompScreen Log: " + allData);
        console.log("Auth Log: " + JSON.stringify(auth.currentUser));
        setCompItems(allData || []);  // Ensure compItems is an array
        setIsLoading(false);
    };

    const handleCompetitionPress = (item) => {
        const endTime = new Date(item.endTime);
        const now = new Date();

        if (now >= endTime) {
            Alert.alert('Competition Ended', 'The competition has ended!', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Leaderboard');
                    }
                }
            ]);
        } else {
            navigation.navigate('Details', { item });
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            {isLoading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.header}>Competitions</Text>
                    <Text style={styles.subhead}>Select competition to compete in</Text>
                    <Pressable style={styles.btn} onPress={() => navigation.navigate("CreateComp")}>
                        <Text style={styles.btn_text}>Create new Competition</Text>
                    </Pressable>
                    <ScrollView style={styles.scroll}>
                        {compItems && compItems.length > 0 ? (
                            compItems.map((item, index) => (
                                <ImageBackground style={styles.card} resizeMode="cover" key={index}>
                                    <View style={styles.shadow}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.description}>{item.desc}</Text>
                                        <Pressable
                                            style={styles.btn}
                                            onPress={() => handleCompetitionPress(item)}
                                        >
                                            <Text style={styles.btn_text}>Enter</Text>
                                        </Pressable>
                                    </View>
                                </ImageBackground>
                            ))
                        ) : (
                            <Text style={styles.noCompText}>No Competitions Found</Text>
                        )}
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000032',
    },
    container: {
        flex: 1,
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
        flex: 1,
        paddingVertical: 10
    },
    shadow: {
        backgroundColor: '#212B5B80',
        borderRadius: 10,
        padding: 15
    },
    card: {
        backgroundColor: '#212B5B',
        borderRadius: 10,
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
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#2D4095',
        width: '100%',
    },
    btn_text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    noCompText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default Competitions;