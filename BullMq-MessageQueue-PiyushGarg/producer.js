const { Queue } = require("bullmq");

const notificationQueue = new Queue("email-queue", {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    },
});

async function sendEmail(email, subject, body) {
    console.log(`Sending email to ${email}`);
    const res = await notificationQueue.add(`Email to ${email} `, { email, subject, body });
    console.log('Job added to queue', res.id);
}

sendEmail("mahadihassanriyadh1@gmail.com", "Hello", "Hello World");