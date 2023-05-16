# node-red-contrib-woocommerce
 Interface to WooCommerce

Single node that currently allows GET, POST and PUT methods to an instance of Woocommerce.  

## Getting started
Generate API credentials (Consumer Key & Consumer Secret) following this instructions http://docs.woocommerce.com/document/woocommerce-rest-api/ .

Check out the WooCommerce API endpoints and data that can be manipulated in http://woocommerce.github.io/woocommerce-rest-api-docs/.

### Supports:

msg.endpoint - the various endpoints as documented above
msg.params - various query parameters.
msg.payload - data to be sent to WooCommerce - No payload required for GET/DELETE/OPTIONS Method.

This is basically a wrapper around the Node API
https://www.npmjs.com/package/woocommerce-rest-ts-api

So please follow the examples there.  I will post some examples when I remember how it is done!

### Credits
As mentioned this is basically just a node red wrapper around the node wrapper for the WooCommerce API.
Original version was by the WooCommerce team.

https://github.com/woocommerce/woocommerce-rest-api-js-lib

but had not been updated for the last 2 years.  Then I found an recently updated version which fixed many dependencies by Yuri Lima 
https://www.npmjs.com/package/woocommerce-rest-ts-api

