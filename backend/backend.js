import { connectDatabase, insertData, getAllID, getParticularUserID, getAllUserData} from './database.js';
import express from 'express'
import cors from 'cors'
import Mailjet from 'node-mailjet'

const app = express();
const port = 3000;

//enables CORS [Cross Origin Resource Sharing]
app.use(cors({
    "origin": "https://knowsomeone-gfy6q7tvn-andrews-projects-48fa8a40.vercel.app",
    "credentials": true,
}));

//act as a middleware
app.use(express.json());

//connect to mailjet
const mailjet = Mailjet.apiConnect(
    '29bac38109ca41be09196c724546cc7a', 
    '2925179c26ea011119313aa3c6fa15b0'
)

//mailjet api calls
app.post('/sendemail', async (req,res) => {
    try {
        const { userEmail, userDesc } = req.body;

        const result = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: { Email: 'andrewtjw26@gmail.com' },
                    To: [{ Email: userEmail}],
                    Subject: 'You know someone!',
                    TextPart: userDesc,
                }
            ],
        });
        res.json({ message: "Email sent successfully!", result: result.body });
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({ error: "Failed to send email" });
    }
})

//test backend connection
app.get('/', (req, res) => {
    console.log("Expressjs says Hello!");
    res.send("Hello World");
});

app.get('/connect', (req, res) => {
    try {
        connectDatabase();
        res.send("Connection to database is successfull!")
    } catch (err) {
        res.send("Failed to connect to database. Error: ", err)
    }
});


//post method for http
app.post('/insertdata', async (req, res) => {
    console.log("POST request received at /insertdata");
    const { useremail, userdesc } = req.body;
    try {
        console.log("Data passed: ", req.body);
        console.log("User email: ", req.body.useremail);
        console.log("User description: ", req.body.userdesc);
        await insertData(useremail, userdesc);
        res.status(200).send("Data saved successfully");
    } catch (err) {
        console.log("Error uploading data: ", err);
        res.status(500).send("POST failed!");
    }
})

app.get('/getdata', async (req, res) => {
    try {
        await getAllID();
        res.status(200).json({message: "All good"})
    } catch(err) {
        res.status(500).json({message: "Error occurred", err})
    }
})

app.get('/particularuserdata', async (req, res) => {
    try {
        const getUserEmail = req.query.senduseremail;
        const scf_userdata = await getParticularUserID(getUserEmail);
        console.log("User email", scf_userdata.user_email);
        console.log("User desc: ", scf_userdata.user_desc);
        console.log("User ID: ", scf_userdata._id);
        res.status(200).send({ data: scf_userdata });
    } catch (err) {
        console.log("Failed to fetch particular user data: ", err);
        res.status(500).send("Failed to get particular user data!");
    }
})

app.get('/getalluserdata', async (req, res) => {
    try {
        const userData = await getAllUserData();
        res.status(200).json({data: userData});
    } catch (err) {
        res.status(500).json({message: "Error occured", err});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
