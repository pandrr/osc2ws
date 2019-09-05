"use strict"

var InOSC = require("./in_osc").InOSC;
var OutWebSocket = require("./out_ws").OutWebSocket;
const internalIp = require('internal-ip');
var colors = require('colors/safe');


// --------------------------------------

var OutputManager=function()
{
    this._outputs=[];
}

OutputManager.prototype.add=function(o)
{
    this._outputs.push(o);
}

OutputManager.prototype.send=function(msg)
{
    // console.log('[send]',msg.id,':',typeof msg.v);

    for(var i=0;i<this._outputs.length;i++)
    {
        this._outputs[i].send(msg);
    }
}

// --------------------------------------

console.log(colors.underline.cyan("local ip:",''+internalIp.v4.sync()));

const output=new OutputManager();
const outWs=new OutWebSocket();
outWs.start();
output.add(outWs);



// --------------------------------------

const osc=new InOSC(output);
