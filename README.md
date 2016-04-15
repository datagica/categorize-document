# @datagica/classify

Naive document classifier. Because sometimes you really don't need more.

### Installation

   $ npm install --save @datagica/classify

### Usage

```javascript
const Classify = require("@datagica/classify");

const classify = Classify({
  en: {
    show: [ 'tv', 'show', 'tv show', 'tv channel', 'episode'],
    movie: [ 'cinema', 'movie theater', 'movie', 'new movie', 'upcoming movie']
  },
  fr: {
    show: [ 'télé', 'séries', 'séries tv', 'série', 'télévisée',
            'série télévisée', 'série télé', 'série tv', 'épisode'],
    movie: [ 'film', 'nouveau film', 'prochain film', 'cinema' ]
  }
});

classify("in this new tv show").then(result => {
  console.log(result)
})

// will output:
{
  categories: [ 'show', 'en' ],
  score: 2
}


classify("in this upcoming movie").then(result => {
  console.log(result)
})

// will output:
{
  categories: [ 'movie', 'en' ],
  score: 1
}
```

### TODO

For now it will only works for two levels of classification (the two levels are actually required). In the future, this may be changed to be a bit more flexible.
