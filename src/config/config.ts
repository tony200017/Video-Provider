export default () => ({
  database: { connectionString: process.env.MONGODB_CONNECTION_LINK },
  secrets: {
    jwtSecret: process.env.JWT_TOKEN_RANDOM_STRING,
  }
});
