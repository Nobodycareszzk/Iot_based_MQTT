<template>
  <div class="panel-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input v-model="code" />
          <el-button type="primary" plain class="getCode">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phone = ref('')
const code = ref('')
</script>

<style scoped lang="less">
.verify-code {
  display: flex;
  .getCode {
    margin-left: 10px;
  }
}
</style>
