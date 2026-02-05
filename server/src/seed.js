const mongoose = require('mongoose');
const Project = require('./models/Project');
const Service = require('./models/Service');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Project.deleteMany({});
        await Service.deleteMany({});

        // Add sample projects
        const projects = [
            {
                title: "AI Workflow Automation",
                description: "Built automated AI workflows for e-commerce client, increasing operational efficiency by 300%",
                shortDescription: "AI automation that tripled efficiency",
                image: "/projects/ai-workflow.jpg",
                tags: ["AI", "Automation", "n8n", "E-commerce"],
                technologies: ["n8n", "OpenAI API", "Google Sheets"],
                client: "E-commerce Store",
                timeline: "4 weeks",
                results: "300% efficiency increase",
                featured: true,
                order: 1
            },
            {
                title: "Lead Generation System",
                description: "AI-powered lead generation system that increased qualified leads by 250% for SaaS company",
                shortDescription: "250% increase in qualified leads",
                image: "/projects/lead-gen.jpg",
                tags: ["AI", "Marketing", "Lead Generation"],
                technologies: ["Python", "GPT-4", "HubSpot API"],
                client: "SaaS Startup",
                timeline: "6 weeks",
                results: "250% lead increase",
                featured: true,
                order: 2
            }
        ];

        // Add sample services
        const services = [
            {
                name: "AI Workflow Automation",
                description: "Custom AI automation solutions using n8n, Make.com, and custom APIs to streamline your business processes",
                shortDescription: "Automate repetitive tasks with AI",
                price: "Starting at $999/month",
                features: ["Workflow Design", "API Integration", "24/7 Monitoring", "Monthly Reports"],
                icon: "⚡",
                popular: true,
                order: 1
            },
            {
                name: "Lead Generation Systems",
                description: "AI-powered systems to generate, qualify, and nurture leads automatically",
                shortDescription: "AI-powered lead generation",
                price: "Starting at $799/month",
                features: ["Lead Scoring", "CRM Integration", "Analytics Dashboard", "A/B Testing"],
                icon: "🎯",
                popular: false,
                order: 2
            }
        ];

        await Project.insertMany(projects);
        await Service.insertMany(services);

        console.log('✅ Seed data added successfully!');
        console.log(`📊 Projects: ${projects.length}`);
        console.log(`💼 Services: ${services.length}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();