<template>
<div>
  <topic-display :topicId="topicId"/>
</div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import TopicDisplay from '@/components/topic/TopicDisplay.vue'

const topicId = useRoute().params.topicId
</script>
<style>
</style>
