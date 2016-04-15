const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const classify = require("../lib/classify").default({
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

describe('@datagica/classify', () => {

  describe('classify simple documents', () => {

    it('should work for simple sentences', done => {

      const tests =  [
        {
          input: "in this new tv show",
          output: {
            categories: [ 'show', 'en' ],
            score: 2
          }
        },
        {
          input: "in this upcoming movie",
          output: {
            categories: [ 'movie', 'en' ],
            score: 1
          }
        }
      ];

      Promise.all(tests.map(test =>
        classify(test.input).then(output => expect(output).to.be.like(test.output))
      )).then(res => done()).catch(err => console.error(err))
    })

  })

})
