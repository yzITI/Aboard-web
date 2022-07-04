import { reactive } from 'vue'

export const state = reactive({
  user: {},
  block: {},
  children: {},
  // for editor
  draft: {},
  editor: {}
})

export default state

const ws = new WebSocket(`wss://s.yzzx.org/aboard`)
ws.onerror = () => { Swal.fire('网络错误', '', 'error') }
ws.json = (N, ...A) => ws.send(JSON.stringify({ N, A }))
ws.onclose = () => { console.log('close') }

export function auth (jwt, onauth) {
  const sendAuth = () => ws.json('auth', jwt)
  if (ws.readyState === 1) return sendAuth()
  ws.onopen = sendAuth
}

export const send = ws.json

export function goto (_id) {
  state.block = { _id }
  state.children = {}
  send('block.get', _id)
}

ws.onmessage = e => {
  const data = JSON.parse(e.data), N = data.N, A = data.A || []
  if (N === 'auth') return state.user = A[0]
  if (N === 'block.error' && state.block._id == A[0]) {
    goto(state.block.parent)
  }
  if (N === 'block.one' && state.block._id == A[0]._id) {
    state.block = A[0]
  }
  if (N === 'block.children' && state.block._id == A[0]) {
    for (const id in A[1]) state.children[id] = A[1][id]
  }
  if (N === 'block.removeChildren' && state.block._id == A[0]) {
    delete state.children[A[1]]
  }
}

setInterval(() => {
  send('heartbeat')
}, 5e3)
