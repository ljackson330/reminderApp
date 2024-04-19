let database = require("../database");

let remindersController = {
    list: (req, res) => {
        const userReminders = req.user.reminders || [];
        res.render("reminder/index", { reminders: userReminders });
    },

    new: (req, res) => {
        res.render("reminder/create");
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;

        // find the reminder within the authenticated user's reminders array
        let searchResult = req.user.reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });

        if (searchResult !== undefined) {
            // if the reminder is found, render the single reminder view
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            // if the reminder is not found, render the reminders index view
            res.render("reminder/index", { reminders: req.user.reminders });
        }
    },


    create: (req, res) => {
        // create a new reminder object
        let reminder = {
            id: database.user.reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };

        // ensure database.user.reminders exists before pushing the new reminder
        if (!req.user.reminders) {
            req.user.reminders = [];
        }

        // add the new reminder to the authenticated user's reminders
        req.user.reminders.push(reminder);

        // redirect to the reminders page
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;

        // find the reminder within the authenticated user's reminders array
        let searchResult = req.user.reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });

        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        // get the reminder ID from the request parameters
        let reminderId = req.params.id;

        // retrieve the authenticated user's reminders
        let userReminders = req.user.reminders;

        // find the index of the reminder with the given ID within the user's reminders
        let indexToUpdate = userReminders.findIndex(
            (reminder) => reminder.id === parseInt(reminderId)
        );

        // if the reminder exists within the user's reminders
        if (indexToUpdate !== -1) {
            // update the properties of the reminder object
            userReminders[indexToUpdate].title = req.body.title;
            userReminders[indexToUpdate].description = req.body.description;
            userReminders[indexToUpdate].completed = req.body.completed === 'true';
        }

        // redirect to the reminders page after update
        res.redirect("/reminders");
    },

    delete: (req, res) => {
        // get the reminder ID from request parameters
        let reminderId = req.params.id;

        // retrieve the authenticated user's reminders
        let userReminders = req.user.reminders;

        // find the index of the reminder with the given ID within the user's reminders
        let indexToDelete = userReminders.findIndex(
            (reminder) => reminder.id === parseInt(reminderId)
        );

        // if the reminder exists within the user's reminders, delete it
        if (indexToDelete !== -1) {
            userReminders.splice(indexToDelete, 1);
            console.log(`Reminder with ID ${reminderId} deleted successfully.`);
        } else {
            console.log(`Reminder with ID ${reminderId} not found.`);
        }

        // redirect to the reminders page after deletion
        res.redirect("/reminders");
    },
};

module.exports = remindersController;
