const env = process.env;

const dbConfig = {
    database: `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`,
    host: "https://letterboxd-jp.herokuapp.com/",
    mongoConfig: {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    consumer_key: env.CONSUMER_KEY,
    consumer_secret: env.CONSUMER_SECRET,
    access_token: env.ACCESS_TOKEN,
    access_token_secret: env.ACCESS_TOKEN_SECRET
};
module.exports = {
    development: dbConfig,
    production: dbConfig
};