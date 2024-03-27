<template>
  <div class="device">
    <DeviceSearch @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <DeviceContent
      ref="contentRef"
      @updateClick="handleUpdateClick"
      @create-click="handleCreatelick"
    />
    <DeviceModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DeviceSearch from './c-cpns/DeviceSearch.vue'
import DeviceContent from './c-cpns/DeviceContent.vue'
import DeviceModal from './c-cpns/DeviceModal.vue'
import type { DeviceQueryForm, DeviceType } from '@/types'

const contentRef = ref<InstanceType<typeof DeviceContent>>()

function handleQueryClick(formData: DeviceQueryForm) {
  console.log('handleQueryClick', formData)
  contentRef.value?.fetchDeviceListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchDeviceListData()
}

// 对modal组件的操作(这个只是将弹窗显示出来，并传入一些数据)
const modalRef = ref<InstanceType<typeof DeviceModal>>()
function handleCreatelick() {
  modalRef.value?.setModalVisible()
}
function handleUpdateClick(itemData: DeviceType) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less">
.device {
  color: red;
}
</style>
