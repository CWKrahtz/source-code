import { View, Text, TextInput, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirebaseApp } from '../firebase'; // Make sure this file correctly initializes your Firebase app
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import Input from '../components/Input';

const app = getFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

function CreateCompetitionScreen ({ navigation }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [answer, setAnswer] = useState('');

    const handleCreateCompetition = async () => {
        const timestamp = new Date().toLocaleString();
        const competition = {
            title,
            desc,
            question,
            options: [option1, option2, option3],
            answer,
            isCompleted: false,
            timestamp
        };

        try {
            await addDoc(collection(db, 'competitions'), competition); // Add competition to Firestore
            alert('Competition created successfully!');
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            console.error('Error creating competition: ', error);
            alert('Error creating competition');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Create Competition</Text>
            <ScrollView style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <Input
                    placeholder="Title"
                    onInputChanged={setTitle}
                    value={title}
                    style={styles.input}
                />
                <Text style={styles.label}>Description</Text>
                <Input
                    placeholder="Description"
                    onInputChanged={setDesc}
                    value={desc}
                    style={styles.input}
                />
                <Text style={styles.label}>Question</Text>
                <Input
                    placeholder="Question"
                    onInputChanged={setQuestion}
                    value={question}
                    style={styles.input}
                />
                <Text style={styles.label}>Answer One</Text>
                <Input
                    placeholder="Option 1"
                    onInputChanged={setOption1}
                    value={option1}
                    style={styles.input}
                />
                <Text style={styles.label}>Answer Two</Text>
                <Input
                    placeholder="Option 2"
                    onInputChanged={setOption2}
                    value={option2}
                    style={styles.input}
                />
                <Text style={styles.label}>Answer Three</Text>
                <Input
                    placeholder="Option 3"
                    onInputChanged={setOption3}
                    value={option3}
                    style={styles.input}
                />
                <Text style={styles.label}>Correct Answer</Text>
                <Input
                    placeholder="Answer"
                    onInputChanged={setAnswer}
                    value={answer}
                    style={styles.input}
                />
            </ScrollView>
            <Pressable onPress={handleCreateCompetition} style={styles.btn} >
                <Text style={styles.btn_text}>Create Competition</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#000032',
    },
    header: {
        marginTop: 15, 
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    },
    form: {
        marginBottom: 16,
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
    label: {
        marginTop: 10,
        color: 'white',
        fontSize: 14,
        fontWeight: '200'
    },
});

export default CreateCompetitionScreen;
