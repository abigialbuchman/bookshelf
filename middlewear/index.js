
const requiresLogin = (req, res, next) =>{
    console.log("login");
    if (!req.session.account){
        return res.redirect('/');
    }
    return next();
};

const requiresLogout = (req, res, next) =>{
    console.log("logout");
    if(req.session.account){
        return res.redirect('/maker');
    }
    return next();
};

const requireSecure = (req,res,next) => {
    console.log("secure");
    if(req.headers['x-forwarded-proto'] !== 'https'){
        return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
};

const bypassSecure = (req, res, next) =>{
    console.log("bypass secure");
    next();
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if(process.env.NODE_ENV === 'production'){
    module.exports.requireSecure = requireSecure;
} else{
    module.exports.requireSecure = bypassSecure;
}

