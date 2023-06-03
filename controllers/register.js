const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body
  if (!email || !password || !username || !passwordConfirm ) return res.json({ status: "error", error: "Please fill up the forms" })
  else {
    if (password !== passwordConfirm) return res.json({ status: "error", error: "Password incorrect" })
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) throw err;
      if (result[0]) return res.json({ status: "error", error: "Email has been already registered" })
      else {
        const hashedPassword = await bcrypt.hash(password, 8);
        db.query('INSERT INTO users SET ?', { username: username, email: email, password: hashedPassword }, (err, result) => {
          if (err) throw err;
          return res.json({ status: "success", success: "User has been registered" });
        })
      }
    })
  }
}

module.exports = register;