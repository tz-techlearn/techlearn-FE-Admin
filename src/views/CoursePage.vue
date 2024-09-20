<template>
  <h2 class="mt-4" style="margin-left: 10px">Khóa học</h2>
  <Table :header="header" :data="data.courses" :keys="keys"></Table>
</template>
<script setup>
import Table from "@/components/Tables/Table.vue";
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";

const rootAPI = process.env.VUE_APP_ROOT_API;

const data = reactive({
  courses: [],
});

const header = ["STT", "Tên khóa học", "Giá tiền", "Đơn vị", "Hành động"];
const keys = ["name", "price", "currencyUnit"];

const fetchCourses = async () => {
  try {
    const response = await axios.get(`${rootAPI}/api/v1/courses`);
    data.courses = response.data.data.items;
    console.log(courses);
  } catch (error) {}
};

onMounted(async () => {
  await fetchCourses();
});
</script>
<style scoped></style>
