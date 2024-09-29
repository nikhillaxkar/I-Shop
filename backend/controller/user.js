const { encryptPassowrd, decryptPassowrd } = require("../helper");
const Cart = require("../model/Cart");
const User = require("../model/user");
const { use } = require("../routes/user");

class UserController {
  createAccount(data) {
    return new Promise(async (res, rej) => {
      try {
        if (
          data.name != "" &&
          data.email != "" &&
          data.password != "" &&
          data.confirm_password != ""
        ) {
          if (data.password != data.confirm_password) {
            rej({
              msg: "Both password must match",
              status: 0,
            });
            return;
          }
          const userExists = await User.findOne({
            email: data.email,
          }).countDocuments();
          if (userExists == 1) {
            rej({
              msg: "Email alredy exits",
              status: 0,
            });
          } else {
            const user = new User({
              name: data.name,
              email: data.email,
              password: encryptPassowrd(data.password),
            });
            user
              .save()
              .then((result) => {
                res({
                  msg: "Account created",
                  status: 1,
                  user,
                });
              })
              .catch((err) => {
                rej({
                  msg: "Unable to create the account",
                  status: 0,
                });
              });
          }
        } else {
          rej({
            msg: "Please enter all the data",
            status: 0,
          });
        }
      } catch (err) {
        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

  login(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = await User.findOne({ email: data.email });
        if (user) {
          if (data.password == decryptPassowrd(user.password)) {
            res({
              msg: "Login successful",
              status: 1,
              user,
            });
          } else {
            res({
              msg: "Incorrect password",
              status: 0,
            });
          }
        } else {
          rej({
            msg: "User with this email not found",
            status: 0,
          });
        }
      } catch (err) {
        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

  updateCart(user_id, { state_cart }) {
    return new Promise(async (res, rej) => {
      try {
        for (let c of state_cart) {
          const cart = await Cart.findOne({
            product_id: c.pId,
            user_id: user_id,
          });
          if (cart) {
            await Cart.updateOne({ _id: cart._id }, { qty: cart.qty + c.qty });
          } else {
            const newCart = new Cart({
              user_id: user_id,
              product_id: c.pId,
              qty: c.qty,
            });
            await newCart.save();
          }
        }
        const userCart = await Cart.find({ user_id: user_id }).populate(
          "product_id"
        );

        res({
          msg: "Cart update",
          status: 1,
          userCart,
        });
      } catch (err) {
        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

  changeCartQty(user_id, product_id, qty) {
    return new Promise((res, rej) => {
      try {
        if (qty == 0) {
          Cart.deleteOne({ user_id: user_id, product_id: product_id })
            .then(() => {
              res({
                msg: "Updated",
                status: 1,
              });
            })
            .catch(() => {
              res({
                msg: "Unable to update",
                status: 0,
              });
            });
        } else {
          Cart.updateOne(
            { user_id: user_id, product_id: product_id },
            { qty: qty }
          )
            .then(() => {
              res({
                msg: "Updated",
                status: 1,
              });
            })
            .catch(() => {
              res({
                msg: "Unable to update",
                status: 0,
              });
            });
        }
      } catch (err) {
        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

  addToCart(data) {
    return new Promise(
      async(res, rej) => {
      try {
        const existingCart=await Cart.findOne({user_id: data.user_id,product_id: data.product_id});
        if(existingCart){
           Cart.updateOne(
            {
              _id: existingCart._id
            },
            {
              qty:existingCart.qty +1
            }
           ).then((success) => {
            res({
              msg: "Added to cart",
              status: 1,
            });
          })
          .catch((error) => {
            res({
              msg: "Unable to update",
              status: 0,
            });
          });
        }else{
          const cart=new Cart(data);
          cart.save()
          .then((success) => {
            res({
              msg: "Added to cart",
              status: 1,
            });
          })
          .catch((error) => {
            res({
              msg: "Unable to update",
              status: 0,
            });
          });
        }
       
        
      } catch (err) {
        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }
}

module.exports = UserController;
