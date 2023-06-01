const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = async (req, res) =>{
    const { email, password } = req.body

    if (!email || !password) return res.json({ status: "error", error: "Please fill up the forms"}) 
    else {
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result)=>{
            if(err) throw err;
            if(result[0]) return res.json({ status: "error", error: "Email has been already registered"})
            else {
                const hashedPassword = await bcrypt.hash(password, 8);
                db.query('INSERT INTO users SET ?', { email: email, password: hashedPassword}, (err, result)=>{
                    if(err) throw err;
                    // setTimeout(()=>{
                    //     res.redirect("/login");
                    // }, 2000)
                    return res.json({ status: "success", success: "User has been registered"});
                })
            }
        })
    }
}

module.exports = register;