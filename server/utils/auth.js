const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log("INSIDE AUTHMIDDLE WARE - DATA");
      console.log(data);
    } catch {
      console.log('Invalid token');
    }
    console.log(req.user);
    const user = req.user;
    return req ;
  },
  signToken: function ({ location, email, username, _id }) {
    const payload = { location, email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};