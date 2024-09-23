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
  <Table :header="header" :data="data.assignments" :keys="keys" :actions="actions"></Table>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Table from "@/components/Tables/Table.vue";

const rootAPI = process.env.VUE_APP_ROOT_API;

const route = useRoute();

const idChapter = route.query.idChapter;
const idCourse = route.query.idCourse;

const data = reactive({
  assignments: [],
});

const header = ["STT", "Tên Bài tập", "Hành động"];
const keys = ["title"];

const actions = {
  view: (item) => `/lessons?idChapter=${item.id}&idCourse=${idCourse}`,
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

onMounted(async () => {
  await fetchAssignments();
});
</script>

<style scoped></style>
