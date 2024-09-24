<template>
  <div class="d-flex mt-3 justify-content-between align-items-center">
    <router-link :to="`/chapters?idCourse=${idCourse}`" class="text-decoration-none">
      <div class="d-flex align-items-center gap-2">
        <i class="fa-solid fa-arrow-left text-dark"></i>
        <p class="mb-0 text-dark">Danh sách các chương</p>
      </div>
    </router-link>
    <div>
      <button type="button" class="btn btn-primary mr-3">Thêm bài tập</button>
      <button type="button" class="btn btn-primary">Sắp xếp bài tập</button>
    </div>
  </div>
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
import { useRoute } from "vue-router";
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
  view: (item) => `/lessons?idChapter=${item.id}&idCourse=${idCourse}`, //tu custom lai
  edit: (item) => `/courses/${item.id}`,
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
    toast.success("Xóa chương thành công");
  } catch (error) {
    console.log(error);
    toast.error("Có lỗi xảy ra");
  }
};

const deleteLesson = (chapter) => {
  isModalVisible.value = true;
  itemToDelete.value = chapter;
};

onMounted(async () => {
  await fetchAssignments();
});
</script>

<style scoped></style>
