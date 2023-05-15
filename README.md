# node-red-contrib-woocommerce
 Interface to WooCommerce

Single node that currently allows GET, POST and PUT methods to an instance of Woocommerce.  

## Getting started
Generate API credentials (Consumer Key & Consumer Secret) following this instructions http://docs.woocommerce.com/document/woocommerce-rest-api/ .

Check out the WooCommerce API endpoints and data that can be manipulated in http://woocommerce.github.io/woocommerce-rest-api-docs/.

### Supports:

msg.endpoint - the various endpoints as documented above
msg.params - various query parameters.
msg.payload - data to be sent to WooCommerce - No payload required for GET Method.

This is basically a wrapper around the Node API
https://www.npmjs.com/package/woocommerce-rest-ts-api

Which is an updated version of the node api that the Woocommerce site will link you to.

I have not implemented the delete options as did not have a use for it but will do if there is interest.
