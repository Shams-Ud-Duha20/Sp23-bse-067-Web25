
const users = [];

const User = {
    
    findByUsername: (username) => {
        return users.find(user => user.username === username);
    },
    
    findByEmail: (email) => {
        return users.find(user => user.email === email);
    },
    create: (newUser) => {
        users.push(newUser);
        console.log('User created:', newUser.username);
        console.log('Current users:', users); 
    }
};

module.exports = User;
