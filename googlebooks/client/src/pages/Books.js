import React, { Component } from "react";
import API from "../utils/api";
import {DeleteBtn, SaveBtn } from "../components/Buttons";
import { Input, SearchBtn, SavedBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import {Link} from "react-router-dom";


class Books extends Component {
  state = {
    books: [],
    search: ""
  };

  searchBook = event => {
    event.preventDefault();
    API.getBooks(
      this.state.search
    ).then(res => {
      var searchedBooks = [];

      for (var i = 0; i < res.data.items.length; i++) {
        for (var j = 0; j < res.data.items[i].volumeInfo.authors.length; j++) {
          searchedBooks.push({title: res.data.items[i].volumeInfo.title, 
          authors: res.data.items[i].volumeInfo.authors[j], 
          summary: res.data.items[i].searchInfo.textSnippet});
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


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveBook = id => {
    let book;
    for (var i=0; i< this.state.books.length; i++){
      const currentBook = this.state.books[i]
      if(id === currentBook.id){
        book = currentBook;
      }
    }
    API.saveBook(book)
    .then(res => {
      console.log("this is the response", res)
      })
    .catch(err => console.log(err));
  }

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
      <container fluid>
        <form>
          <Input
            value={this.state.search}
            onChange={this.handleInputChange}
            name="search"
            placeholder= "Title or Author (Required)"
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
              <Link to={"/books/" + book._id}>
                <strong>
                  {book.title} by {book.author}
                </strong>
              </Link>
            <p>{book.summary}</p>
            <SaveBtn onClick={() => this.saveBook(book._id)}/>
            </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </container>
    );
  }
}

export default Books;
