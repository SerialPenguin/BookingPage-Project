



import { createServer, Model, Response } from 'miragejs';

export function makeServer() {
  let server = createServer({
    models: {
      user: Model,
      activity: Model,
      booking: Model,
      time:Model,
    },
    
    seeds(server) {
      server.create('user', { 
        id: 5,
        username: 'Alex',
        password: 'AlexPassword',
        role: 'USER',
        activities: [],
      });
      server.create('user', { 
        id: 6,
        username: 'Anna',
        password: 'AnnaPassword',
        role: 'ADMIN',
        activities: [ ],
      });
      server.create('user', {
        id: 7,
        username: 'Roger',
        password: 'RogerPassword',
        role: 'USER',
        activities: [
          {
            id: 1,
            title: 'Boxing',
            content: 'Boxing in the mud',
            date: new Date(2023, 5, 20, 14, 0),
            maxCount: 10,
          },
        ],
    });
      
      
      server.create('activity', { 
        id: 1,
        title: 'Boxing',
        content: 'Boxing in the mud',
        date:new Date(2023, 9, 7, 14, 0), 
        maxCount: 20,
      });
      server.create('activity', { 
        id: 2,
        title: 'Spinning',
        content: 'Indoor cycling',
        date: new Date(2023, 8, 5, 12, 30),
        maxCount: 7,
      });
      server.create('activity', {
        id: 3, 
        title: 'Gym',
        content: 'Strength training',
        date: new Date(2023,9,13, 9, 0),
        maxCount: 2,
      });
      server.create('activity', { 
        id: 4,
        title: 'Aerobics',
        content: 'Cardio workout',
        date: new Date(2023, 9, 13, 10, 30),
        maxCount: 15,
      });
    },

    routes() {
      this.get('/user', (schema, request) => {
        const { queryParams } = request;
        const { username, password } = queryParams;

        const user = schema.users.findBy({ username: username, password });

        if (user) {
          return new Response(200, { 'Content-Type': 'application/json' }, user);
        } else {
          return new Response(401, { 'Content-Type': 'application/json' }, { error: 'Invalid credentials' });
        }
      });

      this.get('/users', (schema) => {
        const users = schema.db.users;
        return new Response(200, { 'Content-Type': 'application/json' }, users);
      });
      
      

      this.post('/login', (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({ username: username, password });
      
        if (user) {
          return new Response(200, { 'Content-Type': 'application/json' }, user);
        } else {
          return new Response(401, { 'Content-Type': 'application/json' }, { error: 'Invalid credentials' });
        }
      });
      

      this.get('/activities', (schema) => {
        return new Response(200, { 'Content-Type': 'application/json' }, schema.db.activities);
      });

      this.post('/bookings', (schema, request) => {
        console.log('Received booking request:', request.requestBody);
        try {
          const bookingData = JSON.parse(request.requestBody);
          const booking = schema.bookings.create(bookingData);
          console.log('Created booking:', booking);
          return booking;
        } catch (error) {
          console.error('Error creating booking:', error);
          return new Response(500); // Return a 500 status code on error
        }
      });
      // ...

this.post('/activities', (schema, request) => {
  const activityData = JSON.parse(request.requestBody);
  const activity = schema.activities.create(activityData);
  return activity;
});

// ...

    },
  });

  return server;
}







