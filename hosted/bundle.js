const handleError = message => {
  $("#errorMessage").text(message);
  console.log(message);
  $("#bookMessage").animate({
    width: 'toggle'
  }, 350);
};

const redirect = response => {
  $("#bookMessage").animate({
    width: 'toggle'
  }, 350);
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  console.log('Ajax sent');
  console.log(action);
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function (xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.erro);
    }
  });
};
//hanlde the books
const handleBooks = e => {
  e.preventDefault();
  console.log("Book Submitted");

  if ($("#titleField").val() === '' || $("#genreField").val === '' || $('#genreField').val === '' || $('#pageField').val === '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#bookAddForm").attr("action"), $("#bookAddForm").serialize(), function () {
    loadBooksFromServer();
  });
}; //form


const BooksForm = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    id: "postDiv",
    class: "formDiv"
  }, /*#__PURE__*/React.createElement("form", {
    id: "bookAddForm",
    onSubmit: handleBooks,
    action: "/maker",
    method: "POST",
    className: "booksForm"
  }, /*#__PURE__*/React.createElement("h3", null, "Add A Book!"), /*#__PURE__*/React.createElement("label", {
    for: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "titleField",
    type: "text",
    name: "title"
  }), /*#__PURE__*/React.createElement("label", {
    for: "genre"
  }, "Genre: "), /*#__PURE__*/React.createElement("select", {
    id: "genreField",
    name: "genre"
  }, /*#__PURE__*/React.createElement("option", {
    value: "fiction"
  }, "Fiction"), /*#__PURE__*/React.createElement("option", {
    value: "science fiction/fantasy"
  }, "Science Fiction/Fantasy"), /*#__PURE__*/React.createElement("option", {
    value: "romance"
  }, "Romance"), /*#__PURE__*/React.createElement("option", {
    value: "mystery"
  }, "Mystery"), /*#__PURE__*/React.createElement("option", {
    value: "horror"
  }, "Horror"), /*#__PURE__*/React.createElement("option", {
    value: "nonfiction"
  }, "Non-Fiction"), /*#__PURE__*/React.createElement("option", {
    value: "other"
  }, "Other")), /*#__PURE__*/React.createElement("label", {
    for: "pageNumber"
  }, "Page Count:"), /*#__PURE__*/React.createElement("input", {
    id: "pageField",
    type: "number",
    name: "pageNumber"
  }), /*#__PURE__*/React.createElement("label", {
    for: "review"
  }, "Review:"), /*#__PURE__*/React.createElement("textarea", {
    id: "reviewField",
    name: "review"
  }, "Leave a Review..."), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Add Book"
  }))));
}; //access the api


const BooksList = props => {
  if (props.books.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      class: "emptyShelf"
    }, "No books added to the shelf yet."));
  }

  const booksNodes = props.books.map(function (book) {
    console.log(book.title);
    return /*#__PURE__*/React.createElement("div", {
      key: book._id,
      className: "book"
    }, /*#__PURE__*/React.createElement("h3", null, "Title: ", book.title));
  });
  console.log(booksNodes);
  return /*#__PURE__*/React.createElement("div", {
    className: "booksList"
  }, booksNodes);
}; //load information on to the app page


const loadBooksFromServer = () => {
  sendAjax('GET', '/getBooks', null, data => {
    ReactDOM.render( /*#__PURE__*/React.createElement(BooksList, {
      books: data.books
    }), document.querySelector("#books"));
  });
};

const setup = csrf => {
  ReactDOM.render( /*#__PURE__*/React.createElement(BooksForm, {
    csrf: csrf
  }), document.querySelector("#addBook"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BooksList, {
    books: []
  }), document.querySelector("#books"));
  loadBooksFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
