module.exports =  {
    "type": "mongodb",
    "url": "mongodb://heroku_jpnqk76k:ui6rufv7all1ao07m6i6uv0qpk@ds041198.mlab.com:41198/heroku_jpnqk76k",
    "useNewUrlParser": true,
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};
