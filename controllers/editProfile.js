const db = require('../routes/db-config');

const editProfile = (req, res) => {

  const  file  = req.files.sampleFile
  const fileType = file.name.split(".").pop();
  const id = req.body.id
  const filePath = `/home/runner/mysql-login/public/profile/${id}.${fileType}`

  file.mv(filePath, (err)=>{
    if(err) {
      console.log(err)
    }
  });

  db.query('SELECT * FROM users WHERE id = ?', [id], async (err, result) => {
      if (err) throw err;
      db.query('UPDATE users SET ?', { profilePicture: fileType }, (err, result) => {
          if (err) throw err;
      
    })
  })

  res.redirect('/profile')
  
    // db.query('SELECT * FROM users WHERE id = ?', [id], async (err, result) => {
    //   if (err) throw err;
    //   else {
    //     db.query('UPDATE users SET ?', itemRes, (err, result) => {
    //       if (err) throw err;
    //       return res.json({ status: "success", success: "Profile has been edited" });
    //     })
    //   }
    // })
}

module.exports = editProfile;