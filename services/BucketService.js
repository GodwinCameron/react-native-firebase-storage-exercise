import { getDownloadURL, ref, uploadBytes, } from "firebase/storage";
import { db, storage } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const handleImageUpload = async (uri, fileName) => {
    try {

        const blob = await new Promise((reso, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                reso(xhr.response);
                console.log("Blob loaded", xhr.response);
            };
            xhr.onerror = function (e) {
                rej(new TypeError("Network request failed"));
                console.log("Blob error", e);
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });



        const imageRef = ref(storage, fileName);
        await uploadBytes(imageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!', snapshot);
        });


        blob.close();
        const downloadURL = await getDownloadURL(imageRef);
        console.log("Download URL: ", downloadURL);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};

export const createPost = async (title, image) => {
    const memory = {
        title: title,
        image: image,
    };
    try {
        const docRef = await addDoc(collection(db, "memories"), memory);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error creating post: ", error);
        throw error;
    }
};


export const getAllPosts = async () => {
    try {
        const posts = [];
        const postsRef = collection(db, "memories");
        const snapshot = await getDocs(postsRef);
        snapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        return posts;
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
    }
}
