const handleError = (message) => {
    $("#errorMessage").text(message);
    console.log(message);
    $("#bookMessage").animate({width:'toggle'},350);
};

const redirect = (response) => {
    $("#bookMessage").animate({width:'toggle'},350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) =>{
    console.log('Ajax sent');
    console.log(action);
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success, 
        error: function(xhr, status, error){
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.erro);
        }
    });
};

