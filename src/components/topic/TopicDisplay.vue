<template>
  <div>
    <div class="topic-box edit-box">
      <el-descriptions :column="5" class="center">
        <el-descriptions-item align="left">
          <span style="color: #66b1ff;">话题</span>
        </el-descriptions-item>
        <el-descriptions-item label="标题" :align="'center'">{{ topic.title }}</el-descriptions-item>
        <el-descriptions-item label="作者" :align="'center'">{{ topic.author }}</el-descriptions-item>
        <el-descriptions-item v-if="isModify" label="发布时间" :align="'center'">{{ topic.createTime }}</el-descriptions-item>
        <el-descriptions-item v-else label="最后更改时间" :align="'center'">{{ topic.modifyTime }}</el-descriptions-item>
        <el-descriptions-item v-if="isTopicAuthor" :align="'center'">
          <el-button type="text" @click="modify"> 修改 </el-button>
          <el-button type="text" @click="remove"> 删除 </el-button>
        </el-descriptions-item>
      </el-descriptions>
      <uedit :value="topic.content" class="edit" :disabled="true" :plugins="['autoresize']" :toolbar="[]" />
    </div>
  </div>
  <div class="comment-box">
    <div>
      <el-row justify="end">
        <el-col :span="1">
          <el-button type="text" @click="commentSwitch">评论</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-if="topicCommentSwitchFlag">
      <uedit ref="commentEditRef" :value="commentContent" @input="commentInput" />
      <el-row justify="end">
        <el-col :span="2">
          <el-button type="primary" @click="comment">发布</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="comments">
      <div v-for="item in comments" :key="item.commentId" style="margin-top: 5px">
        <div class="topic-box edit-box">
          <el-descriptions :column="5" class="center">
            <el-descriptions-item align="left">
              <span style="color: #66b1ff;">评论</span>
            </el-descriptions-item>
            <el-descriptions-item label="author" :align="'center'">{{ item.author }}</el-descriptions-item>
            <el-descriptions-item label="reply" v-if="item.replyAuthor" :align="'center'">{{ item.replyAuthor }}
            </el-descriptions-item>
            <el-descriptions-item :align="'center'">{{ topic.createTime }}</el-descriptions-item>
            <el-descriptions-item align="right">
              <el-button type="text" @click="replySwitch(item.commentId)">回复</el-button>
              <el-button type="text" @click="removeComement(item.commentId)"
                v-if="isCommentAuthor(item.authorId)"> 删除
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
          <uedit :value="item.content" class="edit" :disabled="true" :plugins="['autoresize']" :toolbar="[]" />
        </div>
        <div v-if="replySwitchFlag === item.commentId">
          <uedit ref="replyEditRef" :value="replyContent" @input="replyInput" />
          <el-row justify="end">
            <el-col :span="2">
              <el-button type="primary" @click="reply(item.commentId)">发布</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
  <div id="pagination">
    <el-pagination v-model:currentPage="currentPage" :background="true" :pageSize="6"
      layout="total, prev, pager, next, jumper" :total="commentTotal"
      @current-change="handleCurrentChange" :hide-on-single-page="true" />
  </div>
</template>
<script setup>
import Uedit from '@/components/common/Uedit.vue'
import { getOneTopic, removeTopic } from '@/api/topic.js'
import { commentList, addComment, addReply, delComment } from '@/api/comment.js'
import { onMounted, reactive, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from '../../store'
import { useRouter } from 'vue-router'

const rotuer = useRouter()
// const store = useStore()
const props = defineProps({
  topicId: {
    type: String,
    default: ''
  }
})
const commentTotal = ref(1)
const currentPage = ref(1)
const commentEditRef = ref(null)
const replyEditRef = ref(null)
const commentContent = ref('')
const replyContent = ref('')
const comments = ref([])
const topicCommentSwitchFlag = ref(false)
const replySwitchFlag = ref('')
const topic = reactive({
  title: '',
  content: '',
  author: '',
  authorId: '',
  face: '',
  createTime: '',
  modifyTime: ''
})
// const currentUserId = store.getUserId()

const isTopicAuthor = computed(() => {
  return useStore().getUserId() === topic.authorId
})

const isCommentAuthor = computed(() => (userId) => {
  return useStore().getUserId() === userId
})

const isModify = computed(() => {
  return topic.createTime === topic.modifyTime
})
const getTopicDetail = async () => {
  const detail = await getOneTopic(props.topicId);
  ((arra, arrb) => Object.keys(arra).forEach(key => {
    arra[key] = arrb[key] || arra[key]
  }))(topic, detail)
}
const remove = async () => {
  await removeTopic(props.topicId)
  rotuer.push('/')
}
const modify = () => {
  rotuer.push(`/topic/modify/${props.topicId}`)
}
const commentSwitch = () => {
  const b = topicCommentSwitchFlag.value
  if (b) {
    topicCommentSwitchFlag.value = false
    return
  }
  topicCommentSwitchFlag.value = true
  replySwitchFlag.value = false
}
const replySwitch = (commentId) => {
  replySwitchFlag.value = replySwitchFlag.value === commentId ? '' : commentId
  topicCommentSwitchFlag.value = false
}
const commentInput = (newValue) => {
  commentContent.value = newValue
}
const replyInput = (newValue) => {
  replyContent.value = newValue
}
const comment = async () => {
  try {
    await addComment(props.topicId, commentContent.value)
    comments.value = await commentList(props.topicId, currentPage.value)
    topicCommentSwitchFlag.value = false
  } catch (e) {
    console.log(e)
  }
}
const reply = async (replyId) => {
  try {
    await addReply(props.topicId, replyId, replyContent.value)
    comments.value = await commentList(props.topicId, currentPage.value)
    replySwitchFlag.value = ''
  } catch (e) {
    console.log(e)
  }
}
const removeComement = async (commentId) => {
  await delComment(commentId)
  comments.value = await commentList(props.topicId, currentPage.value)
}

const handleCurrentChange = async (val) => {
  currentPage.value = val
  comments.value = await commentList(props.topicId, currentPage.value)
}
onMounted(async () => {
  await getTopicDetail()
  const { list, total } = await commentList(props.topicId, currentPage.value)
  comments.value = list
  commentTotal.value = total
})

</script>

<style scoped>
.edit>>>div {
  border: none !important;
  padding: 0;
  height: auto;
}

.edit-box {
  padding: 5px;
  border: 1px #CFD3DC solid;
}

.center {
  text-align: center;
}
</style>
