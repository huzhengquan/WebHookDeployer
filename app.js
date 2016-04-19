"use strict"
const app = require('koa')(),
			exec = require('child_process').exec,
			cobody = require('co-body');


app.use(require("koa-logger")());

const conf = require('./config');

app.use(function *(next){
	if(this.method!='POST'){
		return this.status = 404;
	}
	const reqid = this.path.substring(1);
	if(!conf.tasks.hasOwnProperty(reqid)){
		return this.status = 404;
	}
	console.log('run',conf.tasks[reqid]);
	exec(conf.tasks[reqid]['command'],function(err, stdout, stderr){
		console.log('stderr:',stderr);
		console.log('stdout:',stdout);
	});
	this.body='run';
});

app.listen(conf.port || 3000);
