<template>
  <DashBoard></DashBoard>
  <p class="mt-4" style="margin-left: 30px; font-weight: 600; font-size: 24px">
    Khóa học
  </p>
  <Table :header="header" :data="data.courses" :keys="keys"></Table>
</template>
<script setup>
import DashBoard from "@/components/DashBoard/DashBoard.vue";
import Table from "@/components/Tables/Table.vue";
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";

const rootAPI = process.env.VUE_APP_ROOT_API;

const data = reactive({
  courses: [],
});

const header = [
  "STT",
  "Tên khóa học",
  "Giá tiền",
  "Đơn vị",
  "Điểm",
  "Hành động",
];
const keys = ["name", "price", "currencyUnit", "point"];

const fetchCourses = async () => {
  try {
    const response = await axios.get(`${rootAPI}/courses`);
    data.courses = response.data.data.items;
    console.log(courses);
  } catch (error) {}
};

onMounted(async () => {
  await fetchCourses();
});
</script>
<style scoped></style>
