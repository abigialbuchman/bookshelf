//hanlde the books
const handleBooks = (e) =>{
    e.preventDefault();

    console.log("Book Submitted");

    if($("#titleField").val() === '' || $("#genreField").val === '' ||
         $('#genreField').val === '' || $('#pageField').val === '')
        {
            handleError("All fields are required");
            return false;
        }
    sendAjax('POST', $("#bookAddForm").attr("action"), $("#bookAddForm").serialize(), function() {
        loadBooksFromServer();
    });
};
//form
const BooksForm = (props) =>{
    return (
        <div>
            <div id="postDiv" class="formDiv">
            <form id="bookAddForm" 
                  onSubmit={handleBooks}
                  action="/maker" 
                  method="POST"
                  className="booksForm">
            <h3>Add A Book!</h3>
            <label for="title">Title: </label>
            <input id="titleField" type="text" name="title"/>
            <label for="genre">Genre: </label>
            <select id="genreField" name="genre">
                <option value="fiction">Fiction</option>
                <option value="science fiction/fantasy">Science Fiction/Fantasy</option>
                <option value="romance">Romance</option>
                <option value="mystery">Mystery</option>
                <option value="horror">Horror</option>
                <option value="nonfiction">Non-Fiction</option>
                <option value="other">Other</option>
            </select>
            <label for="pageNumber">Page Count:</label>
            <input id="pageField" type="number" name="pageNumber" />
            <label for="review">Review:</label>
            <textarea id="reviewField" name="review">Leave a Review...</textarea>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" value="Add Book"/>
            </form>
            </div>
        </div>
    );
}
//access the api
const BooksList = (props) => {
    if(props.books.length === 0){
        return(
            <div>
                <h3 class="emptyShelf">No books added to the shelf yet.</h3>
            </div>
        );
    }


    const booksNodes = props.books.map(function(book){
        console.log(book.title);
        return(
            <div key={book._id} className="book">
                <h3>Title: {book.title}</h3>
            </div>
        );
    });

    console.log(booksNodes);

    return(
        <div className="booksList">
            {booksNodes}
        </div>
    );
};
//load information on to the app page
const loadBooksFromServer = () =>{
    sendAjax('GET', '/getBooks', null, (data)=>{
        ReactDOM.render(
            <BooksList books={data.books}/>, document.querySelector("#books")
        );
    });
};

const setup = (csrf) =>{
    ReactDOM.render(
        <BooksForm csrf={csrf} />, document.querySelector("#addBook")
    );

    ReactDOM.render(
        <BooksList books={[]} />, document.querySelector("#books")
    );

    loadBooksFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});