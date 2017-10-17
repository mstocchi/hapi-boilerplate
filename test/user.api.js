/* global describe, beforeEach, before, it, expect, db, server */
'use strict';

describe('Authentication', () => {
  describe('POST /user/login', () => {
    
    it('return 200 HTTP status code with a valid token', (done) => {

      let options = {
        method: 'POST',
        url: '/user/login',
        payload: {
          email: 'teylune@gmail.com',
          password: 'password'
        }
      };

      server.inject(options, (response) => {
        let token = response.result.token;
        expect(response).to.have.property('statusCode', 200);
        expect(response.result).to.have.property('token').and.to.be.a('string');
        done();
      });
    });

    it('return 404 HTTP status code with invalid user', (done) => {

      let options = {
        method: 'POST',
        url: '/user/login',
        payload: {
          email: 'noone@nomail.org',
          password: 'password'
        }
      };

      server.inject(options, (response) => {
        let token = response.result.token;
        expect(response).to.have.property('statusCode', 404);
        expect(response.result).to.have.property('message', 'user not found or bad credentials');
        done();
      });
    });

    it('return 404 HTTP status code with invalid password', (done) => {
      
            let options = {
              method: 'POST',
              url: '/user/login',
              payload: {
                email: 'teylune@gmail.com',
                password: 'wrongpassword'
              }
            };
      
            server.inject(options, (response) => {
              let token = response.result.token;
              expect(response).to.have.property('statusCode', 404);
              expect(response.result).to.have.property('message', 'user not found or bad credentials');
              done();
            });
          });

  });
});

describe('Routes /user', () => {
  let token;

  before((done) => {
    let options = {
      method: 'POST',
      url: '/user/login',
      payload: {
        email: 'teylune@gmail.com',
        password: 'password'
      }
    };

    server.inject(options, (response) => {
      token = response.result.token;
      done();
    });
  });

  describe('GET /user/:id', () => {

    it('return 200 HTTP status code', (done) => {

      let options = {
        method: 'GET',
        url: '/user/1',
        headers: { 'Authorization': token }
      };

      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        done();
      });
    });
  });
});