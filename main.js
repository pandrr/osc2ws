"use strict"

const InOSC = require("./in_osc").InOSC;
const OutWebSocket = require("./out_ws").OutWebSocket;
const internalIp = require('internal-ip');
const colors = require('colors/safe');


// --------------------------------------



const OutputManager = function () {
    this._outputs = [];
};

OutputManager.prototype.add=function(o)
{
    this._outputs.push(o);
}

OutputManager.prototype.send=function(msg)
{
    // console.log('[send]',msg.id,':',typeof msg.v);

    for(let i=0; i<this._outputs.length; i++)
    {
        this._outputs[i].send(msg);
    }
}

// --------------------------------------




console.log(colors.underline.cyan("local ip:",''+internalIp.v4.sync()));

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question( colors.bgGreen(`🎛 Enter OSC receiver port (7000-12000): `), port => {
    const output=new OutputManager();
    const outWs=new OutWebSocket();
    outWs.start();
    output.add(outWs);
    const osc=new InOSC(output, port);
    readline.close()
})





// --------------------------------------


