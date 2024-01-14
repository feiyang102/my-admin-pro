<template>
  <div class="user_header">
    <el-form inline :model="queryData">
      <el-form-item label="用户名称">
        <el-input
          v-model="queryData.nickName"
          placeholder="请输入用户名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="queryData.roleId" placeholder="请选择用户角色">
          <el-option :key="0" label="全部" :value="0" />
          <el-option
            v-for="item in rolesData"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="user_table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="会员ID" width="80" />
      <el-table-column prop="nickName" label="会员名称" width="200" />
      <el-table-column prop="roles" label="用户角色">
        <template #default="scope">
          <template v-for="item in scope.row.roles" :key="item.role">
            <el-tag class="table_role">{{ item.roleName }}</el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="user_pagination">pagination</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { userList } from "@/api/user";
import { roleList } from "@/api/role";
import { IUserListItem, IUserQuery } from "#/user";
import { IRoleListItem } from "#/role";

const rolesData = ref<IRoleListItem[]>([]);
const queryData = reactive<IUserQuery>({
  nickName: "",
  roleId: 0,
});
const tableData = ref<IUserListItem[]>([]);

const getUserList = async (query = {}) => {
  const { data }: any = await userList(query).catch((err) => {
    console.log(err);
  });
  tableData.value = data;
};

const getRoleList = async () => {
  const { data }: any = await roleList({}).catch((err) => {
    console.log(err);
  });
  rolesData.value = data;
};

const handleSearch = () => {
  const query = { ...queryData };
  getUserList(query);
};

const handleEdit = (user) => {
  console.log(user);
};

onMounted(async () => {
  await getUserList();
  await getRoleList();
});
</script>

<style scoped>
.user_table {
  .table_role {
    margin-left: 5px;
  }
}
</style>
