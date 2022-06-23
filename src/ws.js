import { reactive } from "vue"

const ws = {
  ws: reactive({}),
  connect: function (name) { 
    this.ws = new WebSocket(`ws://localhost:8080?name=${name}`)
    this.ws.onmessage = e => { console.log(e) }
  },
  send: function (msg, callback) {
    const that = this.ws
    this.waitForConnection(function () {
      that.send(msg)
      console.log(that)
      if (typeof callback !== 'undefined') {
        callback()
      }
    }, 1000)
  },
  waitForConnection: function (callback, interval) {
    if (this.ws.readyState === 1) {
      callback()
    } else {
      const that = this
      // optional: implement backoff for interval here
      setTimeout(function () {
        that.waitForConnection(callback, interval)
      }, interval)
    }
  }
}
export default ws