<template>
  <div class="user_header">
    <el-form inline :model="queryData" @submit.prevent>
      <el-form-item label="用户名称">
        <el-input v-model="queryData.nickName" placeholder="请输入用户名称" />
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
  <div class="user_operation">
    <el-button type="success" @click="handleCreate">新建用户</el-button>
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
          <el-button
            link
            size="small"
            type="primary"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="user_pagination">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagerTotal"
      :page-size="queryData.pageSize"
      :page-sizes="[5, 10, 20, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <div class="user_edit">
    <el-dialog v-model="dialogVisible" v-if="dialogVisible">
      <el-form :model="dialogForm" ref="dialogFormRef" :rules="dialogFormRules">
        <el-form-item label="用户名称" label-width="140px" prop="nickName">
          <el-input
            v-model="dialogForm.nickName"
            placeholder="请选择用户名称"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="用户角色" label-width="140px" prop="roles">
          <el-select
            v-model="dialogForm.roles"
            value-key="roleId"
            multiple
            clearable
            placeholder="请选择用户角色"
          >
            <el-option
              v-for="item in rolesData"
              :label="item.roleName"
              :value="item"
              :key="item.roleId"
              >{{ item.roleName }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogCancel">取消</el-button>
          <el-button type="primary" @click="handleDialogComfirm(dialogFormRef)">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { userList, userCreate, userEdit } from "@/api/user";
import { roleList } from "@/api/role";
import { IUserListItem, IUserQuery } from "#/user";
import { IRoleListItem } from "#/role";
import { ElMessage, FormInstance } from "element-plus";

const rolesData = ref<IRoleListItem[]>([]);
const queryData = reactive<IUserQuery>({
  nickName: "",
  roleId: 0,
  pageNumber: 1,
  pageSize: 10,
});
let pagerTotal = 0;
const tableData = ref<IUserListItem[]>([]);

const getRoleList = async () => {
  const { data }: any = await roleList({}).catch((err) => {
    console.log(err);
  });
  rolesData.value = data;
};

const handleSearch = async () => {
  const { nickName, roleId } = queryData;
  const query = {
    pageNumber: queryData.pageNumber,
    pageSize: queryData.pageSize,
  } as IUserQuery;
  if (nickName) {
    query.nickName = nickName;
  }
  if (roleId !== "0") {
    query.roleId = Number(roleId);
  }
  const { data }: any = await userList(query).catch((err) => {
    console.log(err);
  });
  tableData.value = data.list;
  pagerTotal = data.total;
};

const handleSizeChange = (size: number) => {
  queryData.pageNumber = 1;
  queryData.pageSize = size;
  pagerTotal = 0;
  handleSearch();
};

const handleCurrentChange = (index) => {
  queryData.pageNumber = index;
  handleSearch();
};

// 编辑弹窗相关
const dialogVisible = ref(false);
const dialogForm = reactive({
  id: 0,
  nickName: "",
  roles: [],
});
const dialogFormRef = ref<FormInstance>();
let dialogMode: "create" | "edit" = "create";

const handleCreate = () => {
  dialogMode = "create";
  dialogForm.nickName = "";
  dialogForm.roles = [];
  dialogVisible.value = true;
};

const handleEdit = (user) => {
  dialogMode = "edit";
  dialogForm.id = user.id;
  dialogForm.nickName = user.nickName;
  dialogForm.roles = user.roles.map((item) => {
    return {
      roleId: item.roleId,
      roleName: item.roleName,
    };
  });
  dialogVisible.value = true;
};

const handleDialogCancel = () => {
  dialogVisible.value = false;
};

const dialogFormRules = reactive({
  nickName: [{ required: true, trigger: "blur", message: "请输入用户名称" }],
  roles: [{ required: true, trigger: "change", message: "请选择角色" }],
});

const handleDialogComfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  let validRes = false;
  await formEl.validate((valid) => {
    validRes = valid;
  });
  if (!validRes) return;
  const query: IUserListItem = Object.assign({}, dialogForm);
  let res: any;

  if (dialogMode === "create") {
    delete query.id;
    res = await userCreate(query).catch((err) => {
      ElMessage.error(`提交失败：${err}`);
    });
  } else {
    res = await userEdit(query).catch((err) => {
      ElMessage.error(`提交失败：${err}`);
    });
  }

  if (res.code === 0) {
    ElMessage.success("提交成功");
    dialogVisible.value = false;
    handleSearch();
  } else {
    ElMessage.error(`提交失败：${res.message}`);
  }
};

onMounted(async () => {
  await handleSearch();
  await getRoleList();
});
</script>

<style scoped>
.user_operation {
  margin-bottom: 10px;
}
.user_table {
  .table_role {
    margin-left: 5px;
  }
}
.user_pagination {
  margin-top: 15px;
}
</style>
