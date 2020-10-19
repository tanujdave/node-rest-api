import Book from "../models/book.js";

class BookService {

  /**
   * Read all books.
   */
  async readAll() {
    try {
      const books = await Book.find();
      return { status: 200, data: books };
    } catch (err) {
      throw new Error(err);
    }
  }  

  /**
   * Create new book entry.
   * 
   * @param {Books} book 
   */
  async save(book) {
    try {
      await book.save();
      return { status: 201, data: book };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Updated existing book.
   * 
   * @param {Number} bookId 
   * @param {Object} updateBook 
   */
  async update(bookId, updateBook) {
    try {
      await Book.updateOne({ _id: bookId }, { $set: updateBook });
      return { status: 201, data: {} };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Delete given book.
   * 
   * @param {Number} bookId 
   */
  async delete(bookId) {
    try {
      await Book.deleteOne({ _id: bookId });
      return { status: 204 };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new BookService();
