import React, { Component } from "react";
import API from "../utils/api";
import {DeleteBtn, SaveBtn } from "../components/Buttons";
import { Input, SearchBtn, SavedBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import {Link} from "react-router-dom";

class Saved extends Component {

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getSavedBooks()
      .then(res => {
        console.log("this res.data", res.data)
      this.setState({ books: res.data })
    } )
      .catch(err => console.log(err));
  };
  
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

render() {
    return (
      <container fluid>
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
              <Link to={"/books/" + book._id}>
                <strong>
                  {book.title} by {book.author}
                </strong>
              </Link>
            <p>{book.summary}</p>
              <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
export default Saved;