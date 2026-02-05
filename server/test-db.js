const mongoose = require("mongoose");
require("dotenv").config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
        
        // Check if User collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const hasUsers = collections.some(c => c.name === "users");
        console.log("📊 Users collection exists:", hasUsers);
        
        if (hasUsers) {
            const User = mongoose.model("User", new mongoose.Schema({}));
            const users = await User.find();
            console.log("👤 Total users:", users.length);
            console.log("User emails:", users.map(u => u.email));
        }
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

test();
