process.env.TZ = "Asia/Kolkata";

const { handleSendInitialReminder, handleSendfinalReminder,handleFinalPushNotification,handleInitialPushNotification } = require("./controllers/reminder");
const taskModel = require("./models/task");
const userModel = require('./models/user');


async function worker1() {
    const currHr = new Date().getHours();
    const currMin = new Date().getMinutes();
    const currDay = new Date().getDate();
    const alltasks = await taskModel.find({});
    for(const task of alltasks){
         const startTime = task.Start;
        const endTime = task.End;
        let startHr, startMin, endHr, endMin, taskDay;
        if (startTime != "" && endTime != "") {
            startHr = `${String(startTime).split('')[0]}` + `${String(startTime).split('')[1]}`;
            startMin = `${String(startTime).split('')[3]}` + `${String(startTime).split('')[4]}`;
            endHr = `${String(endTime).split('')[0]}` + `${String(endTime).split('')[1]}`;
            endMin = `${String(endTime).split('')[3]}` + `${String(endTime).split('')[4]}`;
            
            taskDay=String(startTime).split(' ')[1];
        }


        if (task.State==0 && startTime != "" && endTime != "" && Number(currDay) === Number(taskDay) && Number(currHr) === Number(startHr) && Number(currMin) === Number(startMin)) {
            console.log('initial reminders sent')
           await handleSendInitialReminder(task._id, task.CreatedBy);
           await handleInitialPushNotification(task._id, task.CreatedBy);
        }
        if (task.State==0 && startTime != "" && endTime != "" && Number(endMin)<57 && Number(currDay) === Number(taskDay) &&  Number(currHr) === Number(endHr) && Number(currMin) === Number(endMin)) {
            console.log('final reminders sent')
           await handleSendfinalReminder(task._id, task.CreatedBy);
           await handleFinalPushNotification(task._id, task.CreatedBy);
        }
        if (task.State==0 && startTime != "" && endTime != "" && Number(endMin)>=57 && Number(currDay) === Number(taskDay) &&  Number(currHr) === (Number(endHr)+1)%24 && Number(currMin) === (Number(endMin)+3)%60) {
            console.log('final reminders sent')
           await handleSendfinalReminder(task._id, task.CreatedBy);
           await handleFinalPushNotification(task._id, task.CreatedBy);
        }
    }
}

module.exports = {
    worker1
}

