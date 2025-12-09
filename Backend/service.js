const { handleSendInitialReminder, handleSendfinalReminder,handleFinalPushNotification,handleInitialPushNotification } = require("./controllers/reminder");
const taskModel = require("./models/task");
const userModel = require('./models/user');


async function worker1() {
    const currHr = new Date().getHours();
    const currMin = new Date().getMinutes();
    const currDay = new Date().getDate();
    console.log('Worker1 is running')
    const alltasks = await taskModel.find({});
    alltasks.forEach((task) => {
        const startTime = task.Start;
        const endTime = task.End;
        let startHr, startMin, endHr, endMin, taskDay;
        if (startTime != "" && endTime != "") {
            startHr = `${String(startTime).split('')[0]}` + `${String(startTime).split('')[1]}`;
            startMin = `${String(startTime).split('')[3]}` + `${String(startTime).split('')[4]}`;
            endHr = `${String(endTime).split('')[0]}` + `${String(endTime).split('')[1]}`;
            endMin = `${String(endTime).split('')[3]}` + `${String(endTime).split('')[4]}`;
            if (String(startTime).split('')[5] == " " && String(startTime).split('')[7] == " ") {
                taskDay = `${String(startTime).split('')[6]}`;
            }
            else if (String(startTime).split('')[5] == " " && String(startTime).split('')[8] == " ") {
                taskDay = `${String(startTime).split('')[6]}` + `${String(startTime).split('')[7]}`;
            }
            else if (String(startTime).split('')[5] == " " && String(startTime).split('')[7] == " ") {
                taskDay = `${String(startTime).split('')[6]}`;
            }
            else if (String(startTime).split('')[5] == " " && String(startTime).split('')[8] == " ") {
                taskDay = `${String(startTime).split('')[6]}` + `${String(startTime).split('')[7]}`;
            }
        }


        if (task.State==0 && startTime != "" && endTime != "" && Number(currDay) === Number(taskDay) && Number(currHr) === Number(startHr) && Number(currMin) === Number(startMin)) {
            console.log('initial reminders sent')
            handleSendInitialReminder(task._id, task.CreatedBy);
            handleInitialPushNotification(task._id, task.CreatedBy);
        }
        if (task.State==0 && startTime != "" && endTime != "" && Number(currDay) === Number(taskDay) && Number(currHr) === Number(endHr) && Number(currMin) === Number(endMin) + 3) {
            console.log('final reminders sent')
            handleSendfinalReminder(task._id, task.CreatedBy);
            handleFinalPushNotification(task._id, task.CreatedBy);
        }

    })
}

module.exports = {
    worker1
}

