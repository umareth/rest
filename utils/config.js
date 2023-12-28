const {
  PORT = 3000,
  MONGO = "mongodb+srv://astamirov001:1234@cluster0.85hvdyp.mongodb.net/restapi",
  JWT_SECRET = "some-secret-key",
  NODE_ENV,
} = process.env;

const allowedCors = [
  "https://shakheth.nomoredomainsrocks.ru",
  "https://localhost:3000",
  "http://shakheth.nomoredomainsrocks.ru",
  "http://localhost:3000",
];

module.exports = {
  PORT,
  NODE_ENV,
  MONGO,
  JWT_SECRET,
  allowedCors,
};
