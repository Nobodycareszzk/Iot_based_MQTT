<template>
  <div class="content">
    <div class="header">
      <h3 class="title">设备列表</h3>
      <el-button type="primary" @click="handleCreateClick">添加设备</el-button>
    </div>
    <div class="table">
      <el-table :data="deviceList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="设备名称" prop="deviceName" width="150px" />
        <el-table-column align="center" label="设备类型" prop="deviceType" width="150px" />
        <el-table-column align="center" label="产品类型" prop="productId" width="150px" />
        <el-table-column align="center" label="状态" prop="status" width="100px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.status ? 'primary' : 'danger'" plain>
              {{ scope.row.status ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteClick(scope.row.deviceId)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useDeviceStore from '@/stores/main/devices/device'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
// import usePermissions from '@/hooks/usePermissions'
import type { DeviceQueryForm, DeviceType } from '@/types'

// 定义事件
const emit = defineEmits(['createClick', 'updateClick'])

// 用户的权限判断
// const isCreate = usePermissions('users:create')
// const isDelete = usePermissions('users:delete')
// const isUpdate = usePermissions('users:delete')
// const isQuery = usePermissions('users:query')

// 1.发起action，请求devicesList的数据
const deviceStore = useDeviceStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchDeviceListData()
// 2.获取devicesList数据,进行展示
const { deviceList, total } = storeToRefs(deviceStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchDeviceListData()
}
function handleCurrentChange() {
  fetchDeviceListData()
}

// 4.定义函数, 用于发送网络请求
function fetchDeviceListData(deviceFormData?: DeviceQueryForm) {
  const pageInfo = { page: currentPage.value + '', pageSize: pageSize.value + '' }
  // 2.发起网络请求
  const queryInfo = { ...pageInfo, deviceFormData }
  console.log('queryInfo', queryInfo)
  deviceStore.postDeviceListAction(queryInfo)
}

// 删除操作
function handleDeleteClick(deviceId: number) {
  console.log('devscope.rowce', deviceId)
  deviceStore.deleteDeviceAction(deviceId)
}

// 新建操作
function handleCreateClick() {
  emit('createClick')
}
// 编辑操作(itemData 是当前行的所有数据。传递给父组件，父组件再传给子组件)
function handleEditClick(itemData: DeviceType) {
  emit('updateClick', itemData)
}

// 导出，search查询的时候需要该组件重新获取数据（本质还是调用Action，不过这个已经封装了一下）
defineExpose({ fetchDeviceListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
