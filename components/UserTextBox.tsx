import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";

type Props = {
    onFetchData: (user_email_data: string) => void,
}

export default function UserTextBox ( {onFetchData}: Props ) {
    const [focus, setFocus] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    return (
        <TextInput 
            style = {[styles.TextBoxContainer, {borderColor: focus ? 'yellow' : 'white'}, {color: 'white'}, {outline: 'none'}]}
            onChangeText={(userEmail) => {
                console.log(userEmail);
                setUserEmail(userEmail);
                onFetchData(userEmail);
            }}
            value={userEmail}
            multiline = {false}
            placeholder="Enter your email"
            placeholderTextColor={"grey"}
            onFocus = {() => {
                setFocus(true);
            }}
            onBlur={() => {
                setFocus(false);
            }}
            />
    );
}

const styles = StyleSheet.create({
    TextBoxContainer: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginLeft: 20,
        borderRadius: 4,
        width: 300,
    }
});

