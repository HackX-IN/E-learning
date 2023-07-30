import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseConfig from "../../config/Firebase"; // Import your Firebase config from a separate file

const Register = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authInstance = getAuth(firebaseConfig);
  const db = getFirestore(firebaseConfig);
  const storage = getStorage(firebaseConfig);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handlesubmit = async () => {
    if (name && email && password) {
      try {
        // Create the user account with email and password
        const userCredential = await createUserWithEmailAndPassword(
          authInstance,
          email,
          password
        );

        const user = userCredential.user;
        const uid = user.uid;

        // Upload the image to Firebase Storage
        let downloadUrl = null;
        if (image) {
          const response = await fetch(image);
          const blob = await response.blob();
          const storageRef = ref(storage, `user-profiles/${uid}/profile-image`);

          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Handle progress, if needed
            },
            (error) => {
              console.log(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              downloadUrl = downloadURL;

              // Update user's display name (optional)
              await updateProfile(authInstance.currentUser, {
                displayName: name,
              });

              // Store the user data in Firestore
              await setDoc(doc(db, "users", uid), {
                name: name,
                email: email,
                profileImage: downloadUrl || null,
              });

              console.log("Account created successfully");
            }
          );
        } else {
          // Update user's display name (optional)
          await updateProfile(authInstance.currentUser, {
            displayName: name,
          });

          await setDoc(doc(db, "users", uid), {
            name: name,
            email: email,
          });

          console.log("Account created successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="p-10">
        <Text className="text-3xl font-semibold" style={{ color: "#1a4c6e" }}>
          Sign up
        </Text>
        <View className="mt-8 ">
          <View className="flex-row">
            <Ionicons name="person" size={20} color="gray" />
            <Text className="text-lg text-gray-400 font-medium ml-2">Name</Text>
          </View>
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Enter your Name"
            className="mt-2 p-5 w-[full] rounded-xl "
            style={{ borderWidth: 1, borderColor: "gray" }}
          />
          <View className="flex-row mt-5">
            <Ionicons name="mail" size={20} color="gray" />
            <Text className="text-lg text-gray-400 font-medium ml-2">
              Email
            </Text>
          </View>
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Enter your email"
            className="mt-2 p-5 w-[full] rounded-xl "
            style={{ borderWidth: 1, borderColor: "gray" }}
          />
          <View className="flex-row mt-5">
            <Ionicons name="lock-closed" size={20} color="gray" />
            <Text className="text-lg text-gray-400 font-medium ml-2">
              Password
            </Text>
          </View>
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="Enter your password"
            className="mt-2 p-5 w-[full] rounded-xl "
            secureTextEntry={true}
            style={{ borderWidth: 1, borderColor: "gray" }}
          />
          <View className="flex-row items-center">
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 8,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/upload.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 25,
                  marginTop: 8,
                }}
              />
            )}
            <TouchableOpacity onPress={pickImage}>
              <Text className="text-lg text-gray-400 mt-3 ml-2">
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className=" w-90 justify-center items-center p-4 mt-6 rounded-2xl"
            style={{ backgroundColor: "#1a4c6e" }}
            onPress={handlesubmit}
          >
            <Text className="text-xl text-white font-semibold ">Register</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-5"
        >
          <Text className="mt-5 text-md items-center">
            Already have an Account ?
            <Text className="text-lg text-cyan-500 "> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
