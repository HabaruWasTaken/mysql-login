const db = require('../routes/db-config');

const edit = (req, res) => {
  const { username, email, bio, id } = req.body

  let itemArr = []
  
  for ( let item in req.body ) {
    const value = req.body[item]
    if(value !== "") {
      if (item !== "id") {
      const str = `"${item}": "${value}"`
      itemArr.push(str)
      }
    }
  }
  
  if (itemArr.length == 0) return res.json({ status: "error", error: "Please fill form that you want to change"});
  
  let itemRes = JSON.parse("{" + itemArr.join(", ") + "}");
  if (itemRes == "{}") return res.json({ status: "error", error: "Please fill form that you want to change"});

    db.query('SELECT * FROM users WHERE id = ?', [id], async (err, result) => {
      if (err) throw err;
      else {
        db.query('UPDATE users SET ?', itemRes, (err, result) => {
          if (err) throw err;
          return res.json({ status: "success", success: "Profile has been edited" });
        })
      }
    })
}

module.exports = edit;