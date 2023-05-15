/* cSpell:disable */

const _ = require('lodash')
const fetch = require('node-fetch')

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

module.exports = function (RED) {

  function wooCommerce (config) {
    RED.nodes.createNode(this, config)

    var node = this
    node.api = RED.nodes.getNode(config.wooAPI)

    const api = new WooCommerceRestApi({
      url: node.api.siteURL,
      consumerKey: node.api.consumerKey,
      consumerSecret: node.api.consumerSecret,
      version: "wc/v3"
    });
    console.log('Woo API has been initialised ' + node.api.siteURL)
    this.log("Something happened");

    node.on('input', function (msg, send, done) {
      // If this is pre-1.0, 'send' will be undefined, so fallback to node.send
      send = send || function () { node.send.apply(node, arguments) }

      this.status({ fill: 'green', shape: 'ring', text: 'online to woo' })
      node = this
      // parse message
      const cmdData = {}
      // #TODO - Map against possible values and validate

      // Pickup any options in the incoming message.
      if (typeof msg.endpoint !== 'undefined') {
        cmdData.endpoint = msg.endpoint
      } else
      {
        //Error out as no endpoint has been defined
        msg.payload = "No Endpoint Defined"
        // Report back the error
        if (done) {
          // Use done if defined (1.0+)
          done()
        } else {
          // Fallback to node.error (pre-1.0)
          node.error(err, msg)
        }
        node.status({ fill: 'red', shape: 'dot', text: 'error' })
        send(msg)
      }


      if (typeof msg.options !== 'undefined') {
        cmdData.modeOptions = msg.options
      };
      console.log('Payload = ' + msg.payload)
      console.log('Compiled Command is:' + JSON.stringify(cmdData))
      if (config.method == 'GET'){
        api.get(msg.payload, cmdData.options)
          .then((response) => {
            // Successful request
            msg.payload = response
                node.status({ fill: 'green', shape: 'dot', text: 'Connected' })
                send(msg)
                // Check done exists (1.0+)
                if (done) {
                  done()
                }
          })
          .catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            // grab the error messasge and send as payload.
              msg.payload = err.message
              // Report back the error
              if (done) {
                // Use done if defined (1.0+)
                done(err)
              } else {
                // Fallback to node.error (pre-1.0)
                node.error(err, msg)
              }
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              send(msg)
          })
          .finally(() => {
            // Always executed.
          });
        }; 
    })
  }

  function woocommerceConfig (n) {
    RED.nodes.createNode(this, n)
    this.siteURL = n.siteURL;
    this.consumerKey = n.consumerKey;
    this.consumerSecret = n.consumerSecret;

  }

  RED.nodes.registerType('woocommerce-config', woocommerceConfig)
  RED.nodes.registerType('woocommerce', wooCommerce)
}
