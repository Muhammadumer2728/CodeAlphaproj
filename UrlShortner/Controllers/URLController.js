const service = require('../services/URLService');

exports.shortenUrl= async(req,res,next) => {
    try{
    const originalURL = req.body.url;
    if (!originalURL) {
        return res.status(400).json({ error: 'URL is required' });
      }
   const  result = await service.createShortURL(originalURL,process.env.Base_URL);
    res.json(result);
}catch (error) {
    next(error);
}
};

exports.redircetToOriginal = async(req,res,next) => {
    try{
    const code = req.params.code;
     originalURL = await service.getOriginalURL(code);
    if (!originalURL) {
            return res.status(404).json({ message: "URL not found" });
        }
    if(!/^https?:\/\//i.test(originalURL)){
        originalURL = 'http://' + originalURL;
    }
    res.redirect(originalURL);
    }catch (error) {
        next(error);
    }};
