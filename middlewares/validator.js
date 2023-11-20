exports.validateId = (req, res, next) => {
    const id = req.params.id;

    //an objectID is a 24-bit Hex String
    //id has to follow this pattern. It can only contain 0-9, lowercase/uppercase a through f, and has to be 24 digits.
    //checks if the route parameter is NOT a valid ObjectId type value
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
      let err = new Error('Invalid event id');
      err.status = 400;
      next(err);
    } 
    next();
}