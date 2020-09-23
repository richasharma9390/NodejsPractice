const express = require('express');

const feedbackRoute = require('./feedback.js');
const speakerRoute = require('./speaker.js');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async(req, res, next) => {
    //res.send('Hello Express :)');
   // res.sendFile(path.join(__dirname, './static/speakers.html'));
   try{
    const topSpeakers =  await speakerService.getList();
    const allArtWork = await speakerService.getAllArtwork();
    return res.render('layout', {
      pageTitle: 'Welcome',
      template: 'index', 
      topSpeakers, 
      allArtWork
    })
   }catch(err){
     return next(err);
   }
    
  })

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
}

