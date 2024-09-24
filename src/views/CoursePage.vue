<template>
  <DashBoard></DashBoard>
  <p class="mt-4" style="margin-left: 30px; font-weight: 600; font-size: 24px">
    Khóa học
  </p>
  <Table
    :header="header"
    :data="data.courses"
    :keys="keys"
    :actions="actions"
    @deleteItem="deleteCourse"
  ></Table>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import DashBoard from "@/components/DashBoard/DashBoard.vue";
import Table from "@/components/Tables/Table.vue";


const router = useRouter();
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
    console.error("Error fetching courses", error);
  }
};

// Hàm xử lý xóa khóa học
const deleteCourse = async (course) => {
  try {
    await axios.delete(`${rootAPI}/courses/${course.id}`);
    // Cập nhật lại danh sách sau khi xóa
    data.courses = data.courses.filter((item) => item.id !== course.id);
  } catch (error) {
    console.log(error);
    toast.error("Có lỗi xảy ra");
  }
};

const createCourse = () => {
  router.push('/courses-create');
};

onMounted(fetchCourses);
</script>

<style scoped>
.course-list-title {
  margin-left: 20px !important;
  font-weight: 600;
  font-size: 24px;
  margin: 0;
}

.create-course-btn {
  height: 30px;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
