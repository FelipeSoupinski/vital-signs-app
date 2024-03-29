import Vue from 'vue'
import VueRouter from 'vue-router'
import ProjectListView from '../views/ProjectListView.vue'
import ProjectInfoView from '../views/ProjectInfoView.vue'
import SchedulerView from '../views/SchedulerView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: ProjectListView
  },
  {
    path: '/project-register',
    name: 'project-register',
    component: () => import('../views/ProjectRegisterView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectListView
  },
  {
    path: '/projects/:id',
    name: 'projects-info',
    component: ProjectInfoView
  },
  {
    path: '/scheduler',
    name: 'scheduler',
    component: SchedulerView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
