const {Router}= require('express');
const AdminController = require('../controller/admin');

const AdminRouter=Router();

AdminRouter.post("/login", (req, res) => {
    const result = new AdminController().login(req.body);
    result
        .then((success) => {
            res.send(success);
        })
        .catch((error) => { // Change this line to accept the error
            res.send(error); // Now this will correctly refer to the error
        });
});

module.exports =AdminRouter ;

