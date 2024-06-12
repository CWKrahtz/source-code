import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import React, { useState } from 'react';

const SingleComp = ({ route, navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [selectionTime, setSelectionTime] = useState(null);

    const items = route.params;

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
});

export default SingleComp;
