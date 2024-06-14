import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert } from 'react-native';
import { auth, db } from '../firebase'; // Replace with your Firebase imports
import { addDoc, collection, doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';

const SingleComp = ({ route, navigation }) => {
    const user = auth.currentUser; // Get current user, replace as per your implementation
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [selectionTime, setSelectionTime] = useState(null);

    const { item } = route.params;
    const competitionId = item.id;

    console.log("User id: ", user.uid)
    console.log("Comp id: ", competitionId)

    const handleOptionPress = (option) => {
        if (!isSelected) {
            setSelectedOption(option);
            setIsSelected(true);
            setSelectionTime(new Date().toLocaleString());
        }
    };

    const getButtonStyle = (option) => {
        if (!isSelected) {
            return styles.btn;
        }
        return selectedOption === option
            ? option === item.answer ? styles.correct : styles.incorrect
            : styles.incorrect;
    };


    const handleFinishCompetition = async () => {
        if (!isSelected) {
            Alert.alert('Please select an option before finishing.');
            return;
        }

        try {
            // Ensure the user is authenticated
            if (!user) {
                throw new Error('User not authenticated.');
            }

            const userDocRef = doc(db, 'users', user.uid); // Reference to user document
            const userSnapshot = await getDoc(userDocRef); // Use getDoc to fetch the document

            if (!userSnapshot.exists()) {
                throw new Error('User document not found.');
            }

            const userData = userSnapshot.data();
            const { completedCompetitions = [] } = userData; // Ensure it's always an array

            if (completedCompetitions.includes(competitionId)) {
                Alert.alert('You have already completed this competition.');
                return;
            }

            // Update user document to mark competition as completed
            await updateDoc(userDocRef, {
                completedCompetitions: [...completedCompetitions, competitionId]
            });

            // Reference to competition document
            const competitionDocRef = doc(db, 'competitions', competitionId);

            // Subcollection reference for storing completion timestamps
            const completionTimestampsRef = collection(competitionDocRef, 'completedTimestamps');

            // Add completion timestamp to subcollection
            await addDoc(completionTimestampsRef, {
                userId: user.uid,
                timestamp: serverTimestamp()
            });

            Alert.alert('Competition completed successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error completing competition:', error.message);
            Alert.alert('Failed to complete competition.');
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            {!item.isCompleted ? (
                <View style={styles.container}>
                    <Text style={styles.header}>{item.title}</Text>
                    <Text style={styles.subhead}>{item.description}</Text>
                    <Text style={styles.question}>{item.question}</Text>

                    {item.options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={getButtonStyle(option)}
                            onPress={() => handleOptionPress(option)}
                            disabled={isSelected} // Disable once an option is selected
                        >
                            <Text style={styles.btn_text}>{option}</Text>
                        </Pressable>
                    ))}

                    {isSelected && (
                        <Text style={styles.resultText}>
                            {selectedOption === item.answer ? 'Correct!' : 'Incorrect!'}
                            {'\n'}
                            Selected at: {selectionTime}
                        </Text>
                    )}

                    <Pressable style={styles.finishBtn} onPress={handleFinishCompetition}>
                        <Text style={styles.btn_text}>Finish Competition</Text>
                    </Pressable>
                </View>
            ) : (
                <Text>Hello</Text>
            )}
        </SafeAreaView>
    );
};

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
        color: 'white',
    },
    subhead: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white',
        marginBottom: 15,
    },
    question: {
        color: 'white',
        marginBottom: 25,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#2D4095',
        width: '100%',
        marginBottom: 10,
    },
    btn_text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    correct: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'green',
        width: '100%',
        marginBottom: 10,
    },
    incorrect: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'red',
        width: '100%',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
    finishBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#2D4095',
        width: '100%',
        marginTop: 20,
    },
});

export default SingleComp;