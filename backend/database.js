import { MongoClient, Collection, Db, ObjectId } from 'mongodb'

const uri = "mongodb+srv://knowsomeone:31318862@cluster0.rzger.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri);

const data_storage = "knowsomeone_datastorage";

 //store collection for universal usage

async function listDatabases(param_client) {
    const list_of_databases = await param_client.db().admin().listDatabases();
    console.log("Databases: ");
    list_of_databases.databases.forEach(db => console.log(`${db.name}`));
}

async function connectDatabase() {
    try {
        await client.connect(); //connect to mongDB
        client.db(); //initialize database
        await client.db(data_storage).command({ping: 1}); //connects to created database
        console.log("Successfully connected to Atlas and ur database!");
        await listDatabases(client);

    } catch(err) {
        console.log("Error Occured");
        console.log(err.stack);
    }
}

async function insertData(arg_useremail, arg_userdesc) {
    try {
        const myColl = client.db(data_storage).collection("Users"); //access "Users" collection inside "data_storage database"
        await myColl.insertOne({ //create a document and insert the data into document and save into collection
            user_email: arg_useremail,
            user_desc: arg_userdesc,
        });
    } catch (err) {
        console.log("Error uploading data: ", err);
    }
}

async function getAllID() {
    try {
        //cursor is a "pointer" in mongDB that lets you iterate through it once, it returns the value it points to
        //once cursor is traversed till the end, it would return all its retained value hence it will be empty

        const cursor = await client.db(data_storage).collection("Users").find({ _id: {$type: "objectId"}} );
        const docCount = await client.db(data_storage).collection("Users").countDocuments(); //get count of documents inside the collection
        let arrOfID = [];
        console.log("Count of documents: ", docCount);
        //used a for loop instead of foreach method because I need to execute multiple statement
        for await (const doc of cursor) {
            console.log("Object ID", doc._id.toString());
            arrOfID.push({UserID: doc._id.toString()});
        }
        arrOfID.forEach(item => console.log("UserID: ", item.UserID));

    } catch(err) {
        console.log("Fetch data failed: ", err);
    }
}

async function getParticularUserID(arg_useremail) {
    try {
        const doc = await client.db(data_storage).collection("Users").findOne({user_email: { $eq: arg_useremail }});
        console.log("Data loaded: ", doc.user_email);
        const getUserData = doc;
        return getUserData;
        
    } catch (err) {
        console.log("Error: ", err)
        return null;
    }
}

async function getAllUserData() {
    try {
        //get all docs in coll
        const cursor = await client.db(data_storage).collection("Users").find({});//getting all docs in coll)
        let count_of_data = 1;
        let arr_of_data = [];
        let count = 1;
        for await (const doc of cursor) {
            console.log(`Data ${count}: Email: ${doc.user_email} Desc: ${doc.user_desc}`);
            arr_of_data.push(doc);
            console.log(`Data count: ${count_of_data}`);
            count_of_data ++;
        }
        arr_of_data.forEach(data => console.log(`Email: ${data.user_email} Desc: ${data.user_desc}`));
        return arr_of_data;
    } catch(err) {
        console.log(`Error ${err}`);
    }
}

export { connectDatabase, insertData, getAllID, getParticularUserID, getAllUserData }; //export functions to be used for backend.js