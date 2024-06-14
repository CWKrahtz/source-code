import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { auth, db } from '../firebase';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore'; // Ensure you import getDoc

const LeaderboardScreen = ({ route }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const competitionId = route.params.item.id;
    console.log("compId :", route.params.item.id)

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const competitionDocRef = doc(db, 'competitions', competitionId); // Correct usage of doc
                const completionTimestampsRef = collection(competitionDocRef, 'completedTimestamps');
                const snapshot = await getDocs(completionTimestampsRef);

                const dataPromises = snapshot.docs.map(async docSnapshot => { // Renamed to avoid conflict
                    const userData = docSnapshot.data();
                    const userDocRef = doc(db, 'users', userData.userId);
                    const userDoc = await getDoc(userDocRef);
                    return {
                        id: docSnapshot.id,
                        timestamp: userData.timestamp,
                        userId: userData.userId,
                        userName: userDoc.exists() ? userDoc.data().fullName : "Unknown"
                    };
                });

                const data = await Promise.all(dataPromises);
                data.sort((a, b) => a.timestamp - b.timestamp);
                setLeaderboardData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
                Alert.alert('Failed to fetch leaderboard data.');
                setIsLoading(false);
            }
        };

        fetchLeaderboardData();
    }, [competitionId]);

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loading]}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.heading}>Leaderboard</Text>
                {leaderboardData.map((entry, index) => (
                    <View key={entry.id} style={styles.entry}>
                        <Text style={styles.position}>{index + 1}</Text>
                        <Text style={styles.details}>User: {entry.userName}</Text>
                        <Text style={styles.details}>Timestamp: {entry.timestamp.toDate().toLocaleString()}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000032',
    },
    body: {
        paddingHorizontal: 24
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    position: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    details: {
        color: 'white',
        fontSize: 14,
    },
});

export default LeaderboardScreen;