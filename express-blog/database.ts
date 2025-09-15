import dotenv from "dotenv"
import { MongoClient, Collection, ObjectId } from "mongodb";
import bcrypt from "bcrypt"
import { User } from "./interfaces";
import fs from "fs";
import path from "path";

dotenv.config();
export const link = process.env.MONGO_URI || "";
const client = new MongoClient(link);
const saltRounds : number = 10;
const userCollection:Collection<User> = client.db("ExpressBlog").collection<User>("users");

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_DEV = NODE_ENV === "development";
const SEED_FAKE_DATA = IS_DEV && process.env.SEED_FAKE_DATA === "true";

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
        role: "ADMIN",
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

const usersJsonPath = path.join(process.cwd(), "public", "data", "users.json");

function ensureJsonDir() {
  const dir = path.dirname(usersJsonPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function saveFakeUsersToFile(fakeUsers: User[]) {
  ensureJsonDir();
  if (!fs.existsSync(usersJsonPath)) {
    fs.writeFileSync(usersJsonPath, JSON.stringify(fakeUsers, null, 2));
    console.log(`📁 Saved fake users to ${usersJsonPath}`);
  }
}

async function seedFakeUsers() {
  console.log("🌱 Seeding fake users...");
  const res = await fetch("https://randomuser.me/api/?results=10&nat=us,gb,ca,au");
  const data = await res.json();

  const fakeUsers: User[] = await Promise.all(
    data.results.map(async (u: any) => ({
      email: u.email,
      username: u.login.username,
      password: await bcrypt.hash("password123", saltRounds),
      role: "FAKE_USER",
      profileImage: u.picture.large,
      bio: `Hi, I'm ${u.name.first} ${u.name.last} from ${u.location.country}.`,
      profileViews: Math.floor(Math.random() * 500),
    }))
  );

  saveFakeUsersToFile(fakeUsers);
  await userCollection.insertMany(fakeUsers);
  console.log(`✅ Inserted ${fakeUsers.length} fake users into DB`);
}

async function deleteFakeUsers() {
  console.log("🗑️  Removing all FAKE_USER accounts...");
  const result = await userCollection.deleteMany({ role: "FAKE_USER" });
  console.log(`❌ Removed ${result.deletedCount} fake users from DB`);

  // Remove the JSON file if it exists
  if (fs.existsSync(usersJsonPath)) {
    fs.unlinkSync(usersJsonPath);
    console.log(`🗑️ Deleted ${usersJsonPath}`);
  }
}

async function seedFakeData() {
  if (SEED_FAKE_DATA) {
    const fakeUserCount = await userCollection.countDocuments({ role: "FAKE_USER" });
    if (fakeUserCount === 0) {
      console.log("No fake users found. Seeding now...");
      await seedFakeUsers();
    } else {
      console.log(`Found ${fakeUserCount} fake users — skipping seeding.`);
    }
  } else {
    const fakeUserCount = await userCollection.countDocuments({ role: "FAKE_USER" });
    if (fakeUserCount > 0) {
      await deleteFakeUsers();
    } else {
      if (IS_DEV) console.log("No fake users to delete.");
    }
  }
}

export async function connect() {
    try {
        await client.connect();
        if (IS_DEV) console.log("✅ Connected to database");
        await createInitialUser();
        await seedFakeData();
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}