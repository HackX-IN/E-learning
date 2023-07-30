import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../config/Firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Home = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Get the Firestore instance
          const db = getFirestore();

          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setDisplayName(userData.name || "");
            setProfileImage(userData.profileImage || null);
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // const logout = async () => {
  //   await auth.signOut().then(() => console.log("User signed out!"));
  //   navigation.navigate("Login");
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="#000" translucent />
      <View style={{ padding: 10, alignItems: "center" }}>
        {profileImage && (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          {displayName}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
