#!/usr/bin/env node
//var debug = require('debug')('expressiso');
var app = require('../app');

var server = app.listen(app.get('port'), function() {
    //debug('Express server listening on port ' + server.address().port);
});