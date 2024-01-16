<template>
  <div class="role">
    <div class="role_operation">
      <el-button type="success" size="small" @click="handleAdd"
        >新增权限</el-button
      >
    </div>
    <div class="role_table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          label="角色ID"
          prop="roleId"
          width="80"
        ></el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
          width="120"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              link
              size="small"
              type="primary"
              @click="handleEditRole(scope.row)"
              >编辑角色</el-button
            >
            <el-button
              link
              size="small"
              type="warning"
              @click="handleEditAuth(scope.row)"
              >修改权限</el-button
            >
            <el-button
              link
              size="small"
              type="danger"
              @click="handleRemove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogRole.visible" v-if="dialogRole.visible">
      <el-form
        :model="dialogRole.form"
        ref="dialogRoleRef"
        :rules="dialogRole.rules"
      >
        <el-form-item label="用户名称" label-width="140px" prop="roleName">
          <el-input
            v-model="dialogRole.form.roleName"
            placeholder="请选择用户名称"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogRole.handleCancel">取消</el-button>
          <el-button
            type="primary"
            @click="dialogRole.handleComfirm(dialogRoleRef)"
          >
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { FormInstance, ElMessage } from "element-plus";
import { roleList, roleAdd, roleUpdate, roleRemove } from "@/api/role";
const tableData = ref();

const handleSearch = async () => {
  const res = await roleList();
  tableData.value = res.data;
};
const handleAdd = () => {
  dialogRole.isAdd = true;
  dialogRole.form.roleId = 0;
  dialogRole.form.roleName = "";
  dialogRole.visible = true;
};
const handleRemove = async (role: any) => {
  const query = { roleId: role.roleId };
  const res: any = await roleRemove(query);
  ElMessage.success(res.data.message);
  handleSearch();
};

// 编辑角色
const dialogRoleRef = ref<FormInstance>();
//TODO 该对象不是全部都要响应式！
const dialogRole = reactive({
  isAdd: true,
  visible: false,
  form: {
    roleId: 0,
    roleName: "",
  },
  rules: {
    roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  },
  handleCancel: () => {
    dialogRole.visible = false;
  },
  handleComfirm: async (el: FormInstance | undefined) => {
    let isValid = false;
    await el?.validate((valid, fields) => {
      if (valid) {
        isValid = true;
      } else {
        console.log("error submit!", fields);
      }
    });
    if (!isValid) return;

    let res: any;
    if (dialogRole.isAdd) {
      let query = {
        roleName: dialogRole.form.roleName,
      };
      res = await roleAdd(query);
    } else {
      let query = {
        roleId: dialogRole.form.roleId,
        roleName: dialogRole.form.roleName,
      };
      res = await roleUpdate(query);
    }
    if (res.code != 0) {
      ElMessage.error(res.data.message);
      return;
    }
    if (res.data.result) {
      ElMessage.success(res.data.message);
      dialogRole.visible = false;
      handleSearch();
    } else {
      ElMessage.error(res.data.message);
    }
  },
});
const handleEditRole = (role: any) => {
  dialogRole.isAdd = false;
  const { roleId, roleName } = role;
  dialogRole.form.roleName = roleName;
  dialogRole.form.roleId = roleId;
  dialogRole.visible = true;
};

// 编辑角色权限
// const dialogAuthRef = ref<FormInstance>();
// const dialogAuth = reactive({
//   isAdd: true,
//   visible: false,
//   form: {},
//   rules: {},
//   handleCancel: (el: FormInstance | undefined) => {
//     console.log(el);
//   },
//   handleComfirm: (el: FormInstance | undefined) => {
//     console.log(el);
//   },
// });

// const dialogVisible = ref(false);
// const dialogForm = ref();
// const dialogFormRef = ref();
const handleEditAuth = (role: any) => {
  console.log(role);
};

onMounted(() => {
  handleSearch();
});
</script>

<style scoped>
.role {
  .role_operation {
    margin-bottom: 10px;
  }
}
</style>
