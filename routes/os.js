var express = require('express');
const os = require('os')
var router = express.Router();

router.get('/',function(req,res){
    res.status(200).json({
        hostname:os.hostname(),
         type:os.type(),
         platform:os.platform()
    })
}

)

router.get('/cpus',function(req,res){
    res.status(200).json({
        model:os.cpus(),
         speed:os.uptime(),
         platform:os.uptime()
    })
}

)


router.get('/cpus/:id',function(req,res){
    if (req.params.id === '1'){
        res.status(200).json({
            model:os.cpus(),
             speed:os.uptime(),
             platform:os.uptime()
        })
    }else {
        res.status(404).json({error:'proc not found'})
    }
}

)



module.exports = router;