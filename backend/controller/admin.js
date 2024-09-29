const { encryptPassowrd, decryptPassowrd } = require("../helper");
const Admin = require("../model/admin");

class AdminController{
    
        login(data) {
            console.log(data)

            return new Promise(async (res, rej) => {
              try {
                
                const admin = await Admin.findOne({ email: new RegExp(`^${data.email}$`, 'i') });
                console.log(admin)
                if (admin) {
                  if (data.password == decryptPassowrd(admin.password)) {
                    res({
                      msg: "Login successful",
                      status: 1,
                      admin,
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
}

module.exports = AdminController;
