import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem("@onboardingStatus");
      if (onboardingStatus !== null && onboardingStatus === "done") {
        navigation.replace("Login");
      }
    } catch (error) {
      console.log("Error checking onboarding status:", error);
    }
  };

  const DoneBtn = () => {
    const handleDone = async () => {
      try {
        await AsyncStorage.setItem("@onboardingStatus", "done");
        navigation.navigate("Login");
      } catch (error) {
        console.log("Error saving onboarding status:", error);
      }
    };

    return (
      <TouchableOpacity style={{ padding: 10 }} onPress={handleDone}>
        <Text style={{ fontSize: 18, color: "white" }}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onSkip={() => navigation.replace("Login")}
        DoneButtonComponent={DoneBtn}
        containerStyle={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.image}>
                <LottieView
                  source={require("../../assets/1.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "LearnSmart: Your Path to Knowledge",
            subtitle:
              "Empower Yourself with Interactive E-Learning for Personal and Professional Growth",
          },
          {
            backgroundColor: "#f2fa55",
            image: (
              <View style={styles.image}>
                <LottieView
                  source={require("../../assets/3.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "EduVerse: Unleashing Knowledge, Empowering Minds",
            subtitle:
              "Embark on a Journey of Lifelong Learning with Interactive E-Learning Solutions",
          },
          {
            backgroundColor: "#781aeb",
            image: (
              <View style={styles.image}>
                <LottieView
                  source={require("../../assets/2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Knowly: Your Gateway to Boundless Learning",
            subtitle:
              "Discover, Grow, and Excel with Our Engaging E-Learning Platform",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
  },
});
