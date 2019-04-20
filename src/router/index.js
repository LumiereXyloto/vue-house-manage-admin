import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true, name: 'Login' },
  { path: '/register', component: () => import('@/views/register/register'), hidden: true, name: 'Register' },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/login',
    name: 'Dashboard',
    meta: { title: '主页'},
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  { path: '*', redirect: '/404', hidden: true },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/add-userinfo',
    name: 'AddUserinfo',
    meta: { title: '个人信息'},
    children: [
      {
        path: 'check-userinfo',
        name: 'CheckUserinfo',
        component: () => import('@/views/user/check-userInfo'),
        meta: { title: '查看个人信息'}
      },
      {
        path: 'change-userinfo',
        name: 'ChangeUserinfo',
        component: () => import('@/views/user/change-userinfo'),
        meta: { title: '修改个人信息'}
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('@/views/user/password'),
        meta: { title: '修改密码'}
      }
    ]
  },
  {
    path: '/rentout-manage',
    component: Layout,
    redirect: '/rentout-manage/rentout-userinfo',
    name: 'RentoutManage',
    meta: { title: '出租管理'},
    children: [
      {
        path: 'add-rentout',
        name: 'AddRentout',
        component: () => import('@/views/rentout/add-rentout'),
        meta: { title: '新增出租记录'}
      },
      {
        path: 'rentout-resource',
        name: 'RentoutResource',
        component: () => import('@/views/rentout/rentout-resource'),
        meta: { title: '房源信息管理'}
      }
    ]
  },
  {
    path: '/rentin-manage',
    component: Layout,
    redirect: '/rentin-manage/rentin-userinfo',
    name: 'RentinManage',
    meta: { title: '求租管理'},
    children: [
      {
        path: 'add-rentin',
        name: 'AddRentin',
        component: () => import('@/views/rentin/add-rentin'),
        meta: { title: '新增求租记录'}
      },
      {
        path: 'rentin-resource',
        name: 'RentinResource',
        component: () => import('@/views/rentin/rentin-resource'),
        meta: { title: '求租信息管理'}
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/add-contract',
    name: 'Contract',
    meta: { title: '合同管理' },
    children: [
      {
        path: 'add-contract',
        name: 'AddContract',
        component: () => import('@/views/contract/add-contract'),
        meta: { title: '录入合同信息' }
      },
      {
        path: 'contract-manage',
        name: 'ContractManage',
        component: () => import('@/views/contract/contract-manage'),
        meta: { title: '合同管理' }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/charge-manage',
    name: 'Business',
    meta: { title: '业务统计' },
    children: [
      {
        path: 'volume',
        name: 'Volume',
        component: () => import('@/views/business/volume'),
        meta: { title: '成交量统计' }
      },
      {
        path: 'charge-manage',
        name: 'ChargeManage',
        component: () => import('@/views/business/charge-manage'),
        meta: { title: '收费管理' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/password',
    name: 'Password',
    meta: { title: '系统管理' },
    children: [
      {
        path: 'data',
        name: 'Data',
        component: () => import('@/views/system/data'),
        meta: { title: '格式化数据' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
