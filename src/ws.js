import { reactive } from "vue"
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
  console.log(d)
  if (i === 'list') {
    topicList.push(...d)
  }
  ws.send({ i })
}

function eventData (o, i, d = {}) {
  ws.send(JSON.stringify({ o, i, d }))
  ws.send(JSON.stringify({ o: 'topic.create', i: 'create', d: { title: 'test1', content: '# some test content'} }))
  ws.send(JSON.stringify({ o: 'topic.create', i: 'create2', d: { title: 'test2', content: '# some test content'} }))
  ws.send(JSON.stringify({ o: 'topic.create', i: 'create3', d: { title: 'test3', content: '# some test content'} }))
  ws.send(JSON.stringify({ o: 'topic.create', i: 'create4', d: { title: 'test44444444444444', content: '# some test content'} }))
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