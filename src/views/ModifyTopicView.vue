<template>
  <div class="content">
    <topic-form :isModify="true" :topicBody="{ ...topic }" v-if="isAuthor"/>
    <div v-else>
      禁止访问
    </div>
  </div>
</template>

<script setup>
import TopicForm from '@/components/topic/TopicForm.vue'
import { getOneTopic } from '@/api/topic.js'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'
import { useStore } from '../store'
import { onMounted, ref, reactive } from 'vue'

const topicId = useRoute().params.topicId
const authorId = ref('')
const isAuthor = computed(() => {
  return useStore().getUserId() === authorId.value
})
const topic = reactive({
  topicId: '',
  title: '',
  content: '',
  author: '',
  authorId: '',
  face: '',
  createTime: '',
  modifyTime: ''
})
onMounted(async () => {
  const detail = await getOneTopic(topicId)
  authorId.value = detail.authorId;
  ((arra, arrb) => Object.keys(arra).forEach(key => {
    arra[key] = arrb[key] || arra[key]
  }))(topic, detail)
})
</script>

<style>

</style>
