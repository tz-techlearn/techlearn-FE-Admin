<template>
  <DashBoard></DashBoard>
  <div class="d-flex justify-content-between align-items-center mt-2">
    <p
      class="mt-4"
      style="margin-left: 30px; font-weight: 600; font-size: 24px"
    >
      Khóa học
    </p>
    <button
      type="button"
      class="btn btn-primary mr-5"
      style="width: 140px; height: 50px"
    >
      Thêm chương
    </button>
  </div>
  <Table
    :header="header"
    :data="data.courses"
    :keys="keys"
    :actions="actions"
    @deleteItem="deleteCourse"
  ></Table>
  <b-modal
    v-model="isModalVisible"
    title="Xác nhận xóa"
    ok-title="Xóa"
    cancel-title="Đóng"
    ok-variant="danger"
    @ok="handleDelete"
  >
    <p>Bạn có chắc chắn xóa khóa học không?</p>
  </b-modal>
</template>

<script setup>
import DashBoard from "@/components/DashBoard/DashBoard.vue";
import Table from "@/components/Tables/Table.vue";
import axios from "axios";
import { ref } from "vue";
import { reactive, onMounted } from "vue";
import { toast } from "vue3-toastify";

const rootAPI = process.env.VUE_APP_ROOT_API;

const isModalVisible = ref(false);
const itemToDelete = ref();

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

// Fetch courses từ API
const fetchCourses = async () => {
  try {
    const response = await axios.get(`${rootAPI}/courses`);
    data.courses = response.data.data.items;
  } catch (error) {
    console.error("Error fetching courses", error);
  }
};

const handleDelete = async () => {
  try {
    await axios.delete(`${rootAPI}/courses/${itemToDelete.value.id}`);
    data.courses = data.courses.filter(
      (item) => item.id !== itemToDelete.value.id
    );
    isModalVisible.value = false;
    toast.success("Xóa khóa học thành công");
  } catch (error) {
    console.log(error);
    toast.error("Có lỗi xảy ra");
  }
};

// Hàm xử lý xóa khóa học
const deleteCourse = (course) => {
  isModalVisible.value = true;
  // await axios.delete(`${rootAPI}/courses/${course.id}`);
  // data.courses = data.courses.filter((item) => item.id !== course.id);
  itemToDelete.value = course;
};

onMounted(fetchCourses);
</script>

<style scoped></style>
