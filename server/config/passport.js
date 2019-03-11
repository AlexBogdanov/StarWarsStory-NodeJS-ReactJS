const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

const localStrategy = new LocalPassport((username, password, done) => {
    User.findOne({ username: username }).then(user => {
        if (!user) {
            return done(null, false); 
        }

        if (!user.authenticate(password)) {
            return done(null, false);
        }
        
        return done(null, user);
    });
});

const strategyNames = {
    LOCAL: 'local'
};

module.exports = () => {
    passport.use(strategyNames.LOCAL, localStrategy);

    passport.serializeUser((user, done) => {
        if (user) return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (!user) return done(null, false);
            return done(null, user);        
        });
    });
};