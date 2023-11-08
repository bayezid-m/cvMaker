 function isEmailValied(next){
    // const email = req.body.email
    // if(email.includes('@') === false || email.includes('.') === false){
    //     console.log("email not valied");
    // }
    console.log("Middle ware working");
    next();
}

module.exports= isEmailValied
