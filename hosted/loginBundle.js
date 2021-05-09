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
const handleLogin = e => {
  e.preventDefault(); //$("#bookMessage").animate({width:'hide'}, 350);

  if ($("#user").val() === '' || $('#pass').val() === '') {
    handleError("Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

const handleSignup = e => {
  e.preventDefault(); //$("#bookMessage").animate({width:'hide'},350);

  if ($("#user").val() === '' || $("#pass").val() === '' || $("#pass2").val() === '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

const LoginWindow = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign in"
  }));
};

const SignupWindow = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign Up"
  }));
};

const Information = () => {
  return /*#__PURE__*/React.createElement("div", {
    class: "information"
  }, /*#__PURE__*/React.createElement("h1", null, "bookshelf"), /*#__PURE__*/React.createElement("p", null, "bookshelf is a web api that helps you track your reading habits. log and reviews books to your account, and access previously read books with ease."), /*#__PURE__*/React.createElement("div", {
    class: "btn"
  }, /*#__PURE__*/React.createElement("a", {
    id: "loginButton",
    href: "/login"
  }, "Login")), /*#__PURE__*/React.createElement("div", {
    class: "btn"
  }, /*#__PURE__*/React.createElement("a", {
    id: "signupButton",
    href: "/signup"
  }, "Sign up")));
};

const createLoginWindow = csrf => {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

const createSignupWindow = csrf => {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

const setup = csrf => {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");
  signupButton.addEventListener("click", e => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", e => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); //default views
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
