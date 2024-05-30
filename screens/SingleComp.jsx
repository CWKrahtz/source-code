import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const SingleComp = ({ route, navigation }) => {

    console.log(route.params)
    const items = route.params

    return (
        <SafeAreaView>
            <View>

                {!items.isCompleted ? (
                    <View>
                        <Text>{items.title}</Text>
                        <Text>{items.description}</Text>
                        <Text>{Date(items.due)}</Text>
                    </View>
                ) : (
                    <Text>Hello</Text>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});

export default SingleComp