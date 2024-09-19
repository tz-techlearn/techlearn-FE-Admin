<template>
  <div class="container my-5">
    <h2 class="mb-4">Danh sách khóa học</h2>
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="text-center">STT</th>
          <th scope="col">Tên khóa học</th>
          <th scope="col">Giá tiền</th>
          <th scope="col">Đơn vị</th>
          <th scope="col" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in courses" :key="index">
          <th scope="row" class="text-center">{{ index + 1 }}</th>
          <td>{{ course.name }}</td>
          <td>{{ formatPrice(course.price) }}</td>
          <td>{{ course.unit }}</td>
          <td class="text-center">
            <a
              href="#" 
              class="btn btn-primary btn-sm btn-action"
              @click.prevent="viewCourse(course)"
              >Xem</a
            >
            <a
              href="#"
              class="btn btn-warning btn-sm btn-action"
              @click.prevent="editCourse(course)"
              >Sửa</a
              >
            <a
              href="#"
              class="btn btn-danger btn-sm btn-action"
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
  console.log("Viewing course:", course);
};

const editCourse = (course) => {
  console.log("Editing course:", course);
};

const deleteCourse = (course) => {
  console.log("Deleting course:", course);
};

// Định dạng giá tiền có dấu phân cách hàng nghìn
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<style scoped>
.btn-action {
  margin-right: 5px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

th,
td {
  vertical-align: middle;
}
</style>
