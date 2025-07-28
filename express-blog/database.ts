import dotenv from "dotenv"
import { MongoClient, Collection, ObjectId } from "mongodb";
import bcrypt from "bcrypt"
import { User } from "./interfaces";

dotenv.config();
export const link = process.env.MONGO_URI || "";
const client = new MongoClient(link);
const saltRounds : number = 10;
const userCollection:Collection<User> = client.db("ExpressBlog").collection<User>("users");

export async function getUserById(id: ObjectId):Promise<User> {
    try {
        const user:User | null = await userCollection.findOne({_id : id});
        if (user){
            return user;
        } else {
            throw new Error(`Failed to get user with id ${id} from database`);
        }     
    } catch (error) {
        console.error(error);
    }
    throw new Error(`Failed to get user with id ${id} from database`);
}

async function createInitialUser() {
    if (await userCollection.countDocuments() > 0) {
        return;
    }
    let email : string | undefined = process.env.ADMIN_EMAIL;
    let username : string | undefined = process.env.ADMIN_USERNAME;
    let password : string | undefined = process.env.ADMIN_PASSWORD;
    if (email === undefined || username === undefined || password === undefined) {
        throw new Error("ADMIN_EMAIL, ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env");
    }
    await userCollection.insertOne({
        email: email,
        username: username,
        password: await bcrypt.hash(password, saltRounds),
        role: "ADMIN"
    });
    console.log("🌱👤 Created initial user");
}

export async function createUser(username: string, email: string, password: string) {
    const existingUser = await userCollection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new Error("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await userCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        role: "USER"
    });
    console.log(`🆕👤 New user created: ${username}`);
}

export async function login(email: string, password: string) {
    if (email === "" || password === "") {
        throw new Error("Email and password required");
    }
    let user : User | null = await userCollection.findOne<User>({email: email});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            console.log(`🙋 Logged in as : \x1b[32m${user.username}\x1b[0m`);
            return user;
        } else {
            throw new Error("Password incorrect");
        }
    } else {
        throw new Error("User not found");
    }
}

async function exit() {
    try {
        await client.close();
        console.log("\n❌ Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("✅ Connected to database");
        await createInitialUser();
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}