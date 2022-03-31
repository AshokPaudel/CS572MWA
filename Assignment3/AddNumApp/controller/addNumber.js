module.exports.add = function(req,res){
    console.log("controller invoked with add request: ");
    // const numAtPath = req.params
    console.log(req.url);
    const firstNum = parseInt(req.baseUrl.slice(req.baseUrl.lastIndexOf('/')+1));
    const secondNum = parseInt(req.query.num);
    const result = firstNum + secondNum;
    console.log("firstNum: " + firstNum);
    console.log("path " +req.path);
    console.log(req.params);
    console.log(req.query.num);
    res.status(200).json({'result':result});
};

