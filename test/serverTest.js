import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import ApiRepo from '../src/api/ApiRepo.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Api server repository tests', () => {
  let status; let json; let res; let repo; let next;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    next = {};
    status.returns(res);
    const dataSource = sinon.spy();
    const dataRepo = sinon.spy();
    repo = new ApiRepo();
    repo.dataRepo = dataRepo;
    repo.dataSource = dataSource;
  });
  it('it should create a student record', async () => {
    const req = {
      body: {
        email: 'olifedayo95@gmail.com', firstName: 'ayooluwa', lastName: 'Olosunde', phone: '0908776767',
      },
    };

    await new ApiRepo().createStudent(req, res, next);
    console.log(status.calledOnce);
    // expect(res.send.calledOnce).to.be.equal(true);
  });
});
