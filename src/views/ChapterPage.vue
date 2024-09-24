<template>
  <div class="d-flex mt-3 justify-content-between align-items-center">
    <router-link to="/" class="text-decoration-none">
      <div class="d-flex align-items-center gap-2">
        <i class="fa-solid fa-arrow-left text-dark"></i>
        <p class="mb-0 text-dark">Danh sách khoá học</p>
      </div>
    </router-link>
    <div>
      <button type="button" class="btn btn-primary mr-3">Thêm chương</button>
      <button type="button" class="btn btn-primary">Sắp xếp chương</button>
    </div>
  </div>
  <hr class="border border-grey border-1 opacity-50" />
  <div class="container text-center">
    <div class="row">
      <div class="col-md-5">
        <img class="img-fluid" :src="dataCourse.course.thumbnailUrl" alt="" />
      </div>
      <div class="col-md-7 text-start">
        <p>
          <span class="fw-bold">Tên khoá học:</span>
          {{ dataCourse.course.name }}
        </p>
        <p>
          <span class="fw-bold">Mô tả khoá học:</span>
          {{ dataCourse.course.description }}
        </p>
        <p>
          <span class="fw-bold">Giá khoá học:</span>
          {{ dataCourse.course.price }}
        </p>
        <p>
          <span class="fw-bold">Đơn vị:</span>
          {{ dataCourse.course.currencyUnit }}
        </p>
        <p>
          <span class="fw-bold">Tech stack:</span>
          {{ dataCourse.course.techStack?.join(", ") || "N/A" }}
        </p>
      </div>
    </div>
  </div>
  <Table
    :header="header"
    :data="data.chapter"
    :keys="keys"
    :actions="actions"
    @delete-item="deleteChapter"
  ></Table>
  <b-modal
    v-model="isModalVisible"
    title="Xác nhận xóa"
    ok-title="Xóa"
    cancel-title="Đóng"
    ok-variant="danger"
    @ok="handleDelete"
  >
    <p>Bạn có chắc chắn muốn xóa chương không?</p>
  </b-modal>
</template>

<script setup>
import Table from "@/components/Tables/Table.vue";
import axios from "axios";
import { ref } from "vue";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const rootAPI = process.env.VUE_APP_ROOT_API;
const route = useRoute();
const idCourse = route.query.idCourse;

const data = reactive({
  chapter: [],
});

const isModalVisible = ref(false);
const itemToDelete = ref();

const dataCourse = reactive({
  course: {},
});

const header = ["STT", "Tên chương", "Hành động"];
const keys = ["name"];

const actions = {
  view: (item) => `/lessons?idChapter=${item.id}&idCourse=${idCourse}`,
  edit: (item) => `/courses/${item.id}`,
  delete: (item) => `/courses/${item.id}`,
};

const fetchChapter = async () => {
  try {
    const response = await axios.get(
      `${rootAPI}/chapters?idCourse=${idCourse}`
    );
    data.chapter = response.data.data.items;
  } catch (error) {
    console.error(error);
  }
};

const fetchCourse = async () => {
  try {
    const response = await axios.get(`${rootAPI}/courses/${idCourse}`);
    dataCourse.course = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// const deleteChapter = async (chapter) => {
//   try {
//     await axios.delete(`${rootAPI}/chapters/${chapter.id}`);
//     data.chapter = data.chapter.filter((chap) => chap.id !== chapter.id);
//     toast.success("Xóa chương thành công");
//   } catch (error) {
//     console.log(error);
//     toast.error("Có lỗi xảy ra");
//   }
// };

const handleDelete = async () => {
  try {
    await axios.delete(`${rootAPI}/chapters/${itemToDelete.value.id}`);
    data.chapter = data.chapter.filter(
      (item) => item.id !== itemToDelete.value.id
    );
    isModalVisible.value = false;
    toast.success("Xóa chương thành công");
  } catch (error) {
    console.log(error);
    toast.error("Có lỗi xảy ra");
  }
};

// Hàm xử lý xóa khóa học
const deleteChapter = (chapter) => {
  isModalVisible.value = true;
  itemToDelete.value = chapter;
};

onMounted(async () => {
  await fetchChapter();
  await fetchCourse();
});
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

i {
  font-size: 1rem;
}

img {
  border-radius: 10px;
  max-width: 80%;
  height: auto;
}
</style>
