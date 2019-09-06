# osc2ws
OSC to Websocket proxy

Sadly, browsers can not receive OSC data. This little tool receives OSC messages and serves them via websockets.
You can then use your browsers websocket API to connect to it and receive the data.


## installation

please install node.js for your operating system. open a terminal in the osc2ws directory and type:

`npm i`

## start

`node main.js`

After starting up, it should look like this:

```
Local IP: 192.168.1.169
Starting websocket server on port 8000
Starting OSC receiver on port 9000
```

Now connect your websocket to `ws://localhost:8000`
Send OSC data to `192.168.1.169:9000`
