const knex = require('./knex');

const countNumberOfBooks = async () => {
  // We want to know how many books are in the table.
  // To do that, we use COUNT(*), which goes through all the rows
  // and returns a single number — the total count.
  //
  // The * means we're counting every row, not just from a specific column.
  const query = `SELECT Count(*) FROM books`;

  const { rows } = await knex.raw(query);
  console.log('Number of books:', rows);
  return rows;
};

const selectAllLongOrMovieBooks = async () => {
  // We want to find books that are either long (more than 250 pages)
  // OR ones that have a movie version.
  //
  // To check multiple conditions, we use OR or AND in the WHERE clause.
  // OR means if *either* condition is true, the row will be included.
  const query = `SELECT * FROM books
  WHERE pages > 250 OR is_movie = true`;

  const { rows } = await knex.raw(query);
  console.log('Long or movie books:', rows);
  return rows;
};

const selectBooksBetween150And300Pages = async () => {
  // We want to find books where both conditions are true:
  // pages > 150 AND pages < 300.
  //
  // AND means both sides of the condition must be true for the row to be included.
  // So this gives us books with more than 150 pages and less than 300.
  const query = `SELECT * FROM books 
  WHERE pages > 150 AND pages < 300`;

  const { rows } = await knex.raw(query);
  console.log('150-300:', rows);
  return rows;
};

const orderBooksByPages = async () => {
  // The ORDER BY keyword lets us choose the order the rows come back in.
  // By default, it sorts in ascending (ASC) order — from smallest to largest.
  // You can also use DESC for descending order (largest to smallest).
  //
  // Here, we're sorting books by page count from shortest to longest.
  // Example: ORDER BY pages DESC would give us longest to shortest. const query = `SELECT * FROM books ORDER BY pages`;
  const { rows } = await knex.raw(query);
  console.log('Short to long:', rows);
  return rows;
};

const selectLongestBook = async () => {
  // We’re selecting all books and ordering them by page count in descending order,
  // so the longest book will show up first.
  //
  // Then we use the LIMIT keyword to only return that first row.
  // LIMIT lets us choose how many rows we want the query to return.
  const query = `SELECT * FROM books 
  ORDER BY pages DESC LIMIT 1`;

  const { rows } = await knex.raw(query);
  console.log('Longest Book:', rows);
  return rows;
};

const aliasIsMovie = async () => {
  // Sometimes we want the results to look cleaner or more readable for whoever’s using them.
  //
  // We can use the AS keyword to rename a column in the result.
  // Syntax: SELECT column_name AS "New Name"
  //
  // Here, we’re renaming is_movie to "Already Filmed"
  const query = `SELECT title, is_movie AS "Already Filmed" FROM books`;

  const { rows } = await knex.raw(query);
  console.log('Fancy output', rows);
  return rows;
};

const countBooksInGenres = async () => {
  // Earlier, we used COUNT(*) to get the total number of books in the table.
  // Now, we want to count how many books there are in each genre.
  //
  // To do that, we use GROUP BY. It groups rows that have the same value in a column.
  // Then COUNT(*) runs for each group.
  //
  // So this query gives us one row per genre, along with the number of books in that genre.
  const query = `SELECT genre, Count(*) FROM books
   GROUP BY genre`;

  const { rows } = await knex.raw(query);
  console.log('Genre count', rows);
  return rows;
};

module.exports = {
  countNumberOfBooks,
  selectAllLongOrMovieBooks,
  selectBooksBetween150And300Pages,
  orderBooksByPages,
  selectLongestBook,
  aliasIsMovie,
  countBooksInGenres,
};
