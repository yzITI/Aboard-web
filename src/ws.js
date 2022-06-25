import { reactive, shallowReadonly } from "vue"
import { topicList } from './plugins/state.js'

const ws = {
  ws: reactive({}),
  connect: function (name) { 
    console.log(name)
    this.ws = new WebSocket(`ws://localhost:8080?name=${name}`)
    const that = this.ws
    that.onmessage = e => ack(e)
    that.onopen = eventData('topic.list', 'list', {})
  },
  send: function (msg, callback) {
    const that = this.ws
    waitForConnection(function () {
      that.send(msg)
      if (typeof callback !== 'undefined') {
        callback()
      }
    }, 1000)
  },
}

function ack (e) {
  const { d, i } = JSON.parse(e.data)
  // TODO: update list based on different situation
  if (i === 'list') {
    topicList.push(...d)
  }
  ws.send({ i })
}

function eventData (o, i, d = {}) {
  ws.send(JSON.stringify({ o, i, d }))
}

function waitForConnection (callback, interval) {
  if (ws.ws.readyState === 1) {
    callback()
  } else {
    // optional: implement backoff for interval here
    setTimeout(function () {
      waitForConnection(callback, interval)
    }, interval)
  }
}
export default ws