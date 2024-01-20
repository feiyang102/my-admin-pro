<template>
  <div class="project_content">
    <el-form :inline="true" :model="formData">
      <el-form-item>
        <el-input
          placeholder="请输入标题"
          label="标题"
          v-model="formData.title"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入内容"
          label="内容"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="内容" />
    </el-table>
    <div class="project_pager">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagerTotal"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { projectList } from "@/api/project";
import { ElMessage } from "element-plus";
import { IProjectItem, IProjectQuery } from "#/project";

const formData = ref({
  title: "",
  introduce: "",
});
const tableData = ref<IProjectItem[]>([]);
const pagerData = {
  pageNumber: 1,
  pageSize: 10,
};
let pagerTotal = ref(0);

onMounted(async () => {
  await handlerSearch();
});

async function getProjectList(data: any): Promise<any> {
  const res: any = await projectList(data).catch((err) => {
    console.log("获取列表失败：", err);
    ElMessage.error("获取列表失败：", err);
  });

  tableData.value = res.data.list;
  pagerTotal.value = res.data.total;
}
// 查询按钮
async function handlerSearch() {
  const { title, introduce } = formData.value;
  pagerData.pageNumber = 1;
  const query = { ...pagerData } as IProjectQuery;
  title && (query.title = title);
  introduce && (query.introduce = introduce);

  await getProjectList(query);
}

async function handleSizeChange(val: number) {
  pagerData.pageNumber = 1;
  pagerData.pageSize = val;
  const query = { ...pagerData } as IProjectQuery;
  return await getProjectList(query);
}

async function handleCurrentChange(val: number) {
  pagerData.pageNumber = val;
  const query = { ...pagerData } as IProjectQuery;
  return await getProjectList(query);
}
</script>

<style scoped>
.project_pager {
  margin-top: 15px;
}
</style>
