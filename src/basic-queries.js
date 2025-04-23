const knex = require('./knex');

/* The knex object above has a knex.raw method that
can be used to execute SQL queries. It will return an
object with a .rows property which will ALWAYS be an
Array containing the requested data (even if only 1 row
was returned).
*/

const selectAllBooks = async () => {
  // We're selecting columns from a specific table, so we write it like:
  // SELECT * FROM table_name
  // In this case, * means all columns, and the table is "books"
  const query = `SELECT * FROM books;`;

  const { rows } = await knex.raw(query);
  return rows;
};

const selectAllTitlesAndGenres = async () => {
  // This time we're selecting multiple specific columns instead of all (*),
  // so we list them like: SELECT column, column FROM table_name
  const query = `SELECT title, genre FROM books;`;

  const { rows } = await knex.raw(query);
  return rows;
};

const selectAllBooksOver250Pages = async () => {
  // The other queries selected all rows from the table.
  // If we want to filter and only get certain rows, we use the WHERE keyword:
  // SELECT * FROM table_name WHERE condition
  // In this case, the condition is: pages > 250
  const query = `SELECT * FROM books 
  WHERE pages > 250;`;

  const { rows } = await knex.raw(query);
  return rows;
};

const insertDuneBook = async () => {
  // If we want to add a new row to a table, we use:
  // INSERT INTO table_name(column1, column2, ...)
  // VALUES(value1, value2, ...)
  //
  // You have to give a value for each column you list.
  // Here, we're adding a book with a title, genre, page count, and whether it's a movie.
  // RETURNING * gives us back the row we just added.
  //
  // PS: You can also insert into tables like:
  // INSERT INTO table_name
  // VALUES(value1, value2, value3, ...)
  //
  // But if you do it that way, you still have to provide a value for every column
  // in the exact order they appear in the table.
  const query = ` 
    INSERT INTO books(title, genre, pages, is_movie)
    VALUES('Dune', 'Sci Fi', 500, false)
    RETURNING *;
  `;

  const { rows } = await knex.raw(query);
  return rows;
};

const updateShortBooksToMovies = async () => {
  // To update rows in a table, we use:
  // UPDATE table_name
  // SET column = new_value
  // WHERE condition
  //
  // Without WHERE, it updates every row — so we usually add a condition.
  // Here, we're setting is_movie to true for books with less than 150 pages.
  // RETURNING * gives us the updated rows.
  const query = ` 
    UPDATE books
    SET is_movie = true
    WHERE pages < 150
    RETURNING *;
  `;

  const { rows } = await knex.raw(query);
  return rows;
};

const deleteDuneBook = async () => {
  // To delete rows from a table, we use:
  // DELETE FROM table_name WHERE condition
  //
  // Without a WHERE clause, it would delete all rows.
  // Here, we're deleting the book with the title 'Dune'.
  const query = `DELETE FROM books 
  WHERE title = 'Dune'`;

  const { rowCount } = await knex.raw(query);
  return { rowCount };
};

module.exports = {
  selectAllBooks,
  selectAllTitlesAndGenres,
  selectAllBooksOver250Pages,
  insertDuneBook,
  updateShortBooksToMovies,
  deleteDuneBook,
};
