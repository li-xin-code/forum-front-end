<template>
  <div class="face" @click="faceClick">
    <div v-if="props.value">
      <el-avatar :size="props.size" :src="imgUrl(value)" @error="errorHandler">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
    <div v-else>
      <el-avatar>
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const { proxy } = getCurrentInstance()
const imageBaseUrl = ref('')
const errorHandler = () => true
const imgUrl = computed(() => path => imageBaseUrl.value + path)
const faceClick = () => {
  if (props.useClick) {
    router.push(`/user-info/${props.userId}`)
  }
}

const props = defineProps({
  value: {
    type: String,
    default: '/default.jpeg'
  },
  size: {
    type: Number,
    default: 40
  },
  userId: {
    type: String,
    default: ''
  },
  useClick: {
    type: Boolean,
    default: false
  }
})

onMounted(async () => {
  imageBaseUrl.value = proxy.$image_base_url
})
</script>

<style></style>
