import { defineAsyncComponent } from 'vue'

const C = f => defineAsyncComponent(f)

export const volumes = {
  List: {
    name: '列表',
    component: C(() => import('./volumes/List.vue')),
    editor: C(() => import('./volumes/ListEditor.vue'))
  },
  Post: {
    name: '文章',
    component: C(() => import('./volumes/Post.vue')),
    editor: C(() => import('./volumes/PostEditor.vue'))
  },
  Ten: {
    name: 'Ten',
    component: C(() => import('./volumes/Ten.vue'))
  }
}

export const surfaces = {
  ListItem: {
    name: '列表项目',
    component: C(() => import('./surfaces/ListItem.vue')),
    editor: C(() => import('./surfaces/ListItemEditor.vue'))
  },
  Comment: {
    name: '评论回复',
    leaf: true, // no volume
    component: C(() => import('./surfaces/Comment.vue')),
    editor: C(() => import('./surfaces/CommentEditor.vue'))
  }
}