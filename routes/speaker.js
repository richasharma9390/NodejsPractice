const express = require('express');

const router = express.Router();

module.exports = (params) => {
  
  const { speakerService } = params;
 
  router.get('/', async(req, res, next) => {
    //res.send('Hello Express :)');
   // res.sendFile(path.join(__dirname, './static/speakers.html'));
   try{
    const speakers =  await speakerService.getList();
    const allArtWork = await speakerService.getAllArtwork();
    return res.render('layout', {pageTitle: 'Speakers', template: 'speakers', speakers, allArtWork})
   }catch(err){
     return next(err);
   }
  })
  router.get('/:speakername', async(req, res, next) =>{
    try{
    const speaker = await speakerService.getSpeaker(req.params.speakername);
    const artWork = await speakerService.getArtworkForSpeaker(req.params.speakername);
    //return res.send(`Detail page of ${req.params.speakername}`)
    return res.render('layout', {pageTitle: 'Speaker_Detail', template: 'speakerDetail', speaker, artWork})
    }catch(err){
      return next(err);
    }
    
  })

  
  return router;
}