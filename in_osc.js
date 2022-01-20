const colors = require('colors/safe');
const osc=require("osc");
const internalIp = require('internal-ip');
const Message = require("./message").Message;

const InOSC = function (output, port = 8005) {
    this.port = port;
    this.mps = 0;

    setInterval(function () {
        if (this.mps > 0) console.info( colors.green( "received " + this.mps + " messages per second"));
        this.mps = 0;
    }.bind(this), 1000);

    console.log(colors.cyan("starting osc receiver on port " + this.port));

    this._udpPort = new osc.UDPPort({
        localAddress: internalIp.v4.sync(),
        localPort: this.port,
        metadata: true
    });

    this._udpPort.on("error", function (error) { /* do not remove this */
    });
    this._udpPort.open();

    this._udpPort.on("message", function (oscMsg) {
        const arr = [];
        for (let i = 0; i < oscMsg.args.length; i++)
            arr.push(oscMsg.args[i].value);

        output.send(new Message("" + oscMsg.address, arr));

        this.mps++;
    }.bind(this));

};

module.exports.InOSC=InOSC;
