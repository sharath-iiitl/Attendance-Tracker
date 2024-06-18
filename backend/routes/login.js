const express = require("express");
const LoginModel = require("../modules/Login");

const app = express();

app.post("/user/get_user", async (request, response) => {
    try {
        const result = await LoginModel.findOne({
            mail: request.body.mail,
            password: request.body.password});
            // role: request.body.role});
        if (result) {
            return response.json({ status: "ok", user: true, role : result.role });
          } else {
            return response.json({ status: "error", user: false });
          }
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/user/post_user", async (request, response) => {
    const user = new LoginModel(request.body);
    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.patch("/api/patch", async (req, res) => {
    try {
      const newPassword = req.body.newPassword;
      const confirmPassword=req.body.confirmPassword
      if (confirmPassword!=newPassword) {
        return res.json({ status: "error", user: "errorConfirm" });
      } else {
        const user = await LoginModel.findOneAndUpdate(
          { mail : req.body.mail, password: req.body.password, },
          {
            password: newPassword,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (user) {
          return res.json({ status: "ok", user: true });
        } else {
          return res.json({ status: "error", user: false });
        }
      }
      
    } catch (error) {
      res.status(500).json({ error });
    }
  });

// app.delete("/user/delete", async (request, response) => {
//     try {
//     const remove = await LoginModel.deleteOne({mail : `${request.body.mail}`})
//     resonse.send(remove);
//     }
//     catch (error) {
//         response.send(error);
//     }
// })

// app.put("/user/update", async (req, res) => {
//     try {
//         const updateduser = await LoginModel.updateOne(
//             {mail : `${req.body.mail}`}, 
//             {
//                 $set : { mail : `${req.body.new_mail}`}
//             }
            
//         );
//         res.send(updateduser);
//     }
//     catch (error) {
//         res.send(error);
//     }
// })

module.exports = app;