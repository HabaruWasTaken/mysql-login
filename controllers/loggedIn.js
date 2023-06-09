const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');

const loggedIn = async (req, res, next) => {
    if(!req.cookies.userRegistered) return next();
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result)=>{
            if(err) {
                console.log(err)
                return next()
            }

            req.user = result[0]
            return next()
        })
    } catch(err){
        if(err) {
            console.log(err)
            return next()
        } 
    }
}

module.exports = loggedIn;