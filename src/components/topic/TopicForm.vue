<template>
  <div>
    <div class="topic-form" v-if="!isLogin">
      <div class="border">
        <el-input v-model="topic.title" placeholder="Please input title" class="title" />
        <uedit ref="editorRef" :value="topic.content" @input="input" class="edit" />
      </div>
      <el-button type="primary" @click="publish">发布</el-button>
    </div>
    <div v-else>
      未登陆,<el-button type="text" @click="toLogin"> 去登陆 </el-button>
    </div>
  </div>
</template>
<script setup>
import Uedit from '@/components/common/Uedit.vue'
import { addTopic, modifyTopic } from '@/api/topic.js'
import { onMounted, reactive, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const store = useStore()
const router = useRouter()
const editorRef = ref(null)
const topic = reactive({
  title: '',
  content: ''
})

const props = defineProps({
  topicBody: {
    type: Object,
    default: () => ({}),
    require: false
  },
  isModify: {
    type: Boolean,
    default: false,
    require: false
  }
})

const isLogin = computed((t = store.getToken()) => t === null || t.length === 0)
const toLogin = () => router.push('/login')
const input = (newValue) => {
  topic.content = newValue
}
const publish = async () => {
  const { title, content } = topic
  const form = { title, content }
  if (props.isModify) {
    form.topicId = props.topicBody.topicId
    if (await modifyTopic(form)) {
      router.push(`/topic/detail/${props.topicBody.topicId}`)
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
        duration: 3000
      })
    }
  } else {
    try {
      const topicId = await addTopic(form)
      router.push(`/topic/detail/${topicId}`)
    } catch (e) {
      console.log(e)
    }
  }
}

onMounted(() => {
  if (props.isModify) {
    topic.title = props.topicBody.title
    topic.content = props.topicBody.content
  }
})
</script>
<style scoped>
.title {
  height: 70px;
  font-size: 30px !important;
}

.border {
  border: 1px #CFD3DC solid;
}

.title>>>div {
  box-shadow: none;
}

.edit>>>div {
  border: none;
}
</style>
