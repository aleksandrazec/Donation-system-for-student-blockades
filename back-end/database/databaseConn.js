const express = require('express')
const mysql = require('mysql2');
const conn = require("./connection.js");

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

dataPool.listCitizen=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT * FROM User WHERE role='Citizen' `, (err,res, fields)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listNotAdmin=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT id, email, first_name, last_name, city, role FROM User WHERE role!='Admin' `, (err,res, fields)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.deleteUser=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query('DELETE FROM User WHERE id = ?', id, (err,res, fields)=>{
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
dataPool.getRole=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT role FROM User WHERE id = ? `, id, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}
dataPool.getInfo=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT * FROM User WHERE id = ? `, id, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.getFaculty=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT name, city, address, coordinates, working_hours, university, id FROM Faculty WHERE user_id = ? `, id, (err, res)=>{
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

dataPool.listFacultiesForSearch=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT name, ROW_NUMBER() OVER (ORDER BY name) AS 'key' FROM Faculty`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listCitiesForSearch=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT city AS name, ROW_NUMBER() OVER (ORDER BY city) AS 'key' FROM (SELECT DISTINCT city FROM Faculty) distinct_cities`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listUniversitiesForSearch=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT university AS name, ROW_NUMBER() OVER (ORDER BY university) AS 'key' FROM (SELECT DISTINCT university FROM Faculty) distinct_unis`
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
dataPool.findFacultiesAll=()=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT * FROM Faculty', (err,res)=>{
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
dataPool.listDonationSubtypesForSearch=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT subtype AS name, ROW_NUMBER() OVER (ORDER BY subtype) AS 'key' FROM Type_of_donation`, (err,res)=>{
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

dataPool.listDonationRequestFac=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT id, item, urgency_level, quantity, DATE_FORMAT(date, "%M %d %Y") AS date FROM Donation_request WHERE faculty_id = ?', id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listDonationRequestCity=(city)=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT item, type, urgency_level, quantity, DATE_FORMAT(date, "%M %d %Y") AS date, name AS faculty, university, city FROM Type_of_donation INNER JOIN Donation_request ON Type_of_donation.subtype=Donation_request.item INNER JOIN Faculty ON Donation_request.faculty_id=Faculty.id WHERE city = ? ORDER BY date DESC', city, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.getDonationRequest=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query('SELECT item, id, faculty_id, urgency_level, quantity, DATE_FORMAT(date, "%M %d %Y") AS date FROM Donation_request WHERE id = ?', id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listForumsASC=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT prompt, DATE_FORMAT(date, "%M %d %Y") AS date, name, Forum.faculty_id, Forum.id FROM Forum INNER JOIN Faculty on Forum.faculty_id=Faculty.id ORDER BY CASE WHEN prompt <=> 'Questions?' THEN 1 ELSE 0 END, date ASC`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listForumsByFac=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT prompt, DATE_FORMAT(date, "%M %d %Y") AS date, name, Forum.faculty_id, Forum.id FROM Forum INNER JOIN Faculty on Forum.faculty_id=Faculty.id WHERE faculty_id = ? ORDER BY CASE WHEN prompt <=> 'Questions?' THEN 0 ELSE 1 END, date DESC`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.listForumsDSC=()=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT prompt, DATE_FORMAT(date, "%M %d %Y") AS date, name, Forum.faculty_id, Forum.id FROM Forum INNER JOIN Faculty on Forum.faculty_id=Faculty.id ORDER BY CASE WHEN prompt <=> 'Questions?' THEN 1 ELSE 0 END, date DESC`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.findForum=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT prompt, DATE_FORMAT(date, "%M %d %Y") AS date, name, Forum.faculty_id, Forum.id FROM Forum INNER JOIN Faculty on Forum.faculty_id=Faculty.id WHERE Forum.id= ?`, [id], (err,res)=>{
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

dataPool.getComments=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT Comment.id , text, DATE_FORMAT(Comment.date, "%M %d %Y") AS date, reply_id, first_name, last_name, Comment.user_id, forum_id FROM Comment INNER JOIN User on Comment.user_id=User.id INNER JOIN Forum ON Forum.id=Comment.forum_id INNER JOIN Faculty ON Faculty.id=Forum.faculty_id WHERE reply_id IS NULL AND forum_id = ? ORDER BY CASE WHEN Comment.user_id <=> Faculty.user_id THEN 0 ELSE 1 END, Comment.date DESC`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.getReplies=(id)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`SELECT Comment.id , text, DATE_FORMAT(Comment.date, "%M %d %Y") AS date, reply_id, first_name, last_name, Comment.user_id, forum_id FROM Comment INNER JOIN User on Comment.user_id=User.id INNER JOIN Forum ON Forum.id=Comment.forum_id INNER JOIN Faculty ON Faculty.id=Forum.faculty_id WHERE reply_id = ? ORDER BY CASE WHEN Comment.user_id <=> Faculty.user_id THEN 0 ELSE 1 END, Comment.date DESC`, id, (err,res)=>{
      if(err){return reject(err)}
      console.log(res)
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