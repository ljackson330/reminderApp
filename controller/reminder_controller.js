let database = require("../database");

let remindersController = {
    list: (req, res) => {
        res.render("reminder/index", { reminders: database.cindy.reminders });
    },

    new: (req, res) => {
        res.render("reminder/create");
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            res.render("reminder/index", { reminders: database.cindy.reminders });
        }
    },

    create: (req, res) => {
        let reminder = {
            id: database.cindy.reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };
        database.cindy.reminders.push(reminder);
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.cindy.reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        // Get the reminder ID from the request body
        let reminderId = req.params.id;
        // Needs to be changed - lookup user reminders from request body user
        let userReminders = database.cindy.reminders;

        // Find the index of the reminder with the given ID
        let indexToUpdate = userReminders.findIndex(
            (reminder) => reminder.id === parseInt(reminderId)
        );

        // If the reminder exists
        if (indexToUpdate !== -1) {
            // Update the properties of the reminder object
            userReminders[indexToUpdate].title = req.body.title;
            userReminders[indexToUpdate].description = req.body.description;
            userReminders[indexToUpdate].completed = req.body.completed === 'true';
        }

        // Redirect to the reminders page after update
        res.redirect("/reminders");
    },

    delete: (req, res) => {
        // Get the reminder ID from request body
        let reminderId = req.params.id;
        // Needs to be changed
        let userReminders = database.cindy.reminders;

        // Find the index of the reminder with the given ID
        let indexToDelete = userReminders.findIndex(
            (reminder) => reminder.id === parseInt(reminderId)
        );

        // If the reminder exists
        if (indexToDelete !== -1) {
            // Remove the reminder object from the array
            userReminders.splice(indexToDelete, 1);
            console.log(`Reminder with ID ${reminderId} deleted successfully.`);
        } else {
            console.log(`Reminder with ID ${reminderId} not found.`);
        }

        // Redirect to the reminders page after deletion
        res.redirect("/reminders");
    },
};

module.exports = remindersController;