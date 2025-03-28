import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Mailjet from 'node-mailjet';

type Props = {
    fetchedUserEmail: string,
    fetchedUserDesc: string,
}

export default function SubmitButton ( {fetchedUserEmail, fetchedUserDesc}: Props ) {
    const URL = "http://localhost:3000/"
    axios.defaults.withCredentials = true;

    const getRandomIntegerInclusive = (min: number, max: number, exception?: number): number => {
        min = Math.ceil(min)
        max = Math.floor(max)
        let randomnumber;

        do {
            randomnumber = Math.floor(Math.random() * (max - min + 1)) + min
        } while (randomnumber === exception);
        return randomnumber;
    }

    function RandomUserPicker() {
        return axios.get("http://localhost:3000/getalluserdata")
            .then((response) => {
                const arr_user_data = response.data.data;
                let userIndex: number | undefined;

                for (let i = 0; i < arr_user_data.length; i++) {
                    if (arr_user_data[i].user_email === fetchedUserEmail) {
                        userIndex = i; // Prevent selecting the same user
                        break;
                    }
                }

                let randomUserIndex = getRandomIntegerInclusive(0, arr_user_data.length - 1, userIndex);
                console.log(randomUserIndex);
                const selectedUser = arr_user_data[randomUserIndex];

                console.log("Randomly Selected User:", selectedUser);
                return selectedUser; // Return the user data
            })
            .catch((err) => {
                console.error("Error fetching random user:", err);
                return null;
            });
    }

    function submitHandler() {
        console.log("Logging email: ", fetchedUserEmail);
        console.log("Logging description: ", fetchedUserDesc);

        axios.get(URL)
            .then((response) => {
                console.log("Successfully connected Frontend to Backend!");
                if (response.status !== 200) throw new Error("Failed to deliver data!");

                const data_package = { useremail: fetchedUserEmail, userdesc: fetchedUserDesc };
                return axios.post("http://localhost:3000/insertdata", data_package);
            })
            .then(() => {
                console.log("Data passed successfully!");
                return axios.get(`http://localhost:3000/particularuserdata?senduseremail=${fetchedUserEmail}`);
            })
            .then((response) => {
                const userdata = response.data.data;
                console.log("User email:", userdata.user_email);
                console.log("User description:", userdata.user_desc);
                console.log("User ID:", userdata._id);

                return RandomUserPicker().then((selectedUser) => {
                    // Send email
                    return axios.post('http://localhost:3000/sendemail', {
                        userEmail: fetchedUserEmail,
                        userDesc: selectedUser.user_desc,
                    })
                });
            })
            .then((response) => {
                console.log("Email sent successfully!", response.data);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }

    return (
        <TouchableOpacity
            style = {styles.SubmitButton}
            onPress = {submitHandler}>
            <Text 
                style = {[{color: 'white'}, {fontFamily: 'Roboto-Default'}, {fontWeight: 800}]}
                >
                Submit
            </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    SubmitButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'red',
        borderRadius: 3,
    }
});