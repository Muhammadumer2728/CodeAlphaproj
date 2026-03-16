const model = require('../models/urlModel');
const nanoid = require('nanoid');
 exports.createShortURL = async ( _originalURL,baseurl) => {
    try{
        const code = nanoid.nanoid(6);
        const newURL = new model({
            code,
            originalURL: _originalURL,
        });
        await newURL.save();
        return { shortURL: `${baseurl}/api/${code}` };
    
    } catch (error) {
        throw new Error('Error creating short URL '+error.message);
    }};

exports.getOriginalURL = async (code) => {
    try{
       const url = await model.findOne({ code });
  if (!url) throw new Error("URL not found");
  url.clicks += 1;
  await url.save();
  return url.originalURL;

} catch (error) {
        throw new Error('Error fetching original URL\n'+error.message);}
    }