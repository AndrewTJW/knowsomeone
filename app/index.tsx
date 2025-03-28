import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { useState } from 'react';


import UserTextBox from "@/components/UserTextBox";
import UserDescriptionTextBox from "@/components/UserDescriptionTextBox";
import SubmitButton from "@/components/SubmitButton";

export default function Index() {
  const [defaultFont] = useFonts({
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf"),
    "Roboto-Default": require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf")
});

  const [fetchedUserEmail, setUserEmail] = useState("");
  const [fetchedUserDesc, setUserDesc] = useState("");

  const getEmail = (user_email_data: string) => {
    console.log("fetched email data from children component: ", user_email_data);
    setUserEmail(user_email_data);
  }

  const getUserDesc = (user_desc_data: string) => {
    console.log("fetched user desc from children component: ", user_desc_data);
    setUserDesc(user_desc_data);
  }

  console.log("test email: " ,fetchedUserEmail);
  console.log("test desc: ", fetchedUserDesc);

  return (
    <View style = {styles.MainContainer}>
      <ScrollView 
        contentContainerStyle = {styles.ScrollViewContainer}
        showsVerticalScrollIndicator = {false}
        >
        <View style = {styles.TopContainer}>
          <Text style = {[styles.GeneralFontStyles, styles.MainTitleFont]}>knowsomeone</Text>
        </View>

        <View style = {styles.MiddleContainer}>
          <View>
            <Text style = {styles.GeneralFontStyles}>Email: </Text>
          </View>
          <View>
            <UserTextBox onFetchData = {getEmail}/>
          </View>
        </View>

        <View style = {[styles.BottomContainer, {alignItems: 'flex-start'}]}>
          <View>
            <Text style = {styles.GeneralFontStyles}>Write something about yourself: </Text>
          </View>
          <View>
            <UserDescriptionTextBox updateUserDesc={getUserDesc}/>
          </View>
        </View>
        <View style = {styles.SubmitBtnContainer}>
            <SubmitButton fetchedUserEmail = {fetchedUserEmail} fetchedUserDesc = {fetchedUserDesc}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollViewContainer: {
    width: '100%',
    flexGrow: 1,
  },
  GeneralFontStyles: {
    color: "white",
    fontFamily: 'Roboto-Default',
    fontWeight: 500,
    fontSize: 16
  },
  MainTitleFont: {
    fontFamily: 'Roboto-Italic',
    fontWeight: 800,
    fontSize: 100,
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#101111',
    color: "white",
  },
  TopContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    marginBottom: 100,
  },
  MiddleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 100,
  },
  BottomContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 100,
  },
  SubmitBtnContainer: {
    flex: 1,
    display: 'flex',
    width: 200,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});