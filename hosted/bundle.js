const handleError = message => {
  $("#errorMessage").text(message);
  console.log(message); //$("#bookMessage").animate({width:'toggle'},350);
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
      console.log(xhr.responseJSON);
      handleError(messageObj.error);
    }
  });
};
//handle the books
const handleBooks = e => {
  e.preventDefault();
  console.log("Book Submitted");

  if ($("#titleField").val() === '' || $("#genreField").val === '' || $('#reviewField').val === '' || $('#pageField').val === '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#bookAddForm").attr("action"), $("#bookAddForm").serialize(), function () {
    loadBooksFromServer();
  });
  e.target.reset();
}; //adding browsing book to the form


const addBookFromBrowse = e => {
  e.preventDefault();
  console.log("adding book");
  console.log(e.target.parentNode.parentNode.getElementsByClassName("title")); //$("#titleField").val() = e.target.parentNode.parentNode.getElementsByClassName("title").innerHTML;
  //$("#titleField").val()
  //$("#titleField").val()
  //$("#titleField").val()
}; //Header


const PersonalHeader = () => {
  return /*#__PURE__*/React.createElement("h1", null, "Welcome to you bookshelf!");
}; //form


const BooksForm = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    id: "postDiv",
    class: "formDiv"
  }, /*#__PURE__*/React.createElement("form", {
    id: "bookAddForm",
    onSubmit: handleBooks,
    action: "/shelf",
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
}; //set up the buttons


const BrowseBooksButton = e => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    id: "broweBooksButton",
    onClick: loadAllBooksFromServer
  }, "Browse"));
};

const ShelfButton = e => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    id: "shelfButton",
    onClick: loadBooksFromServer
  }, "Show Shelf"));
}; //set up the browse books list


const BrowseBooks = props => {
  if (props.books.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      class: "emptyBrowseList"
    }, "There are no books to browse at the moment"));
  }

  let titles = [];
  const booksNodes = props.books.map(function (book) {
    if (titles.includes(book.title)) {
      return;
    } else if (!titles.includes(books.title)) {
      titles.push(book.title);
      console.log(titles);
      return /*#__PURE__*/React.createElement("tr", {
        key: book._id,
        className: "book"
      }, /*#__PURE__*/React.createElement("td", {
        class: "title"
      }, book.title), /*#__PURE__*/React.createElement("td", {
        class: "genre"
      }, book.genre), /*#__PURE__*/React.createElement("td", {
        class: "pageNumber"
      }, book.pageNumber));
    }
  });
  console.log(titles.includes("Slaughterhouse-5"));
  return /*#__PURE__*/React.createElement("div", {
    className: "BrowseBookList"
  }, /*#__PURE__*/React.createElement("h3", null, "Browse All Books"), /*#__PURE__*/React.createElement("table", {
    align: "center"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Genre"), /*#__PURE__*/React.createElement("th", null, "Total Pages"), /*#__PURE__*/React.createElement("th", null)), booksNodes));
}; //access the api


const BooksList = props => {
  if (props.books.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      class: "emptyShelf"
    }, "No books added to the shelf yet."));
  }

  const booksNodes = props.books.map(function (book) {
    console.log(book.title);
    return /*#__PURE__*/React.createElement("tr", {
      key: book._id,
      className: "book",
      onClick: addBookFromBrowse
    }, /*#__PURE__*/React.createElement("td", {
      class: "title"
    }, book.title), /*#__PURE__*/React.createElement("td", {
      class: "genre"
    }, book.genre), /*#__PURE__*/React.createElement("td", {
      class: "review"
    }, book.review));
  });
  console.log(booksNodes);
  return /*#__PURE__*/React.createElement("div", {
    className: "booksList"
  }, /*#__PURE__*/React.createElement("table", {
    align: "center"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Genre"), /*#__PURE__*/React.createElement("th", null, "Review"))), /*#__PURE__*/React.createElement("tbody", null, booksNodes)));
}; //pages read 


const PagesRead = props => {
  if (props.books.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      class: "emptyShelf"
    }, "No pages read yet."));
  }

  let totalPages = 0;
  const pageNodes = props.books.map(function (book) {
    totalPages += parseInt(book.pageNumber);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "pagesRead"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pages"
  }, "You have read ", totalPages, " pages total."));
}; //load information on to the app page


const loadBooksFromServer = () => {
  sendAjax('GET', '/getShelf', null, data => {
    ReactDOM.render( /*#__PURE__*/React.createElement(BooksList, {
      books: data.shelf
    }), document.querySelector("#books"));
    ReactDOM.render( /*#__PURE__*/React.createElement(PagesRead, {
      books: data.shelf
    }), document.querySelector("#pagesRead"));
    ReactDOM.render( /*#__PURE__*/React.createElement("h3", null), document.querySelector("#browse"));
    ReactDOM.render( /*#__PURE__*/React.createElement(BrowseBooksButton, null), document.querySelector("#displayButtons"));
  });
};

const loadAllBooksFromServer = () => {
  sendAjax('GET', '/browse', null, data => {
    ReactDOM.render( /*#__PURE__*/React.createElement(BrowseBooks, {
      books: data.books
    }), document.querySelector("#browse"));
    ReactDOM.render( /*#__PURE__*/React.createElement("h3", null), document.querySelector("#books"));
    ReactDOM.render( /*#__PURE__*/React.createElement("h3", null), document.querySelector("#pagesRead"));
    ReactDOM.render( /*#__PURE__*/React.createElement(ShelfButton, null), document.querySelector("#displayButtons"));
  });
};

const setup = csrf => {
  ReactDOM.render( /*#__PURE__*/React.createElement(PersonalHeader, null), document.querySelector("#header"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BooksForm, {
    csrf: csrf
  }), document.querySelector("#addBook"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BrowseBooksButton, null), document.querySelector("#displayButtons"));
  ReactDOM.render( /*#__PURE__*/React.createElement(BooksList, {
    books: []
  }), document.querySelector("#books"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PagesRead, {
    books: []
  }), document.querySelector("#pagesRead"));
  ReactDOM.render( /*#__PURE__*/React.createElement("h3", null), document.querySelector("#browse"));
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
