const books = require('./books');

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2.1: Destructure first book into title, author, ISBN
let { title, author, ISBN } = books[0];
console.log(title, author, ISBN);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2.2: Destructure first book with keywords into custom variable called tags
let { keywords: tags } = books[0];
console.log(tags);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2.3: 7th book missing 'programmingLanguage' property.
// destructure 'programming' & 'programmingLanguage' with default value
let { language, programmingLanguage = 'unknown' } = books[6];
console.log(language, programmingLanguage);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2.4: Reassign bookTitle & bookAuthor with first book's title & author
let { title: bookTitle, author: bookAuthor } = books[0];
console.log(bookTitle, bookAuthor);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2.5: Destructure deeply nested 'rating' from first book
let {
  thirdParty: {
    goodreads: { rating: bookRating },
  },
} = books[0];
console.log(bookRating);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2.6: Write function called printBookInfo with 3 params (title, author, year)
// argument should be destructured object & log to console provided info
// year info should have default of 'year unknown'

function printBookInfo({ title, author, year = 'year unknown' }) {
  console.log(`${title} by ${author}, ${year}`);
}

printBookInfo(({ title, author, year } = books[0]));

// -------------------------------------------------------------------------------------------------------------------------------------------
