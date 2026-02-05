// Quick test script to check dashboard data
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/dashboard',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer test',
        'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('\n📊 DASHBOARD RESPONSE:');
        console.log('='.repeat(50));
        const parsed = JSON.parse(data);
        console.log(JSON.stringify(parsed, null, 2));
        console.log('='.repeat(50));

        if (parsed.data && parsed.data.stats) {
            console.log('\n📈 STATS SUMMARY:');
            console.log('  Projects:', parsed.data.stats.totalProjects);
            console.log('  Services:', parsed.data.stats.totalServices);
            console.log('  Messages:', parsed.data.stats.totalMessages);
            console.log('  Blog Posts:', parsed.data.stats.totalBlogPosts);
            console.log('  Testimonials:', parsed.data.stats.totalTestimonials);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.end();
