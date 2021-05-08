const { reset } = require("nodemon");

//handle the books
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
                  action="/shelf" 
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
};
//set up the buttons
const BrowseBooksButton = (e) => {
    return(
        <div>
            <button id="broweBooksButton"
                    onClick={loadAllBooksFromServer}
            >Browse</button>
        </div>
    );
};
const ShelfButton = (e) => {
    return(
        <div>
            <button id="shelfButton"
                    onClick={loadBooksFromServer}
            >Show Shelf</button>
        </div>
    );
};
//set up the browse books list
const BrowseBooks = (props) => {
    if(props.books.length === 0){
        return(
            <div>
                <h3 class="emptyBrowseList">There are no books to browse at the moment</h3>
            </div>
        );
    }

    const booksNodes = props.books.map(function(book){
       
        return(
                <tr key={book._id} className="book">
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>{book.pageNumber}</td>
                </tr>
        );
    });

    return(
        <div className="BrowseBookList">
            <h3>Browse All Books</h3>
            <table align="center">
            <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Total Pages</th>
            </tr>
            {booksNodes}
            </table>
        </div>
    );
};
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
                <tr key={book._id} className="book">
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>{book.review}</td>
                </tr>
        );
    });

    console.log(booksNodes);

    return(
        <div className="booksList">
            <table align="center">
            <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Review</th>
            </tr>
            {booksNodes}
            </table>
        </div>
    );
};
//pages read 
const PagesRead = (props) =>{
    if(props.books.length === 0){
        return(
            <div>
                <h3 class="emptyShelf">No pages read yet.</h3>
            </div>
        );
    }

    let totalPages = 0;
    const pageNodes = props.books.map(function(book){
        
        totalPages += parseInt(book.pageNumber);
    });


    return(
        <div className="pagesRead">
            <h3 className="pages">You have read {totalPages} pages total.</h3>
        </div>
    )
};
//load information on to the app page
const loadBooksFromServer = () =>{
    sendAjax('GET', '/getShelf', null, (data)=>{
        ReactDOM.render(
            <BooksList books={data.shelf}/>, document.querySelector("#books")
        );
        ReactDOM.render(
            <PagesRead books={data.shelf}/>, document.querySelector("#pagesRead") 
        );
        ReactDOM.render(
            <h3></h3>, document.querySelector("#browse")
        );
        ReactDOM.render(
            <BrowseBooksButton />, document.querySelector("#displayButtons")
        );
    });
};

const loadAllBooksFromServer = () =>{
    sendAjax('GET', '/browse', null, (data)=>{
        ReactDOM.render(
            <BrowseBooks books={data.books}/>, document.querySelector("#browse")
        );
        ReactDOM.render(
            <h3></h3>, document.querySelector("#books")
        );
        ReactDOM.render(
            <h3></h3>, document.querySelector("#pagesRead") 
        );
        ReactDOM.render(
            <ShelfButton />, document.querySelector("#displayButtons")
        );
    });
}

const setup = (csrf) =>{
    ReactDOM.render(
        <BooksForm csrf={csrf} />, document.querySelector("#addBook")
    );

    ReactDOM.render(
        <BrowseBooksButton />, document.querySelector("#displayButtons")
    );

    ReactDOM.render(
        <BooksList books={[]} />, document.querySelector("#books")
    );

    ReactDOM.render(
        <PagesRead books={[]}/>, document.querySelector("#pagesRead")
    );

    ReactDOM.render(
        <BrowseBooks books={[]} style="display:none"/>, document.querySelector("#browse")
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