module.exports = {
  routeFunc: (app, usersList) =>
    app.post("/auth", (req, res) => {
      if (!req.body) {
        return res.sendStatus(400);
      }
      usersList.forEach(user => {
        if (req.body.username == user.username && req.body.email == user.email) {
          return res.send({valid: true, user});
        }
      });

      res.send({
        email: req.body.email,
        password: req.body.password,
        valid: false,
      });
    }),
};
