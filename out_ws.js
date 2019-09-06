var colors = require('colors/safe');
const WebSocket = require('ws');

var OutWebSocket=function()
{
    this.port=8000;
    this._websocket=null;
    this._clients=[];
}


OutWebSocket.prototype.start=function()
{
    const wss = new WebSocket.Server(
        {
            port: this.port,
            perMessageDeflate: false
        });

    console.log(colors.cyan('starting websocket server on port '+this.port));
      
    wss.on('connection', function connection(websock)
    {
        
        this._clients.push(websock);
        console.log(colors.yellow('[websocket] client has connected! ('+this._clients.length+')'));
        this._logNumClients();

        websock.on('close', function close() {
            console.log(colors.red('[websocket] client disconnected'));
            this._removeClient(websock);
          }.bind(this));
    
        websock.on('message', function incoming(message)
        {
            // console.log('received: %s', message);
        });
        websock.on('error', function(error) {
            if(error != null) {
             console.log('error: %s', error);
             this._removeClient(websock);
             websock.close();
             websock._socket.destroy();
             Client.splice(findClient(websock.upgradeReq.url));
             
        }
      }.bind(this));
    
    }.bind(this));
}

OutWebSocket.prototype._logNumClients=function(ws)
{
    console.log(colors.cyan('[websocket] numclients '+this._clients.length));
}

OutWebSocket.prototype._removeClient=function(ws)
{
    this._clients.splice(this._clients.indexOf(ws));
    this._logNumClients();
}

OutWebSocket.prototype.send=function(msg)
{
    var str=JSON.stringify(msg);

     
    for(var i=0;i<this._clients.length;i++)
    {
        if (this._clients[i].readyState !== WebSocket.OPEN) { 
            console.log(colors.red('[websocket] client '+i+' readystate ',this._clients[i].readyState));
            continue;
          } 
    
        this._clients[i].send(str);
    }

}

module.exports.OutWebSocket=OutWebSocket;