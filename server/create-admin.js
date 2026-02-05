const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function createAdminUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
        
        // Define User schema
        const userSchema = new mongoose.Schema({
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            name: { type: String, required: true },
            role: { type: String, default: "admin" },
            createdAt: { type: Date, default: Date.now }
        });
        
        const User = mongoose.model("User", userSchema);
        
        // Check if admin already exists
        const adminEmail = process.env.ADMIN_EMAIL || "admin@ashariftikhar.com";
        const existingUser = await User.findOne({ email: adminEmail });
        
        if (existingUser) {
            console.log("👤 Admin user already exists:", adminEmail);
            console.log("To reset password, delete the user and restart server");
        } else {
            // Create admin user
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin123!", 10);
            await User.create({
                email: adminEmail,
                password: hashedPassword,
                name: "Ashar Iftikhar",
                role: "admin"
            });
            console.log("✅ Admin user created successfully!");
            console.log("Email:", adminEmail);
            console.log("Password:", process.env.ADMIN_PASSWORD || "Admin123!");
        }
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating admin user:", error.message);
        process.exit(1);
    }
}

createAdminUser();
