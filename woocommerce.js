/* cSpell:disable */

const WooCommerceRestApi = require("woocommerce-rest-ts-api").default;

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

    this.log('Woo API has been initialised ' + node.api.siteURL);

    node.on('input', function (msg, send, done) {
      this.status({ fill: 'green', shape: 'ring', text: 'online to woo' })
      node = this
      // parse message
      const cmdData = {}
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
          node.error(msg)
        }
        node.status({ fill: 'red', shape: 'dot', text: 'error' })
        send(msg)
      }
      if (typeof msg.params !== 'undefined') {
        cmdData.params = msg.params
      };
     
      if (config.method == 'GET'){
        this.log('Configured Method is ' + config.method);
        api.get(cmdData.endpoint, cmdData.params)
          .then((response) => {
            // Successful request
            msg.payload = response
                node.status({ fill: 'green', shape: 'dot', text: 'Connected' })
                send(msg)
                done()

          })
          .catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            // grab the error messasge and send as payload.
              msg.payload = error.message
              // Report back the error
              done(error)
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              send(msg)
          })
          .finally(() => {
            // Always executed.
          });
        }; 
      if (config.method == 'POST'){
        api.post(cmdData.endpoint, msg.payload, cmdData.options)
          .then((response) => {
            // Successful request
            msg.payload = response
                node.status({ fill: 'green', shape: 'dot', text: 'Connected' })
                send(msg)
                done()  
          })
          .catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            // grab the error messasge and send as payload.
              msg.payload = error.message
              done(error)
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              send(msg)
          })
          .finally(() => {
            // Always executed.
          });
        };
      if (config.method == 'PUT'){
        api.put(cmdData.endpoint, msg.payload, cmdData.options)
          .then((response) => {
            // Successful request
            msg.payload = response
                node.status({ fill: 'green', shape: 'dot', text: 'Connected' })
                send(msg)
                done()
                
          })
          .catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            // grab the error messasge and send as payload.
              msg.payload = error.message
              // Report back the error
              done(error)
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              send(msg)
          })
          .finally(() => {
            // Always executed.
          });
        };
      if (config.method == 'DELETE'){
        api.delete(cmdData.endpoint, cmdData.options)
          .then((response) => {
            // Successful request
            msg.payload = response
                node.status({ fill: 'green', shape: 'dot', text: 'Connected' })
                send(msg)
                done()
                
          })
          .catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            // grab the error messasge and send as payload.
              msg.payload = error.message
              // Report back the error
              done(error)
              node.status({ fill: 'red', shape: 'dot', text: 'error' })
              send(msg)
          })
          .finally(() => {
            // Always executed.
          });
        };
      if (config.method == 'OPTIONS'){
        api.options(cmdData.endpoint, cmdData.options)
          .then((response) => {
            // Successful request
            msg.payload = response
                node.status({ fill: 'green', shape: 'dot', text: 'Connected' })
                send(msg)
                done()
                
          })
          .catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            // grab the error messasge and send as payload.
              msg.payload = error.message
              // Report back the error
              done(error)
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
