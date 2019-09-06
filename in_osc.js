var colors = require('colors/safe');
const osc=require("osc");
const internalIp = require('internal-ip');
var Message = require("./message").Message;

var InOSC=function(output)
{
    this.port=9000;
    this.mps=0;

    setInterval(function()
    {
        if(this.mps>0) console.log("received "+this.mps+" messages");
        this.mps=0;
    }.bind(this),1000);

    console.log(colors.cyan("starting osc receiver on port "+this.port));

    this._udpPort = new osc.UDPPort({
        localAddress: internalIp.v4.sync(),
        localPort: this.port,
        metadata: true
    });
    
    this._udpPort.on("error", function (error) { /* do not remove this */});
    this._udpPort.open();
    
    this._udpPort.on("message", function (oscMsg)
    {
        const arr=[];
        for(var i=0;i<oscMsg.args.length;i++)
            arr.push(oscMsg.args[i].value);

        output.send(new Message(""+oscMsg.address,arr));

        this.mps++;
    }.bind(this));

}

module.exports.InOSC=InOSC;
