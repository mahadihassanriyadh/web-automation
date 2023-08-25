const { Worker } = require("bullmq");

const sendEmail = (ms) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const worker = new Worker("email-queue", async (job) => {
    console.log("Job received", job.id, job.name, job.data);

    // send email
    console.log(`sending email to ${job.data.email}`);

    await sendEmail(5000);
    console.log("Email sent");
});
