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



dataPool.addFaculty=(name, city, address, coordinates, workingHours, university)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO Faculty (name, city, address, coordinates, working_hours, university) VALUES (?,?,?,?,?,?)`, [name, city, address, coordinates, workingHours, university], (err, res)=>{
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

dataPool.showFacultyInfo=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT * FROM Faculty WHERE id = ?`, id, (err,res)=>{
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

dataPool.listFaculties=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT name, id FROM Faculty`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listCities=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT city, ROW_NUMBER() OVER (ORDER BY city) AS 'key' FROM (SELECT DISTINCT city FROM Faculty) distinct_cities`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listUniversities=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT university, ROW_NUMBER() OVER (ORDER BY university) AS 'key' FROM (SELECT DISTINCT university FROM Faculty) distinct_unis`
      , (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}
dataPool.listUniversitiesENUM=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Faculty' AND COLUMN_NAME = 'university'`, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}
dataPool.runSQL=(sql)=>{
    return new Promise((resolve, reject)=>{
    conn.query(sql, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.findFaculties=(uni)=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT * FROM Faculty WHERE university = ?', uni, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listDonationTypeENUM=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Type_of_donation' AND COLUMN_NAME = 'type'`, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listDonationSubtypes=()=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT subtype FROM Type_of_donation', (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.getDonationType=(subtype)=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT type FROM Type_of_donation WHERE subtype = ?',subtype, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}


dataPool.createDonationSubtype=(subtype, type)=>{
  return new Promise((resolve, reject)=>{
    conn.query('INSERT INTO Type_of_donation (subtype, type) VALUES (?,?)', [subtype, type], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createDonationRequest=(quantity, urgencyLevel, item, facultyID)=>{
  return new Promise((resolve, reject)=>{
    conn.query('INSERT INTO Donation_request (quantity, urgency_level, item, faculty_id) VALUES (?,?,?,?)', [quantity, urgencyLevel, item, facultyID], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.updateDonationRequest=(id, field, info)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`UPDATE Donation_request SET ${field} = ? WHERE id = ?`, [info, id], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.deleteDonationRequest=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query('DELETE FROM Donation_request WHERE id = ?', id, (err,res)=>{
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
dataPool.createComment=(text, userID, forumID)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO Comment (text, user_id, forum_id) VALUES (?,?,?)`, [text, userID, forumID], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createReply=(text, userID, forumID, replyID)=>{
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