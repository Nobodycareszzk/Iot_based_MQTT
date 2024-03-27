<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建设备' : '编辑设备'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="formData.deviceName" placeholder="请输入设备名称" />
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <el-input v-model="formData.deviceType" placeholder="请输入设备类型" />
          </el-form-item>
          <el-form-item label="选择产品" prop="productId" v-show="isNewRef">
            <el-select
              v-model="formData.productId"
              placeholder="请选择产品"
              style="width: 100%"
              v-if="isNewRef"
            >
              <template v-for="item in productList" :key="item.id">
                <el-option :label="item.productName" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useProductStore from '@/stores/main/devices/product'
import { storeToRefs } from 'pinia'
import useDeviceStore from '@/stores/main/devices/device'
import type { DeviceUpdateForm, DeviceAddForm } from '@/types'

// 1.定义内部的属性
const dialogVisible = ref(false)

const formData = reactive<DeviceAddForm>({
  deviceName: '',
  deviceType: '',
  productId: 0
})

const isNewRef = ref(true) // 是否是新建数据
const beforeEditData = ref() // 记录编辑前的数据

// 2.获取roles/departments数据
const productStore = useProductStore()
const deviceStore = useDeviceStore()
//使其变为响应式
const { productList } = storeToRefs(productStore)

// 2.定义设置dialogVisible方法(回显)
function setModalVisible(isNew: boolean = true, itemData?: DeviceUpdateForm) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key] //itemData：原始数据, formData：表单展示的数据
    }
    beforeEditData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    beforeEditData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && beforeEditData.value) {
    console.log('编辑用户的数据', beforeEditData.value)
    console.log('formData数据', formData)
    // 编辑用户的数据
    const updateData = {
      deviceId: beforeEditData.value.id,
      deviceName: formData.deviceName,
      deviceType: formData.deviceType
    }
    deviceStore.updateDeviceAction(updateData)
  } else {
    // 创建新的用户
    console.log('创建新的用户', formData)
    deviceStore.createDeviceAction(formData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
