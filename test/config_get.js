/* eslint-disable */
var config = require('./credentials')
this.flow = [
	{
		"id": "n1",
		"type": "woocommerce",
		"z": "c612c71c.4a4f98",
		"wooAPI": "fcfae818.98aca8",
		"name": "woocommerce get",
		"method": "GET",
		"x": 550,
		"y": 240,
		"wires": [
			[
				"nh"
			]
		]
	},
	{
		"id": "fcfae818.98aca8",
		"type": "woocommerce-config",
		"z": "",
		"siteURL": config.siteURL,
        "consumerKey": config.consumerKey,
        "consumerSecret": config.consumerSecret

	},
	{ 
		id: 'nh', 
		type: 'helper' 
	}
]

