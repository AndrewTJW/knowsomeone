import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';


type Props = {
    updateUserDesc: (user_desc_data: string) => void,
}

export default function UserDescriptionTextBox( {updateUserDesc}: Props ) {
    const [focus, setFocus] = useState(false);
    const [userDesc, setUserDesc] = useState("")

    return (
        <TextInput 
            style = {[styles.DescTextBoxContainer, {borderColor: focus ? 'yellow' : 'white'}, {color: 'white'}]}
            onChangeText={(userDesc) => {
                setUserDesc(userDesc);
                console.log(userDesc);
                updateUserDesc(userDesc);
            }}
            value = {userDesc}
            multiline = {true}
            placeholder="Your writing goes here..."
            placeholderTextColor={"grey"}
            onFocus = {() => {
                setFocus(true);
            }}
            onBlur={() => {
                setFocus(false);
            }}
            >

        </TextInput>
    );
}

const styles = StyleSheet.create({
    DescTextBoxContainer: {
        height: 400,
        width: 400,
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 20,
        padding: 10,
    }
});