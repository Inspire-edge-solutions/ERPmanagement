const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'inspire-edge-db.cnawwwkeyq7q.ap-south-1.rds.amazonaws.com',
  user: 'teacherlink_user',
  password: 'Inspireedge2024',
  database: 'up'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

exports.handler = async (event) => {
  const { httpMethod, body } = event;

  switch (httpMethod) {
    case 'GET':
      return getUser(event);
    case 'POST':
      return createUser(event);
    case 'PUT':
      return updateUser(event);
    case 'DELETE':
      return deleteUser(event);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' })
      };
  }
};

const getUser = (event) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM student';
    connection.query(query, (error, results) => {
      if (error) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error fetching users', error })
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify(results)
        });
      }
    });
  });
};

const createUser = (event) => {
  return new Promise((resolve, reject) => {
    const { id, name, age, grade, email } = JSON.parse(event.body);
    const query = 'INSERT INTO student (id, name, age, grade, email) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [id, name, age, grade, email], (error, results) => {
      if (error) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error creating user', error })
        });
      } else {
        resolve({
          statusCode: 201,
          body: JSON.stringify({ message: 'User created successfully', results })
        });
      }
    });
  });
};

const updateUser = (event) => {
  return new Promise((resolve, reject) => {
    const { id, name, age, grade, email } = JSON.parse(event.body);
    const query = 'UPDATE student SET name = ?, age = ?, grade = ?, email = ? WHERE id = ?';
    connection.query(query, [name, age, grade, email, id], (error, results) => {
      if (error) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error updating user', error })
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'User updated successfully', results })
        });
      }
    });
  });
};

const deleteUser = (event) => {
  return new Promise((resolve, reject) => {
    const { id } = JSON.parse(event.body);
    const query = 'DELETE FROM student WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error deleting user', error })
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'User deleted successfully', results })
        });
      }
    });
  });
};
