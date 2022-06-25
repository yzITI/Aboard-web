import { ref, reactive } from 'vue'
export const draft = ref('')

export const topicList = reactive([])

export const receiver = ref(null)

export const topic = ref({ title: '', content: '' })
