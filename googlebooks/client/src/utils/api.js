import axios from "axios";

export default {
  getBooks: function(search) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+ search);

    // return axios.get("https://www.googleapis.com/books/v1/volumes?q=flowers&key=AIzaSyC2oiIbEanxSDxPaqNmUvgrVUV9b4SOQY8");
  },
  getSavedBooks: function(){
    return axios.get("api/books")
  },
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
