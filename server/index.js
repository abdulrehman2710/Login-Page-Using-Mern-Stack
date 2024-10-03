const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const EmployeeModel = require('./Models/Employee');
const app = express();
const port = 6001;

app.use(cors());
app.use(express.json());


async function main() {
    await mongoose.connect('mongodb+srv://abdulrehman27104:humtum100@mycluster.3ypou.mongodb.net/?retryWrites=true&w=majority&appName=myCluster', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tlsInsecure: true,
    });
    console.log("MongoDB connected successfully");
}

main().catch(err => console.log(err)); // Call the database connection function

app.post('/login', (req, res) => {
    console.log(req.body); // Check if data is received correctly
    
    const { email, password } = req.body;

  
    EmployeeModel.findOne({ email : email })
        .then(user => {
            if (user) {
                
                if (user.password === password) {
                    res.json("Success"); 
                } else {
                    res.json("the password is incorrect"); 
                }
            } else {
                res.json("user does not exist"); 
            }
        })
        .catch(err => res.json({ error: err.message })); 
});

app.post('/register', (req, res) => {
    console.log(req.body); // Check if data is received correctly
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
