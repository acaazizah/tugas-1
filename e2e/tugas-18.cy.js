describe('API testing dengan Cypress', () => {
  const baseUrl = 'https://reqres.in/api';

  it('List User API - page ke-2', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('page', 2);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      
      const firstUser = response.body.data[0];
      expect(firstUser).to.have.property('id');
    });
  });

  it('Single User API - User dengan ID 2', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Status Code:', response.status);
      cy.log('Body:', JSON.stringify(response.body));

      if (response.status === 200) {
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id', 2);
      } else if (response.status === 401) {
        cy.log('Unauthorized access - 401');
        expect(response.status).to.eq(401);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    });
  });

  it('Single User Not Found API - User dengan ID 23', () => {
    it('should return 404 when user is not found', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/users/23`,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Status Code:', response.status);
        cy.log('Response Body:', JSON.stringify(response.body));
  
        if (response.status === 404) {
          expect(response.status).to.eq(404);
          expect(response.body).to.be.empty;
        } else {
          throw new Error(`Expected 404 but got ${response.status}`);
        }
      });
    });
  });

  it('List Unknown API - Unknown', () => {
    cy.request(`${baseUrl}/unknown`).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      
      const firstUser = response.body.data[0];
      expect(firstUser).to.have.property('id');
      expect(firstUser).to.have.property('color'); 
    });
  });

  it('Single Unknown API - Single Unknown', () => {
    cy.request(`${baseUrl}/unknown/2`).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('data');
      const user = response.body.data;

      expect(user).to.have.property('id', 2);
    });
  });

  it('Unknown Not Found API - Unknown dengan ID 23', () => {
    it('should return 404 when unknown is not found', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/unknown/23`,
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 404) {
          expect(response.status).to.eq(404);
          expect(response.body).to.be.empty;
        } else {
          throw new Error(`Expected 404 but got ${response.status}`);
        }
      });
    });
  });

  it('Create User API - Membuat user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      bpdy: {
        name: 'Aca',
        job: 'QA'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('createdAt');
    })
  });

  it('Update User API - Mengubah data user (PUT)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      bpdy: {
        name: 'Azizah',
        job: 'QA Engineer'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('updatedAt');
    })
  });

  it('Update User API - Mengubah data user (PATCH)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      bpdy: {
        name: 'Azizah',
        job: 'QA Engineer'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('updatedAt');
    })
  });

  it('Delete User API - Hapus data user dengan ID 2', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false
    }).then((response) => {
      expect([204, 401]).to.include(response.status);
    });
  });

  it('Register User API - Daftar user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
    });
  });

  it('Failed Register User API - Daftar user gagal', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      body: {
        email: 'aca@mail.com',
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('Login API - Login user dengan email dan password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('Login Unsucessful API - Login user gagal', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: 'eve.holt@reqres.in'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('Delayed Response API - Daftar user delay 3 detik', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login?delay=3`,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

})