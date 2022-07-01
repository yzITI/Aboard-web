import { defineAsyncComponent } from 'vue'

const volumeIndex = {
  List: () => import('./volumes/List.vue'),
  Post: () => import('./volumes/Post.vue'),
  Ten: () => import('./volumes/Ten.vue')
}

const surfaceIndex = {
  ListItem: () => import('./surfaces/ListItem.vue'),
  Comment: () => import('./surfaces/Comment.vue')
}

export const volumes = {}
for (const k in volumeIndex) volumes[k] = defineAsyncComponent(volumeIndex[k])
export const surfaces = {}
for (const k in surfaceIndex) surfaces[k] = defineAsyncComponent(surfaceIndex[k])
