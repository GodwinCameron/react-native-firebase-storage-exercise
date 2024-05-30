import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../services/BucketService'

const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((posts) => {
            console.log(posts);
            setPosts(posts);
        }).catch((error) => {
            console.error("Error getting posts: ", error);
        }
        );
    }, [])



  return (
    <ScrollView style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Add")}>
            <Text>Add</Text>
        </Pressable>
        
        {/* Card of your images that you need to loop through */}
        <View style={styles.card}>
            <Image
                style={styles.img}
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} />

            <Text>Image Title</Text>
        </View>

        {posts != [] && posts.map((post) => (
            <View key={post.id} style={styles.card}>
                <Image
                    style={styles.img}
                    source={{
                        uri: post.image,
                    }} />

                <Text>{post.title}</Text>
            </View>
        ))
        }

    </ScrollView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    }
})