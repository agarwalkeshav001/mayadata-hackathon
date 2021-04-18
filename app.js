var express = require("express"),
    app     = express(),
    path    = require("path"),
    bodyParser = require('body-parser'),
    Mongoose = require("mongoose");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'views')));

    Meet = require('./models/meet.js')

    const uri = "mongodb+srv://keshav:keshav@cluster0.jkysr.mongodb.net/Mayadata?retryWrites=true&w=majority";

    Mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

    const conn = Mongoose.connection
    conn.once('open',()=>{
        console.log("Connected to mongodb");
    })

    app.get('/home',(req,res)=>{
        Meet.find({}, function(err, data) {
            res.render('home.ejs', {meets: data})
        })  
    })

    app.get('/about',(req,res)=>{
        res.render('about.ejs');
    })

    app.get('',(req,res)=>{
        res.redirect('home');
    })


    app.post('/addmeet',(req,res)=>{
        
            var mname = req.body.mname;
            var no = req.body.no;
            var date = req.body.date;
            var start = req.body.start;
            var end =  req.body.end;
            
        
            Meet.create({
                m_name:mname,
                no:no,
                date:date,
                start:start,
                end:end
        
            }
            
            ,(err)=>{
                if(err){
                   res.status(500).send(err);
                }
                
                else{
                    res.redirect('/home');
                }
            }    
                
    )})
    
    app.post('/delmeet',(req,res)=>{
        console.log(req.body.dmeet);
        Meet.deleteOne({'_id':Object(req.body.dmeet)},function(err,obj){
            if(err) res.send(err);
            else
            res.redirect('/home');
        })
    })
        
    var port = process.env.PORT || 3000
    app.listen(port, () => {
    console.log(`Server live at port: ${port}`)
})