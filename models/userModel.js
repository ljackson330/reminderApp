const database = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    password: "password123",
    role: "user",
    reminders: []
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    password: "password456",
    role: "user",
    reminders: []
  },
  {
    id: 3,
    name: "admin",
    email: "admin@example.com",
    password: "admin",
    role: "admin",
    reminders: []
  }
];

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
  addUserToDatabase: (user) => {
    const existingUser = database.find((entry) => entry.email === user.email);
    if (!existingUser) {
      const newUserEntry = {
        id: database.length + 1,
        name: user.name,
        email: user.email,
        password: user.password,
        role: 'user',
        reminders: [],
        sessionId: null
      };
      database.push(newUserEntry);
      return newUserEntry;
    }
    return null;
  },
};

module.exports = { database, userModel };
