"use strict"
const app = require('koa')(),
			exec = require('child_process').exec,
			cobody = require('co-body');


app.use(require("koa-logger")());

app.use(function *(next){
	if(this.method!='POST'){
		return this.status = 404;
	}
	const reqid = this.path.substring(1);
	const conf = require('./config');
	if(!conf.tasks.hasOwnProperty(reqid)){
		return this.status = 404;
	}
	console.log('run',conf.tasks[reqid]);
	exec(conf.tasks[reqid]['command'],function(err, stdout, stderr){
		if(stderr) console.log('command stderr:',stderr);
		if(stdout) console.log('command stdout:',stdout);
	});
	this.body='running';
});

app.listen(conf.port || 3000);
