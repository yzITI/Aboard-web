<script setup>
const tips = ['Blue plays', 'Blue wins!', 'Red plays', 'Red wins!', 'Draw.']
const colors = { '-1': 'bg-blue-500', '0': 'bg-white', '1': 'bg-red-400' }
let board = $ref([]), block = $ref(0), cho = $ref(1), winner = $ref(0)
let tip = $computed(() => {
  if (!board[0][0]) return tips[cho + 1]
  if (winner) return tips[cho + 2]
  return tips[4] // draw
})

function gridColor (i, j) {
  if (board[0][i]) return 'opacity-0'
  if (!board[i][j] && block && i !== block) return 'bg-gray-300'
  return colors[board[i][j]]
}

function checkWin (arr) {
  if (Math.abs(arr[1] + arr[5] + arr[9]) === 3) return true
  if (Math.abs(arr[3] + arr[5] + arr[7]) === 3) return true
  for (let i = 1; i < 8; i += 3) if (Math.abs(arr[i] + arr[i + 1] + arr[i + 2]) === 3) return true
  for (let i = 1; i < 4; i++) if (Math.abs(arr[i] + arr[i + 3] + arr[i + 6]) === 3) return true
  return false
}

function checkEnd (arr) {
  for (let i = 1; i < 10; i++) {
    if (arr[i] === 0) return false
  }
  return true
}

function act (i, j) {
  if (board[0][0] || board[i][0] || board[i][j]) return
  if (block !== 0 && i !== block) return
  board[i][j] = cho
  if (checkWin(board[i])) { // block win
    board[0][i] = cho
    board[i][0] = 1
  } else if (checkEnd(board[i])) board[i][0] = 1
  if (checkWin(board[0])) { // game win
    winner = cho
    board[0][0] = 1
  } else if (checkEnd(board.map(x => x[0]))) board[0][0] = 1
  if (board[0][0]) return // game ended
  cho = -1 * cho
  block = board[j][0] ? 0 : j
}

function restart () {
  cho = 1, block = 0, winner = 0
  for (let i = 0; i < 10; i++) {
    board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
}
restart()
</script>

<template> 
  <div class="h-screen w-screen bg-slate-200 flex flex-col justify-center items-center">
    <div class="font-serif text-3xl my-4">Ten</div>
    <div class="py-2 px-4 my-4 rounded-full bg-white">{{ tip }}</div>
    <div class="grid grid-cols-3 my-4">
      <div v-for="i in 9" class="border-2 grid grid-cols-3" :class="colors[board[0][i]]">
        <div v-for="j in 9" @click="act(i, j)" class="all-transition p-4 sm:p-6 cursor-pointer border" :class="gridColor(i, j)"></div>
      </div>
    </div>
  </div>
</template> 