/**
 * Created by AlpOzkan on 3.7.2016.
 */
//Setup
var express=require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

//Configuration
mongoose.connect('mongodb://localhost/reviewking');
//mongoose.connect('mongodb://alpozkan:Alp111222@ds011664.mlab.com:11664/heroku_qcl5z0g0');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended':'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type:'application/vnd.api+json'
}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,DELETE,PUT');
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

//Models
var Review = mongoose.model('Review',{
    title:String,
    description:String,
    rating:Number
},'reviews');

//Routes

//Get reviews
app.get('/api/reviews',function (req, res) {
    console.log("fecting reviews");

    Review.find(function (err, reviews) {
        if(err)
            res.send(err);
        res.json(reviews);
    });
});

//create reviews and send back all reviews after creation
app.post('/api/reviews', function(req, res) {
    console.log("creating review");
    // create a review, information comes from AJAX request from Ionic
    Review.create({
        title : req.body.title,
        description : req.body.description,
        rating: req.body.rating,
        done : false
    }, function(err, review) {
        if (err)
            res.send(err);

        // get and return all the reviews after you create another
        Review.find(function(err, reviews) {
            if (err)
                res.send(err)
            res.json(reviews);
        });
    });

});

//delete
app.delete('/api/reviews/:review_id', function(req, res) {
    Review.remove({
        _id : req.params.review_id
    }, function(err, review) {
        if (err)
            res.send(err);
    });
});

//Listen
app.listen(8080);
console.log("App listening on port 8080");









