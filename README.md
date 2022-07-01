# aboard-web

Aboard is a board, not abroad.

## Block Render

All blocks are indexed in the file `/src/blocks.js`

The volume will be automatically rendered in the `/src/views/Home.vue`, while the surfaces block should be rendered in the volume block.

Guided by `state.js`

- `Home.vue` decides which volume to render
- volume decides how to render itself (obviously)
- volume decides which surfaces to render

## Navigation

There is a `goto(_id)` function in `/src/state.js`, it will automatically trigger block and children update and automatically render the volume block.
