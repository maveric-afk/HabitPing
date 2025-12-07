const Brevo=require('@getbrevo/brevo');
const userModel = require('../models/user');
const taskModel = require('../models/task');
const { handleMarkTaskDelay } = require('./task');


const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendmail=async(to,sub,msg)=>{
    try {
        const sendSmtpMail={
        sender:{email:'guptachirag965@gmail.com',name:"HabitPing"},
        to:[{email:to}],
        subject:sub,
        htmlContent:msg
    }
    const data=await apiInstance.sendTransacEmail(sendSmtpMail);
    console.log('Email sent: ',data.messageId || data)
    } catch (error) {
        console.error('Email failed',error)
    }
}

async function handleSendInitialReminder(taskId,userId) {
    const taskData=await taskModel.find({_id:taskId})
    const userData=await userModel.find({_id:userId})

    sendmail(userData[0].Email,'It"s Time for Your HabitPing Task ✨',
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

async function handleSendfinalReminder(taskId,userId) {
    const taskData=await taskModel.find({_id:taskId})
    const userData=await userModel.find({_id:userId})

    handleMarkTaskDelay(taskId,userId);
    sendmail(userData[0].Email,'You Missed a HabitPing Deadline ⏳',
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

module.exports={handleSendInitialReminder,handleSendfinalReminder}