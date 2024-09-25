<template>
  <div class="d-flex mt-3 justify-content-between align-items-center">
    <router-link :to="`/chapters?idCourse=${idCourse}`" class="text-decoration-none">
      <div class="d-flex align-items-center gap-2">
        <i class="fa-solid fa-arrow-left text-dark"></i>
        <p class="mb-0 text-dark">Danh sách các chương</p>
      </div>
    </router-link>
    <div>
      <router-link :to="{ path: '/add-lessons', query: { idChapter: idChapter } }" type="button"
        class="btn btn-primary mr-3">Thêm bài tập</router-link>
      <button type="button" class="btn btn-primary">Sắp xếp bài tập</button>
    </div>
  </div>
  <hr class="border border-grey border-1 opacity-50">
  <h5 class="mt-4" style="margin-left: 30px; margin-bottom: -20px;">Danh sách bài đọc</h5>
  <Table :header="header" :data="data.assignments" :keys="keys" :actions="actions" @delete-item="deleteLesson"></Table>
  <b-modal v-model="isModalVisible" title="Xác nhận xóa" ok-title="Xóa" cancel-title="Đóng" ok-variant="danger"
    @ok="handleDelete">
    <p>Bạn có chắc chắn muốn xóa bài tập không?</p>
  </b-modal>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Table from "@/components/Tables/Table.vue";
import { toast } from "vue3-toastify";

const rootAPI = process.env.VUE_APP_ROOT_API;

const route = useRoute();

const idChapter = route.query.idChapter;
const idCourse = route.query.idCourse;

const data = reactive({
  assignments: [],
});

const isModalVisible = ref(false);
const itemToDelete = ref();

const header = ["STT", "Tên Bài tập", "Hành động"];
const keys = ["title"];

const actions = {
  view: (item) => `/lessons?idChapter=${item.id}&idCourse=${idCourse}`,
  edit: (item) => ({ path: `/lessons-update/${item.id}`, query: { idChapter: idChapter, idCourse: idCourse } }),
  delete: (item) => `/courses/${item.id}`,
};

const fetchAssignments = async () => {
  try {
    const response = await axios.get(
      `${rootAPI}/lessons?idChapter=${idChapter}`
    );
    data.assignments = response.data.data.items;
    data.assignments = data.assignments.map((item) => {
      let titleUpdated = item.title;

      switch (item.type) {
        case "LECTURES":
          titleUpdated = `[Bài giảng] - ${item.title}`;
          break;
        case "READINGS":
          titleUpdated = `[Bài đọc] - ${item.title}`;
          break;
        case "EXERCISES":
          titleUpdated = `[Bài tập] - ${item.title}`;
          break;
      }

      return {
        ...item,
        title: titleUpdated,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

// xử lý xóa bài tập
const handleDelete = async () => {
  try {
    await axios.delete(`${rootAPI}/lessons/${itemToDelete.value.id}`);
    data.assignments = data.assignments.filter(
      (item) => item.id !== itemToDelete.value.id
    );
    isModalVisible.value = false;
    toast.success("Xóa bài tập thành công");
  } catch (error) {
    console.log(error);
    toast.error("Có lỗi xảy ra");
  }
};

const deleteLesson = (lesson) => {
  isModalVisible.value = true;
  itemToDelete.value = lesson;
};

onMounted(async () => {
  await fetchAssignments();
});
</script>

<style scoped></style>
