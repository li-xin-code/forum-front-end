import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import AddTopicView from '@/views/AddTopicView.vue'
import TopicView from '@/views/TopicView.vue'
import ModifyTopicView from '../views/ModifyTopicView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/user-info',
    name: 'UserInfo',
    component: UserInfoView
  },
  {
    path: '/add-topic',
    name: 'AddTopicView',
    component: AddTopicView
  },
  {
    path: '/topic/detail/:topicId',
    name: 'TopicView',
    component: TopicView
  },
  {
    path: '/topic/modify/:topicId',
    name: 'ModifyTopicView',
    component: ModifyTopicView
  },
  {
    path: '/search/:keyword',
    name: 'SearchView',
    component: SearchView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
