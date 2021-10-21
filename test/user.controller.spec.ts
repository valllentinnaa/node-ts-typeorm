import chai from 'chai'
import chaiHttp from 'chai-http'
const { expect } = chai

chai.use(chaiHttp)

describe('User Controller requests', () => {
  describe('[POST] /register should', () => {
    it('work with non-existing email and all fields filled out', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/register')
        .send({ email: 'example2@example.com', name: 'example user', password: 'example2' })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          done()
        })
    })
    it('not work with existing email', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/register')
        .send({ email: 'example2@example.com', password: 'example2' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
    })
    it('not work without name', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/register')
        .send({ email: 'john2@example.com', password: 'test' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
    })
    it('not work without password', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/register')
        .send({ email: 'john2@example.com', name: 'John2' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
    })
  })

  describe('[POST] /login should', () => {
    // before(async (done) => {
    //   await useSeeding()

    //   const user = await factory(User)().make()
    //   await factory(User)().create()

    //   console.log(user)
    //   await runSeeder(CreateUsers)
    //   done()
    // })

    it(' work with correct login info and return token', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/login')
        .send({ email: 'example2@example.com', password: 'example2' })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.token).not.to.equal(undefined)
          done()
        })
    })
    it('not work with incorrect password', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/login')
        .send({ email: 'example2@example.com', password: 'something' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
    })
    it('not work with incorrect email', (done) => {
      chai
        .request(globalThis.baseUrl)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'example2' })
        .end((err, res) => {
          expect(res.status).to.equal(404)
          done()
        })
    })
  })
})

describe('[POST] /forgot-password should', () => {
  // it('work with existing email', (done) => {
  //   chai
  //   .request(globalThis.baseUrl)
  //   .post('/auth/forgot-password',)
  //   .send({email: 'example@example.com'})
  //   .end((err, res) => {
  //     expect(res.body.message).to.equal(0)
  //     expect(res.status).to.equal(204);
  //     done()
  //   })
  // })
  it('not work with not-existing email', (done) => {
    chai
      .request(globalThis.baseUrl)
      .post('/api/auth/forgot-password')
      .send({ email: 'someone@example.com' })
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })
})
