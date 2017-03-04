'use strict';

class Classify {
  constructor(xy) {
    if (typeof xy === 'undefined') {
      xy = {};
    }
    const categories = Object.keys(xy).reduce((res, x) => {
      Object.keys(xy[x]).map(y => {
        const key = `${x}/${y}`;
        if (typeof res[key] === 'undefined') {
          res[key] = {
            set: new Set(),
            categories: new Set()
          }
        }
        res[key].categories.add(y)
        res[key].categories.add(x)
        xy[x][y].map(word =>
          res[key].set.add(word.trim().toLowerCase())
        )
      });
      return res;
    }, {});

    this.categories = Object.keys(categories).reduce((res, key) => {
      const words = Array.from(categories[key].set.values()).map(x =>
        x.trim().toLowerCase()
      ).join("|");
      res[key] = {
        pattern: new RegExp(`(${words})`, 'gi'),
        categories: Array.from(categories[key].categories.values())
      };
      return res;
    }, {})
  }

  classify(input) {

    let text = ""
    if (input === null || typeof input === 'undefined') {
      throw new Error(`input is invalid`)
    } else if (typeof input === 'string') {
      text = input
    } else if (input instanceof Object && typeof input.text === 'string') {
      text = input.text
    } else {
      throw new Error(`input is not text but ${typeof input}`)
    }

    return Object.keys(this.categories).reduce((detected, category) => {

      const pattern = this.categories[category].pattern;
      const categories = this.categories[category].categories;

      const match = text.match(pattern);
      const score = (match == null) ? 0 : match.length;

      if (score > detected.score) {
        return {
          categories: categories,
          score: score
        }
      } else {
        return detected;
      }
    }, {
      categories: [],
      score: 0
    })
  }
}

function ClassifyFactory(xy) {
  const instance = new Classify(xy);
  return function(input) {
    try {
      return Promise.resolve(instance.classify(input))
    } catch (exc) {
      return Promise.reject(exc)
    }
  }
}
module.exports = ClassifyFactory
module.exports.default = ClassifyFactory
module.exports.Classify = Classify
