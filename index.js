const server = require('./api/server');
const PORT = process.env.PORT || 3800;

// temp check
server.get('/', (req, res) => {
  res.send('api up and running')
});

server.listen(PORT, () => console.log(`\n=== API ALIVE ON PORT ${PORT}===\n`));