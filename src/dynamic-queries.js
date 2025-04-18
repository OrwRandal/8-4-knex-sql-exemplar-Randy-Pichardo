const knex = require('./knex');

const dangerousDynamicQuery = async () => {
  // This shows how SQL injection can happen when we directly insert values into a query string.
  // The id looks normal, but it actually includes extra SQL that updates the database.
  // Someone could also use something like: `1; DELETE FROM books` to remove data.
  // The function below shows how using a placeholder (?) is a much safer way to prevent this.

  const id = `1; UPDATE books SET title = 'HAHAHACKED'`;

  const query = `SELECT * FROM books WHERE id = ${id};`;
  await knex.raw(query);

  const { rows } = await knex.raw('SELECT id, title FROM books');
  console.log('Hacked output', rows);
  return rows;
};

const safeDynamicQuery = async (id) => {
  // Instead of using string interpolation to insert the value into the query,
  // we use a question mark (?) as a placeholder.
  //
  // Then we pass the value as an array to knex.raw, where it replaces the ? in the query.
  //
  // This method is safer than putting the value directly into the string,
  // because it protects the database from SQL injection.
  // It makes sure the value is treated as data, not SQL code.
  const query = `SELECT * FROM books WHERE id = ?;`;
  const { rows } = await knex.raw(query, [id]);

  console.log('Fancy output', rows);
  return rows;
};

const multipleDynamicParamsQuery = async (pages, isMovie) => {
  // Just like before, we use question marks (?) as placeholders in the query.
  // Now, we're using multiple placeholders, so each value in the array 
  // replaces a corresponding ? in the query, in the same order.
  //
  // In this case, the first ? is replaced by 'pages' and the second ? is replaced by 'isMovie'.
  //
  // This approach is still safe, protecting against SQL injection.

  const query = `SELECT * FROM books WHERE pages > ? AND is_movie = ?;`;

  const { rows } = await knex.raw(query, [pages, isMovie]);
  console.log('Multiple Dynamic Query', rows);
  return rows;
};

module.exports = {
  dangerousDynamicQuery,
  safeDynamicQuery,
  multipleDynamicParamsQuery,
};
