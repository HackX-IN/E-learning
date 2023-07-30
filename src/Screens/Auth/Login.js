import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
      if (user) {
        navigation.navigate("MyTabs");
      }
    });
    return subscriber;
  }, [navigation]);

  const handlesubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password).then((res) => {
          console.log("Signed in", res._tokenResponse);
        });
        navigation.replace("MyTabs");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="p-10">
        <Text className="text-3xl font-semibold" style={{ color: "#1a4c6e" }}>
          Log in
        </Text>
        <View className="mt-16 ">
          <View className="flex-row">
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
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              textAlign: "right",
              margin: 8,
            }}
          >
            Forgot password ?
          </Text>
          <TouchableOpacity
            className=" w-90 justify-center items-center p-4 mt-8 rounded-2xl "
            style={{ backgroundColor: "#1a4c6e" }}
            onPress={handlesubmit}
          >
            <Text className="text-xl text-white font-semibold ">Log In</Text>
          </TouchableOpacity>
        </View>
        <View className="p-10 mt-2">
          <Text
            className="text-lg text-gray-500 font-medium"
            style={{ textAlign: "center" }}
          >
            Or
          </Text>
          <View className="flex-row justify-center items-center mt-4 ">
            <TouchableOpacity
              style={{
                borderWidth: 1.2,
                borderColor: "#1a4c6e",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Ionicons name="logo-google" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1.2,
                borderColor: "#1a4c6e",
                padding: 5,
                borderRadius: 10,
                marginLeft: 28,
              }}
            >
              <Ionicons name="logo-apple" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="mt-10 text-md items-center">
              Don't have an Account ?
              <Text className="text-lg text-cyan-500 "> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
