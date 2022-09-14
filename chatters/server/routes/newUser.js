const { User } = require("../models/user");

module.exports = {
  routeFunc: (app, dataManager) =>
    app.post("/newUser", (req, res) => {
      if (!req.body) {
        return res.sendStatus(400);
      }
      dataManager.usersList.forEach(user => {
        if (req.body.username == user.username) {
          return res.send({valid: false});
        }
      })
      const newUser = new User({username: req.body.username, email: req.body.email})
      dataManager.usersList.set(newUser.id, newUser);
      dataManager.saveUsersToFile(dataManager.usersList);
      res.send({valid: true, newUser});
    })
};
