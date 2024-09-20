<template>
  <h2 class="mt-4" style="margin-left: 10px">Khóa học</h2>
  <Table :header="header" :data="data.courses" :keys="keys" :actions="actions"></Table>
</template>

<script setup>
import Table from "@/components/Tables/Table.vue";
import axios from "axios";
import { reactive, onMounted } from "vue";

const rootAPI = process.env.VUE_APP_ROOT_API;

const data = reactive({
  courses: [],
});

const header = ["STT", "Tên khóa học", "Giá tiền", "Đơn vị", "Hành động"];
const keys = ["name", "price", "currencyUnit"];

const actions = {
  view: (item) => `/chapters?idCourse=${item.id}`,
  edit: (item) => `/courses-update/${item.id}`,
  delete: (item) => `/courses/${item.id}`,
};

const fetchCourses = async () => {
  try {
    const response = await axios.get(`${rootAPI}/courses`);
    data.courses = response.data.data.items;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchCourses();
});
</script>

<style scoped></style>
