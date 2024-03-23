<template>
  <div class="login-panel">
    <h1 class="title">zzk物联网平台</h1>
    <!-- 中间tabs -->
    <!-- 账号登录的title -->
    <el-tabs type="border-card" class="tabs" :stretch="true" v-model="activateName">
      <el-tab-pane name="account">
        <template #label>
          <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </div>
        </template>
        <PanelAccount ref="accountRef"
      /></el-tab-pane>
      <!-- 手机登录的title -->
      <el-tab-pane name="phone">
        <template #label>
          <div class="label">
            <el-icon><Cellphone /></el-icon>
            <span class="text">手机登录</span>
          </div>
        </template>
        <PanelPhone
      /></el-tab-pane>
    </el-tabs>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPassword" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" size="large" @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'
import { watch } from 'vue'
import { localCache } from '@/utils/cache'

const activateName = ref('account')
const isRememberPassword = ref<boolean>(localCache.getCache('isRememberPassword') ?? false)
const accountRef = ref<InstanceType<typeof PanelAccount>>()

watch(isRememberPassword, (newVal) => {
  console.log(newVal)
  localStorage.setItem('isRememberPassword', newVal + '')
})

function handleLoginBtnClick() {
  if (activateName.value === 'account') {
    // 获取子组件的实例，调用方法
    accountRef.value?.loginAction(isRememberPassword.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  // border: 1px solid red;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
