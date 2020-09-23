const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');


const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(cookieSession({
  name: 'Session',
  keys: ['ytrtyuytytuyti', 'uyttuyttyrtrtr']
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, './static')));
app.locals.siteName = 'Meetups';

app.use(async(req, res, next) => {
  try{
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    return next();
  }catch(err){
    return next(err);
  }
});

app.use('/', routes({
  feedbackService,
  speakerService
}))

app.use((req, res, next)=>{
  return next(createError(404,'Page not found'))
})

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  const status = error.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error');
})
// app.get('/', (req, res) => {
//   //res.send('Hello Express :)');
//   res.sendFile(path.join(__dirname, './static/index.html'));
// })


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
