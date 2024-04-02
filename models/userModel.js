const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
    reminders: []
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
    reminders: []
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
    reminders: []
  },
  {
    id: 42,
    name: "Admin Admin",
    email: "admin@localhost.com",
    password: "foo_bar123!",
    role: "user",
    reminders: []
  }
];

// Function to add a new user to the database
function addUserToDatabase(user) {
  // Check if the user already exists in the database (based on some unique identifier like email or ID)
  const existingUser = database.find((entry) => entry.id === user.id);

  // If the user doesn't already exist in the database, add them
  if (!existingUser) {
    // Here, you can map the properties you need from the user object to the database entry
    const newUserEntry = {
      id: user.id,
      name: user.displayName, // Assuming displayName is the name property for GitHub users
      email: user.email, // Assuming email is available from GitHub
      // Add any other properties you want to store in the database entry
    };

    // Add the new user entry to the database array
    database.push(newUserEntry);

    // Optionally, you can return the newly added user entry
    return newUserEntry;
  }

  // Return null if the user already exists in the database
  return null;
}

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel, addUserToDatabase };
