require('dotenv').config();
const app = require('express')();
const weatherRoute = require('./routes/weather');
const quakeRoute = require('./routes/quake');
const quakeListRoute = require('./routes/list-quake');
const quakeLowListRoute = require('./routes/list-low-quake');
const responseCreator = require('./utils/responseCreator');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || '';

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
  next();
});

app.use('/weather', weatherRoute);
app.use('/quake', quakeRoute);
app.use('/list-quake', quakeListRoute);
app.use('/list-low-quake', quakeLowListRoute);

app.get('/', (req, res) => {
  return res.status(200).send({
    endpoint: {
      quake: `${BASE_URL}/quake`,
      listQuake: `${BASE_URL}/list-quake`,
      listLowQuake: `${BASE_URL}/list-low-quake`,
      weather: {
        province: {
          example: `${BASE_URL}/weather/jawa-barat`,
        },
        city: {
          example: `${BASE_URL}/weather/jawa-barat/bandung`,
        },
      },
    },
  });
});

app.all('*', (req, res) => {
  return res.status(404).send(responseCreator({ message: 'Not found' }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
