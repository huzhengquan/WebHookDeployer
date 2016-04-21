"use strict"
const app = require('koa')(),
			exec = require('child_process').exec,
			cobody = require('co-body');


app.use(require("koa-logger")());

const conf = require('./config');

function todo(filter, req_data){
	if(!filter)return true;
	for(let k in filter){
		if(!req_data.hasOwnProperty(k) || req_data[k]!=filter[k]){
			return false;
		}
	}
	return true;
}

app.use(function *(next){
	if(this.method!='POST'){
		return this.status = 404;
	}
	const req_data = yield cobody.json(this);
	console.log('req_data:',req_data);
	const reqid = this.path.substring(1);
	const tasks = require('./config')['tasks'];
	if(reqid=='' || !tasks.hasOwnProperty(reqid)){
		return this.status = 404;
	}
	const task = tasks[reqid];
	if(! todo(task['filter'], req_data)){
		this.body = "403";
		return this.status = 403;
	}
	console.log('command: ',task['command']);
	exec(task['command'],function(err, stdout, stderr){
		if(err) console.log('command err:',err);
		if(stderr) console.log('command stderr:',stderr);
		if(stdout) console.log('command stdout:',stdout);
	});
	this.body='done';
});

app.listen(conf.port || 3000);
