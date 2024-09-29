const {Router}= require('express');
const UserController = require('../controller/user');

const UserRouter=Router();

UserRouter.post("/create-account", (req, res) => {
    const result = new UserController().createAccount(req.body);
    result
        .then((success) => {
            res.send(success);
        })
        .catch((error) => { // Change this line to accept the error
            res.send(error); // Now this will correctly refer to the error
        });
});

UserRouter.post("/login", (req, res) => {
    const result = new UserController().login(req.body);
    result
        .then((success) => {
            res.send(success);
        })
        .catch((error) => { // Change this line to accept the error
            res.send(error); // Now this will correctly refer to the error
        });
});

UserRouter.post(
    "/update-user-cart/:user_id",
    (req, res) => {
        const result = new UserController().updateCart(req.params.user_id,req.body);
        result
            .then((success) => {
                res.send(success);
            })
            .catch((error) => { // Change this line to accept the error
                res.send(error); // Now this will correctly refer to the error
            });
})

UserRouter.get(
    "/change-qty/:user_id/:product_id/:qty",
    (req, res) => {
        const result = new UserController().changeCartQty(req.params.user_id,req.params.product_id,req.params.qty);
        result
            .then((success) => {
                res.send(success);
            })
            .catch((error) => { // Change this line to accept the error
                res.send(error); // Now this will correctly refer to the error
            });
})


UserRouter.post(
    "/add-to-cart",
    (req, res) => {
        const result = new UserController().addToCart(req.body);
        result
            .then((success) => {
                res.send(success);
            })
            .catch((error) => { // Change this line to accept the error
                res.send(error); // Now this will correctly refer to the error
            });
})




module.exports =UserRouter ;
