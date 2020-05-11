import React, { Component } from "react";
import API from "../utils/api";
import {DeleteBtn} from "../components/Buttons";
import { Input, SearchBtn, SavedBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
// import {Link} from "react-router-dom";


class Books extends Component {
  state = {
    books: [],
    search: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  searchBook = event => {
    event.preventDefault();
    API.getBooks(
      this.state.search
    ).then(res => {
      var searchedBooks = [];

      for (var i = 0; i < res.data.items.length; i++) {
        for (var j = 0; j < res.data.items[i].volumeInfo.authors.length; j++) {
          searchedBooks.push({title: res.data.items[i].volumeInfo.title, authors: res.data.items[i].volumeInfo.authors[j], summary: res.data.items[i].searchInfo.textSnippet});
        }
      }
      console.log("title/author", searchedBooks)
      this.setState({
        books: searchedBooks
      })
    })
      .catch(err => console.log(err)
      );
    console.log("books", this.state.books)
  }

  loadBooks = () => {
    API.getSavedBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      API.saveBook({
        title: this.state.search
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  }


  render() {
    return (
      <div>
        <form>
          <Input
            value={this.state.search}
            onChange={this.handleInputChange}
            name="search"
            placeholder="Title or Author (Required)"
          />
          <SearchBtn
            disabled={!this.state.search}
            onClick={this.searchBook}>Search
              </SearchBtn>
        </form>



        <SavedBtn onClick={this.loadBooks}>Saved books</SavedBtn>

        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book._id}>
                <a href={"/books/" + book._id}>
                  <strong>
                    {book.title} by {book.authors}
                  </strong>
                </a>
            <p>{book.summary}</p>
                <DeleteBtn onClick={() =>
                  this.deleteBook(book._id)} />
              </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
    );
  }
}

export default Books;
