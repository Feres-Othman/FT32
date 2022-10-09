// Njibou l'express package
const express = require('express')
const app = express();

const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')


const UserRouter = require('./routes/UserRouter')
const PlayerRouter = require('./routes/PlayerRouter')
const LeagueRouter = require('./routes/LeagueRouter')
const NewsRouter = require('./routes/NewsRouter')
const DesignationRouter = require('./routes/DesignationRouter')
const CalendarRouter = require('./routes/CalendarRouter')
const CategoryRouter = require('./routes/CategoryRouter')
const TeamRouter = require('./routes/TeamRouter')
const MatchRouter = require('./routes/MatchRouter')



// const ApiRoute = require('./routes/api')
var bodyParser = require('body-parser');

app.use(express.json({ limit: '50mb' }));

require("dotenv").config();

// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');
// app.use(busboy());
// app.use(busboyBodyParser());


// Body-parser 
// Body-parser y5alina naccediw lel "req.body" object
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

const connect = mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/FT3",
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.use('/auth', AuthRoute)
app.use('/api/user', UserRouter)
app.use('/api/match', MatchRouter)
app.use('/api/player', PlayerRouter)
app.use('/api/league', LeagueRouter)
app.use('/api/news', NewsRouter)
app.use('/api/designation', DesignationRouter)
app.use('/api/calendar', CalendarRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/team', TeamRouter)


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {

  // if(req.session.userID){
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
  // }else{
  //   res.redirect("/login");
  // }


});

http.listen(port, () => {
  console.log(`Server up and running on PORT: ${port} `)
});