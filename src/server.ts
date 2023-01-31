import express from 'express';
import cors from 'cors';
import * as config from './config.js';
import multer from 'multer'; // uploading
import { join, dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
// TODO: consider upgrade from 3.0 to 5.0 lowdb
import { Low, JSONFile } from 'lowdb'; // database

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, '/data/db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

const app = express();
const port = 5889;

const staticDirectory = path.join(__dirname, './public');
app.use(express.static(staticDirectory));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploadedFiles/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage });

app.use(cors());

// TODO: resolve all TypeScript any types
// TODO: put icons in their own directory, not uploadedFiles
app.get('/fileitems', async (req, res) => {
	await db.read();
	res.send((db.data as any).fileItems);
});

app.post('/uploadfile', upload.single('file'), async (req, res) => {
	await db.read();
	const fileName = req.body.fileName;
	let iconPathAndFileName = '';
	if (fileName.endsWith('.xlsx')) {
		iconPathAndFileName = 'images/general/iconExcel.png';
	} else if (fileName.endsWith('.json')) {
		iconPathAndFileName = 'images/general/iconJson.png';
	} else if (fileName.endsWith('.txt')) {
		iconPathAndFileName = 'images/general/iconText.png';
	} else {
		iconPathAndFileName = `uploadedFiles/${fileName}`
	}

	(db.data as any).fileItems.push({
		title: req.body.title,
		description: req.body.description,
		notes: req.body.notes,
		fileName: req.body.fileName,
		iconPathAndFileName
	});
	await db.write();
	res.json({});
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});