const users = {};
// formating the json response for GET/POST methods
const respondJson = (request, response, status, object) => {
  const header = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, header);
  response.write(JSON.stringify(object));
  response.end();
};

// formating the JSON response for HEAD methods
const respondJSONMeta = (request, response, status) => {
  const header = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, header);
  response.end();
};

// retrieving user data (specifically books) via GET method
const getUsers = (request, response, name) => {
  let code = 200;
  let responseJSON = {};
  if (users[name]) {
    responseJSON = {
      users: users[name],
    };
  } else {
    responseJSON = {
      message: 'Username does not exist',
    };
    code = 400;
  }

  return respondJson(request, response, code, responseJSON);
};

// retrieving user data via HEAD method
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// Adding user and updating user information via POST
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and Title are both required.',
  };

  if (!body.name || !body.title) {
    responseJSON.id = 'missingParams';
    return respondJson(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
    users[body.name].name = body.name;
    users[body.name].books = [];
  }

  const book = {
    title: body.title,
    genre: body.genre,
    review: body.review,
    pagenumbers: body.pagenumber,
  };

  users[body.name].books.push(book);

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully!';
    return respondJson(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// page not found
const notFound = (request, response) => {
  const responseJSON = {
    message: 'the page that you are looking for was not found',
    is: 404,
  };

  return respondJson(request, response, 404, responseJSON);
};

// page not found, but HEAD request
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// exporting methods
module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
