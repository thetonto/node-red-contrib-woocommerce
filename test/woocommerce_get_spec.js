/* eslint-disable no-undef */

var helper = require('node-red-node-test-helper')
var woo = require('../woocommerce.js')
var config = require('./config_get')
var cred = require('./credentials')

var flow = config.flow

helper.init(require.resolve('node-red'))

describe('WooCommerce Node', function () {
  // Change timeout as the woo is quite slow
  this.timeout(40000)
  beforeEach(function (done) {
    helper.startServer(done)
  })

  afterEach(function (done) {
    helper.unload()
    helper.stopServer(done)
  })

  it('should be loaded', function (done) {
    helper.load(woo, flow, function () {
      var n1 = helper.getNode('n1')

      n1.should.have.property('name', 'woocommerce get')
      done()
    })
  })

  it('should have an URL Property', function (done) {
    helper.load(woo, flow, function () {
      var n1 = helper.getNode('n1')
      n1.api.should.have.property('siteURL', cred.siteURL)
      done()
    })
  })

  it('should have an Consumer Key Property', function (done) {
    helper.load(woo, flow, function () {
      var n1 = helper.getNode('n1')
      n1.api.should.have.property('consumerKey', cred.consumerKey)
      done()
    })
  })

  it('should have an Consumer Secret Property', function (done) {
    helper.load(woo, flow, function () {
      var n1 = helper.getNode('n1')
      n1.api.should.have.property('consumerSecret', cred.consumerSecret)
      done()
    })
  })

  it('should get and order', function (done) {
    helper.load(woo, flow, function () {
      var n1 = helper.getNode('n1')
      var nh = helper.getNode('nh')
      console.log('Test message')
      nh.on('input', function (msg) {
        console.log('Testing:' + JSON.stringify(msg))
        // msg.payload.employees[0].should.have.property('firstName', 'John');
        msg.payload.should.have.property('statusText', 'OK')
        done()
      })
      //jn1.receive({payload:jsonString,topic: "bar"});
      n1.receive({payload: '', endpoint: 'orders/2172' })
    })
  })
})
