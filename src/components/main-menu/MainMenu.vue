<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">物联网平台</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultActive"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="menu in userMenus" :key="menu.id">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <component :is="menu.icon?.split('-icon-')[1]" />
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>

            <template v-for="submenu in menu.children" :key="submenu.id">
              <el-menu-item :index="submenu.id + ''" @click="handleItemClick(submenu)">
                {{ submenu.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useLoginStore from '@/stores/login/login'
import { useRoute, useRouter } from 'vue-router'
import { getShowMenuByPath } from '@/utils/map-menus'
import type { ChildMenuType } from '@/types'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userInfo?.menu ?? []

// 2.监听item的点击
const router = useRouter()
function handleItemClick(submenu: ChildMenuType) {
  const url = submenu.url
  router.push(url)
}

// 3.设置默认激活的菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = getShowMenuByPath(route.path, userMenus)
  return pathMenu.id + ''
})
</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
