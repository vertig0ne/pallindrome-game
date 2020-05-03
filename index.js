// ES6 Imports
import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';

// Workaround for __dirname using ES6 stylings
const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

// Expect either JSON or x-www-form-urlencoded from POST's
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Always output nice JSON so we can read it
app.set('json spaces', 2);

app.use(express.static(__dirname));
app.get('/', (req, res) => {
	res.render('index.html');
});

// Dynamically load routes
Object.values(routes).forEach(({ name, router }) => {
  app.use(`/api/${name}`, router);
});

// Set port to either env variable or 3000, then listen on it
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server', process.pid, 'listening on port', port);
});
