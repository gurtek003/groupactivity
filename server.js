//ITE5315--Professor: Shahdad
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

var app = express();
// const port = 5000;

// Set Templating Engine
const exphbs  = require('express-handlebars');

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',

    helpers: {
        calculation: function (num) {
            return num + 10 ;
        },
        strong: function(options) {
            return '<strong>' + options.fn(this) + '</strong>';
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Navigation
app.get('', (req, res)=> {
    res.render('index', {
          // do not use the default Layout (main.hbs) 
    });
})

app.get('/register', (req, res)=> {
    res.render('register', {
    layout : 'other'    
    });
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
        

], (req, res)=> {
    
    const errors =  validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
      
        const alert = errors.array()
        res.render('register', {
            errs: alert,
            // layout: false // do not use the default Layout (main.hbs) 
        });
    }
    else res.render('output', {
        data: 'nothing`',
        // layout: false 
   
     });
   
})

app.listen(HTTP_PORT);

