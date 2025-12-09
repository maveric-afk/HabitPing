const Brevo = require('@getbrevo/brevo');
const userModel = require('../models/user');
const taskModel = require('../models/task');
const { handleMarkTaskDelay } = require('./task');
const admin = require("firebase-admin");
const { getMessaging } = require('firebase-admin/messaging');
const dotenv= require('dotenv');

dotenv.config();

const serviceAccount = {
    type:process.env.FIREBASE_TYPE,
    project_id:process.env.FIREBASE_PROJECT_ID,
    private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email:process.env.FIREBASE_CLIENT_EMAIL,
    client_id:process.env.FIREBASE_CLIENT_ID,
    auth_uri:process.env.FIREBASE_AUTH_URI,
    token_uri:process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER,
    client_x509_cert_url:process.env.FIREBASE_CLIENT_URL,
    universe_domain:process.env.FIREBASE_UNIVERSE_DOMAIN
}



const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendmail = async (to, sub, msg) => {
    try {
        const sendSmtpMail = {
            sender: { email: 'guptachirag965@gmail.com', name: "HabitPing" },
            to: [{ email: to }],
            subject: sub,
            htmlContent: msg
        }
        const data = await apiInstance.sendTransacEmail(sendSmtpMail);
        console.log('Email sent: ', data.messageId || data)
    } catch (error) {
        console.error('Email failed', error)
    }
}

async function handleSendInitialReminder(taskId, userId) {
    const taskData = await taskModel.find({ _id: taskId })
    const userData = await userModel.find({ _id: userId })

    sendmail(userData[0].Email, 'It"s Time for Your HabitPing Task ✨',
        `
         <h2>Hi ${userData[0].NickName}</h2>
        <p>This is a friendly reminder from HabitPing that the scheduled start time for your task has arrived.</p>
        <h3>Task: ${taskData[0].Title}</h3>
        <h4>${taskData[0].Description}</h4><br>
        <p>We know staying consistent can be tough, but small steps every day create big changes.
        You"ve got this — and we"re here to help you stay on track! 💪</p><br>
        <p>If you"ve already completed it, feel free to mark it as done in the app.</p><br>
        <p>Wishing you a productive day,</p>
        <h4>Team HabitPing</h4>
        `)

}

async function handleSendfinalReminder(taskId, userId) {
    const taskData = await taskModel.find({ _id: taskId })
    const userData = await userModel.find({ _id: userId })

    sendmail(userData[0].Email, 'You Missed a HabitPing Deadline ⏳',
        `
         <h2>Hi ${userData[0].NickName}</h2>
        <p>It looks like the scheduled end time for your task has passed.</p>
        <h3>Task: ${taskData[0].Title}</h3>
        <h4>${taskData[0].Description}</h4><br>
        <p>Since the task wasn"t completed in time, 2 points have been deducted from your HabitPing score.
        Don"t worry — setbacks happen. What matters is getting back on track, and you can still complete your next habits on time to regain momentum. 🌱</p><br>
        <p>If you"ve already completed it, feel free to mark it as done in the app.</p><br>
        <p>Keep going — every small effort counts.</p>
        <h4>Team HabitPing</h4>
        `)

}

if(!admin.apps.length){
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
}

async function handleInitialPushNotification(taskId, userId) {
    console.log('initial push notification sent')
    const userData = await userModel.find({ _id: userId });
    const taskData = await taskModel.find({ _id: taskId });

    const tokens = userData[0].FcmTokens;
    if (!tokens || tokens.length == 0) return;

    const messaging = getMessaging();
    await messaging.sendEachForMulticast({
        tokens,
        notification: {
            title: "HabitPing",
            body: `Time for your task: ${taskData[0].Title}`,
        },
    });
}

async function handleFinalPushNotification(taskId, userId) {
    console.log('Final push notification sent')
    const userData = await userModel.find({ _id: userId });
    const taskData = await taskModel.find({ _id: taskId });

    const tokens = userData[0].FcmTokens;
    if (!tokens || tokens.length == 0) return;

   await handleMarkTaskDelay(taskId, userId);
    const messaging = getMessaging();
    await messaging.sendEachForMulticast({
        tokens,
        notification: {
            title: "HabitPing",
            body: `You missed it and lost 2 points: ${taskData[0].Title}`,
        },
    });
}

module.exports = { handleSendInitialReminder, handleSendfinalReminder, handleInitialPushNotification, handleFinalPushNotification }