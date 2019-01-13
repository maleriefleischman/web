const http = require('http');
const https = require('https');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/**
 * Setup
 * */

//Get domain from the environment variable DOMAIN
const domain = process.env.DOMAIN;
if (!domain || domain.length === 0)
    throw new Error('You must specify the domain name of this server via the DOMAIN environment variable!');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//parse stuffs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Get SSL configuration
 * */
const key = fs.readFileSync('/etc/pki/tls/private/maleriefleischman.com.key');
const cert = fs.readFileSync('/etc/pki/tls/certs/maleriefleischman.com.cert');
const sslopts = {
    key: key,
    cert: cert
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.HTTPPORT || '80');
app.set('port', port);

const sslPort = normalizePort(process.env.HTTPSPORT || '443');
app.set('sslport', sslPort);

/**
 * Create HTTP server + HTTPS server.
 */

const server = http.createServer(function(req, res) {
    let redirUrl = 'https://' + domain;
    if (sslPort != 443)
        redirUrl += ':' + sslPort;
    redirUrl += req.url;

    res.writeHead(301, {'Location': redirUrl});
    res.end()});
const sslserver = https.createServer(sslopts, app);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
sslserver.listen(sslPort);
sslserver.on('error', onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
}

module.exports = app;
