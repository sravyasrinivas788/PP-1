const asynchandler = (fn) => (req, res, next) => {
    fn(req, res, next).then().catch(next);
};

module.exports={asynchandler}