const books = require('./books');

// -------------------------------------------------------------------------------------------------------------------------------------------
// 4.1: Destructure first book, 'keywords' property into mainKeyword and rest
let [mainKeyword, ...theRest] = books[0].keywords;
console.log(mainKeyword, theRest);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 4.2: Destructure 2nd book into bookPublisher & restOfBook with 'publisher' property
let { publisher: bookPublisher, ...restOfBook } = books[1];
console.log(bookPublisher, restOfBook);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 4.3: Write fn called printBookAuthorsCount with 2 params title, authors
// authors accept any number args.

const printBookAuthorsCount = function (title, ...authors) {
  console.log(`The book ${title} has ${authors.length} authors`);
};

printBookAuthorsCount('Algorithms', 'Robert Sedgewick', 'Kevin Wayne');
// -------------------------------------------------------------------------------------------------------------------------------------------
