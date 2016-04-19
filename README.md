# WebHookDeployer
通过git&amp;webhook部署上线应用

## 安装

```
git clone https://github.com/huzhengquan/WebHookDeployer.git
mv config.json.sample config.json
```

## 配置

edit config.json
```
{
	"port": 3000,
	"tasks": {
			"task_id":{
				"token": "efb",
				"command": "date && sleep 10 && date"
			}
	}
}
```

webhook的网址：
```
http://hostname:port/:task_id
```
`:task_id`对应的是`config['tasks']`的key。

## 启动

```
node app.js # pm2 start app.js
```
