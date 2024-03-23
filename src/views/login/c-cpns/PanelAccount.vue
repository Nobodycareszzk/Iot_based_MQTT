<template>
  <div class="panel-account">
    <el-form :model="account" :rules="rules" label-width="60px" status-icon ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { userAccount } from '@/types'
import { localCache } from '@/utils/cache'

// 定义 account 对象的数据
const account = reactive<userAccount>({
  username: localCache.getCache('username') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 定义校验规则
const rules = reactive<FormRules<userAccount>>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,20}$/,
      message: '必须是3~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
})

// 获取表单的ref
const formRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()
// 执行登录操作
function loginAction(isRememberPassword: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const username = account.username
      const password = account.password
      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.accountLoginAction({ username, password }).then(() => {
        // 判断是否需要记住密码
        if (isRememberPassword) {
          localCache.setCache('username', username)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('username')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}

// 将方法暴露出去
defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.panel-account {
  color: red;
}
</style>
