<template>
  <div class="content">
    <topic-form :topicId="topicId" v-if="isAuthor"/>
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
import { onMounted, ref } from 'vue'

const topicId = useRoute().params.topicId
const authorId = ref('')
const isAuthor = computed(() => {
  return useStore().getUserId() === authorId.value
})
onMounted(async () => {
  const detail = await getOneTopic(topicId)
  authorId.value = detail.authorId
})
</script>

<style>

</style>
