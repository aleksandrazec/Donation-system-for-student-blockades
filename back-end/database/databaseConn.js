const express = require('express')
const mysql = require('mysql2');


const conn = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_DATABASE,
 })


conn.connect((err) => {
     if(err){
         console.log("ERROR: " + err.message);
         return;   
     }
     console.log('Connection established');
   })

let dataPool={}

dataPool.createUser=(email, password, firstName, lastName, city)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO User (email, password, first_name, last_name, city, role) VALUES (?,?,?,?,?,'Citizen')`, [email, password, firstName, lastName, city,], (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.authUser=(email)=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT * FROM User WHERE email = ?', email, (err,res, fields)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.updateUserInfo=(id, field, info)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`UPDATE User SET ${field} = ? WHERE id = ?`, [info, id], (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}



dataPool.setRole=(id, role)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`UPDATE User SET role = ? WHERE id = ? `, [role, id], (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}



dataPool.addFaculty=(name, city, address, coordinates, workingHours, university, id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO Faculty (name, city, address, coordinates, working_hours, university, user_id) VALUES (?,?,?,?,?,?,?)`, [name, city, address, coordinates, workingHours, university, id], (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.assignStudentManager=(facultyID, studentID)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`UPDATE Faculty SET user_id = ? WHERE id = ?`, [studentID, facultyID], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.updateFacultyInfo=(id, field, info)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`UPDATE Faculty SET ${field} = ? WHERE id = ?`, [info, id], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.deleteFaculty=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`DELETE FROM Faculty WHERE id = ?`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.addUniversity=(university)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`ALTER TYPE university ADD VALUE ?`, university, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.addDonationType=(newType)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`ALTER TYPE type ADD VALUE ?`, newType, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createDonationSubtype=(subtype, type)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO 'Type of donation' (subtype, type) VALUES (?,?)`, [subtype, type], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createDonationRequest=(quantity, urgencyLevel, item, facultyID)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO 'Donation request' (quantity, urgency_level, item, faculty_id) VALUES (?,?,?,?)`, [quantity, urgencyLevel, item, facultyID], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.updateDonationRequest=(id, field, info)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`UPDATE 'Donation request' SET ${field} = ? WHERE id = ?`, [field, info, id], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.deleteDonationRequest=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`DELETE FROM 'Donation request' WHERE id = ?`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createForum=(prompt, facultyID)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO Forum (prompt, faculty_id) VALUES (?,?)`, [prompt, facultyID], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.deleteForum=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`DELETE FROM Forum WHERE id = ?`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createComment=(text, userID, forumID, replyID)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO Comment (text, user_id, forum_id, reply_id) VALUES (?,?,?,?)`, [text, userID, forumID, replyID], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.deleteComment=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`DELETE FROM Comment WHERE id = ?`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

module.exports = dataPool;