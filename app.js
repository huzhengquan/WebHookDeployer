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
	const req_token = (yield cobody.json(this))['token'];
	const reqid = this.path.substring(1);
	const tasks = require('./config')['tasks'];
	if(!tasks.hasOwnProperty(reqid)){
		return this.status = 404;
	}
	if(tasks[reqid]['token']!=req_token){
		return this.status = 403;
	}
	console.log('run',tasks[reqid]);
	exec(tasks[reqid]['command'],function(err, stdout, stderr){
		if(stderr) console.log('command stderr:',stderr);
		if(stdout) console.log('command stdout:',stdout);
	});
	this.body='running';
});

app.listen(conf.port || 3000);
