<template>
  <div id="face" v-if="props.value">
    <el-avatar :size="props.size" :src="imgUrl(value)" @error="errorHandler">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      />
    </el-avatar>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref, onMounted, computed } from 'vue'

const { proxy } = getCurrentInstance()
const imageBaseUrl = ref('')
const errorHandler = () => true
const props = defineProps({
  value: {
    type: String,
    default: 'default.jpeg'
  },
  size: {
    type: Number,
    default: 60
  }
})
const imgUrl = computed(() => path => imageBaseUrl.value + path)

onMounted(async () => {
  imageBaseUrl.value = proxy.$image_base_url
})
</script>

<style>
</style>
