import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const { expect } = chai

describe('Example Controller requests', () => {
  it('[GET] getHome should return welcome message', (done) => {
    chai
      .request(globalThis.baseUrl)
      .get('/api-docs')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })
})
