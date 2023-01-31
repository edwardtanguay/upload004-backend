import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import logger from './logger.js';
import * as config from './config.js';

const app = express();
app.use(cors());
app.use(logger);

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/books', (req: express.Request, res: express.Response) => {
	res.json(model.getBooks());
});

app.get('/books/:id', (req: express.Request, res: express.Response) => {
	const id = Number(req.params.id);
	if (isNaN(id)) {
		res.status(400).send({
			error: true,
			message: "sent string, should be number"
		});
	} else {
		const book = model.getBook(id);
		if (book === undefined) {
			res.status(404).send({
				error: true,
				message: "id did not correspond to an existing item"
			});
		} else {
			res.json(book);
		}
	}
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});