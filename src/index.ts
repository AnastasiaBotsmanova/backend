import express from 'express';
import {log} from './log';
import {json} from 'body-parser';

// yarn ts-node-dev src/index.ts

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

let films = [
  {
    id: 1,
    title: 'Аватар',
    raiting: 10,
  },
  {
    id: 2,
    title: 'Атака титанов',
    raiting: 9,
  },
  {
    id: 3,
    title: 'Алиса в стране чудес',
    raiting: 8,
  },
];

app.get('/films', (_req, res) => {
  res.send(films);
});

app.get('/films/:filmId', (req, res) => {
  log.info(req.params);
  res.send(films.find(film => film.id === Number.parseInt(req.params.filmId, 10)));
});

app.post('/films', (req, res) => {
  log.info(req.body);
  const maxId = Math.max(...films.map(film => film.id));
  films.push({
    ...req.body,
    id: maxId + 1,
  });
  res.send(films);
});

app.put('/films/:filmId', (req, res) => {
  log.info(req.params);
  films = films.map(
    film => (film.id === Number.parseInt(req.params.filmId, 10) ? {
      ...req.body,
      id: film.id,
    } : film),
  );
  res.send(films);
});

app.delete('/films/:filmId', (req, res) => {
  log.info(req.params);
  films = films.filter(film => film.id !== Number.parseInt(req.params.filmId, 10));
  res.send(films);
});

app.listen(port, () => {
  log.info(`Example app listening on port ${port}`);
});