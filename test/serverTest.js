import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import AStudent from '../src/core/domain/Student.js';
import model from '../models';

const { Student } = model;
const { expect } = chai;
chai.use(chaiHttp);

describe('Api server repository tests', () => {
  const testStudent = new AStudent(
    'olifedayo90@gmail.com', 'dada', 'mathew', '0908654321',
  );

  const testStudentB = new AStudent(
    'olifedayo90@gmail.com', 'dada', 'mathew', '0908654321',
  );
  let sample;
  before(async () => { sample = await Student.create(testStudentB); });
  after(async () => {
    Student.destroy({ where: {}, force: true });
  });
  it('Should create a student record', (done) => {
    chai.request(app)
      .post('/api/v1/create-student')
      .send(testStudent)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.eql('Created Successfully');
        done();
      });
  });

  it('Should list student records', (done) => {
    chai.request(app)
      .get('/api/v1/list-students')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.data).to.be.an('Array');
        expect(res.body.status).to.eql('success');
        done();
      });
  });

  it('Should  update record with right ID', (done) => {
    console.log(sample.dataValues.id);
    chai.request(app)
      .put('/api/v1/update-student')
      .query({ id: sample.dataValues.id })
      .send({
        firstName: 'Mayowa',
        lastname: 'Motun',
        email: 'mumu@mumu.com',
        phone: 'mulumbu',
      })
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        done();
      });
  });

  it('Should  delete record with right ID', (done) => {
    console.log(sample.dataValues.id);
    chai.request(app)
      .delete('/api/v1/delete-student')
      .query({ id: sample.dataValues.id })
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        done();
      });
  });
});
