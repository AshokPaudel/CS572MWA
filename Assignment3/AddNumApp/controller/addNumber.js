module.exports.add = function(req,res){
    console.log("controller invoked with add request: ");

    // const firstNum = parseInt(req.baseUrl.slice(req.baseUrl.lastIndexOf('/')+1));
    const firstNum = parseInt(req.params.firstNum);
    const secondNum = parseInt(req.query.num);
    const result = firstNum + secondNum;
    console.log("firstNum: " + firstNum);
    console.log("path " +req.path);
    res.status(200).json({'result':result});
};

