import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView, Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming db is correctly initialized

const CreateCompetitionScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [answer, setAnswer] = useState('');
    const [endTime, setEndTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleCreateCompetition = async () => {
        const timestamp = new Date().toLocaleString();
        const competition = {
            title,
            desc,
            question,
            options: [option1, option2, option3],
            answer,
            isCompleted: false,
            timestamp,
            endTime: selectedDateTime // Use selectedDateTime here
        };

        try {
            await addDoc(collection(db, 'competitions'), competition);
            alert('Competition created successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error creating competition: ', error);
            alert('Error creating competition');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endTime;
        setShowDatePicker(false);
        setEndTime(currentDate);
        setSelectedDateTime(currentDate.toISOString());
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || endTime;
        setShowTimePicker(false);
        setEndTime(currentTime);
        setSelectedDateTime(currentTime.toISOString());
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
                <View style={styles.dateTimeContainer}>
                    <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
                    <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
                </View>
                <Text style={[styles.label, { color: 'white', marginTop: 10 }]}>
                    Selected Date and Time:
                </Text>
                <Text style={[styles.input, { color: 'white' }]}>
                    {selectedDateTime ? new Date(selectedDateTime).toLocaleString() : ''}
                </Text>

                {/* Date Picker Modal */}
                {showDatePicker && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showDatePicker}
                        onRequestClose={() => setShowDatePicker(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                                <DateTimePicker
                                    value={endTime}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                                <Pressable onPress={() => setShowDatePicker(false)}>
                                    <Text style={styles.btn_text}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                )}

                {/* Time Picker Modal */}
                {showTimePicker && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showTimePicker}
                        onRequestClose={() => setShowTimePicker(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    display="default"
                                    onChange={handleTimeChange}
                                />
                                <Pressable onPress={() => setShowTimePicker(false)}>
                                    <Text style={styles.btn_text}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                )}

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
    input: {
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 16,
        paddingVertical: 10,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
});

export default CreateCompetitionScreen;