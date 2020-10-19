import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";
import mongoose from "mongoose";
import bookService from "../services/book.js";
import Book from "../models/book.js";

Joi.objectId = JoiObjectId(Joi);

/**
 * Validate Book object schema.
 *
 * @param {Book} book
 */
const BookValidator = (book) => {
  const bookSchema = Joi.object({
    _id: Joi.objectId().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().length(10),
    releaseDate: Joi.date().iso(),
  });

  return bookSchema.validate(book);
};

export default (restApp) => {
  restApp.get("/books", async (req, res) => {
    try {
      const response = await bookService.readAll();
      res.statusCode = response.status;

      return res.json({
        status: response.status,
        message: `Fetch book data successfully.`,
        data: response.data,
      });
    } catch (err) {
      res.statusCode = 500;
      return res.json({ status: 500, message: err.message });
    }
  });

  restApp.put("/books/:bookId", async (req, res) => {
    try {
      const { bookId } = req.params;
      const updateOps = {};
      for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
      }

      const response = await bookService.update(bookId, updateOps);
      res.statusCode = response.status;

      return res.json({
        status: response.status,
        message: `Book #${bookId} updated successfully.`,
        data: response.data,
      });
    } catch (err) {
      res.statusCode = 500;
      return res.json({ status: 500, message: err.message });
    }
  });

  restApp.delete("/books/:bookId", async (req, res) => {
    try {
      const { bookId } = req.params;
      const response = await bookService.delete(bookId);
      res.statusCode = response.status;

      return res.json({
        status: response.status,
        data: response.data,
        message: `Book #${bookId} deleted successfully.`,
      });
    } catch (err) {
      res.statusCode = 500;
      return res.json({ status: 500, message: err.message });
    }
  });

  restApp.post("/books", async (req, res) => {
    try {
      const { author, title, isbn, releaseDate } = req.body;
      const book = new Book({
        _id: new mongoose.Types.ObjectId().toString(),
        author: author,
        title: title,
        isbn: isbn,
        releaseDate: releaseDate,
      });

      const { error } = BookValidator(book._doc);
      if (error) {
        const errorDetail = error.details.find((detail, idx) => {
          if (idx === 0) return detail;
        });
        res.statusCode = 500;
        return res.json({ status: 500, message: errorDetail.message });
      }

      const response = await bookService.save(book);
      res.statusCode = response.status;

      return res.json({
        status: response.status,
        data: response.data,
        message: `Book created successfully.`,
      });
    } catch (err) {
      res.statusCode = 500;
      return res.json({ status: 500, message: err.message });
    }
  });
};
