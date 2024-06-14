import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert } from 'react-native';
import { auth } from '../firebase'; // Replace with your Firebase authentication hook or context
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have initialized and exported your Firestore instance

const SingleComp = ({ route, navigation }) => {
    const user = auth; // Custom hook to get current user, replace as per your implementation
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [selectionTime, setSelectionTime] = useState(null);

    const items = route.params.item;
    console.log("Current User", user.currentUser.email)

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
            ? option === items.answer ? styles.correct : styles.incorrect
            : styles.incorrect;
    };

    const handleFinishCompetition = async () => {
        if (!isSelected) {
            Alert.alert('Please select an option before finishing.');
            return;
        }

        try {
            const userDocRef = doc(db, 'users', user.uid); // Assuming 'users' is your collection of users
            const userSnapshot = await userDocRef.get();
            if (!userSnapshot.exists()) {
                throw new Error('User document does not exist.');
            }

            const userData = userSnapshot.data();
            const { completedCompetitions } = userData;

            if (!completedCompetitions || !Array.isArray(completedCompetitions)) {
                throw new Error('Invalid data structure for completed competitions.');
            }

            if (completedCompetitions.includes(items.id)) {
                Alert.alert('You have already completed this competition.');
                return;
            }

            // Update user document to mark competition as completed
            await updateDoc(userDocRef, {
                completedCompetitions: [...completedCompetitions, items.id]
            });

            // Create a subcollection under the user document to store completion details
            const userCompetitionRef = collection(userDocRef, 'completedCompetitions');
            await addDoc(userCompetitionRef, {
                competitionId: items.id,
                selectedOption,
                isCorrect: selectedOption === items.answer,
                timestamp: serverTimestamp()
            });

            Alert.alert('Competition completed successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error completing competition: ', error);
            Alert.alert('Failed to complete competition.');
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            {!items.isCompleted ? (
                <View style={styles.container}>
                    <Text style={styles.header}>{items.title}</Text>
                    <Text style={styles.subhead}>{items.description}</Text>
                    <Text style={styles.question}>{items.question}</Text>

                    {items.options.map((option, index) => (
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
                            {selectedOption === items.answer ? 'Correct!' : 'Incorrect!'} 
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