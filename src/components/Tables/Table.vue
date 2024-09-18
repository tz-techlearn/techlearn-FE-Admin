<template>
  <div class="container my-5">
    <h2 class="mb-4">Danh sách khóa học</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên khóa học</th>
          <th scope="col">Giá tiền</th>
          <th scope="col">Đơn vị</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in courses" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ course.name }}</td>
          <td>{{ course.price }}</td>
          <td>{{ course.unit }}</td>
          <td>
            <a
              href="#"
              class="btn btn-primary btn-action"
              @click.prevent="viewCourse(course)"
              >Xem</a
            >
            <a
              href="#"
              class="btn btn-warning btn-action"
              @click.prevent="editCourse(course)"
              >Sửa</a
            >
            <a
              href="#"
              class="btn btn-danger btn-action"
              @click.prevent="deleteCourse(course)"
              >Xóa</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const courses = ref([
  { name: "Khóa học lập trình JavaScript", price: "1499000", unit: "VND" },
  { name: "Khóa học phát triển web", price: "1499000", unit: "VND" },
  { name: "Khóa học lập trình JavaScript", price: "1499000", unit: "VND" },
  { name: "Khóa học phát triển web", price: "1499000", unit: "VND" },
]);

const viewCourse = (course) => {
  // Handle view course logic
  console.log("Viewing course:", course);
};

const editCourse = (course) => {
  // Handle edit course logic
  console.log("Editing course:", course);
};

const deleteCourse = (course) => {
  // Handle delete course logic
  console.log("Deleting course:", course);
};
</script>

<style scoped>
.btn-action {
  margin-right: 5px;
}
</style>
