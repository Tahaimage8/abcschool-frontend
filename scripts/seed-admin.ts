import { auth } from "../src/lib/auth";
import { MongoClient } from "mongodb";

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI environment variable is not defined in .env");
    process.exit(1);
  }

  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@abcschool.com";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "AdminPass123!";
  const adminName = process.env.INITIAL_ADMIN_NAME || "System Admin";

  console.log(`🚀 Checking for initial ADMIN user (${adminEmail})...`);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("school");
  const usersCollection = db.collection("user");

  const existingUser = await usersCollection.findOne({ email: adminEmail });

  if (existingUser) {
    if (existingUser.role === "ADMIN") {
      console.log(`✅ User ${adminEmail} already exists with ADMIN role.`);
    } else {
      await usersCollection.updateOne(
        { email: adminEmail },
        { $set: { role: "ADMIN", updatedAt: new Date() } }
      );
      console.log(`🎉 Promoted existing user ${adminEmail} to ADMIN role.`);
    }
  } else {
    try {
      await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: adminName,
        },
        headers: new Headers(),
      });

      // Force role assignment in database
      await usersCollection.updateOne(
        { email: adminEmail },
        { $set: { role: "ADMIN", updatedAt: new Date() } }
      );

      console.log(`🎉 Successfully created initial ADMIN user!`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Role: ADMIN`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("❌ Failed to create initial admin user:", errorMsg);
    }
  }

  await client.close();
}

seedAdmin().catch((err) => {
  console.error("Fatal seed script error:", err);
  process.exit(1);
});
