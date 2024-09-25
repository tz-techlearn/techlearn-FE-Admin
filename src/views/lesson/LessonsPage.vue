<template>
  <div class="d-flex mt-3 justify-content-between align-items-center">
    <router-link :to="`/chapters?idCourse=${idCourse}`" class="text-decoration-none">
      <div class="d-flex align-items-center gap-2">
        <i class="fa-solid fa-arrow-left text-dark"></i>
        <p class="mb-0 text-dark">Danh sách các chương</p>
      </div>
    </router-link>
    <div>
      <router-link :to="{ path: '/add-lessons', query: { idChapter: idChapter, idCourse: idCourse } }" type="button"
        class="btn btn-primary mr-3">Thêm bài học</router-link>
      <router-link :to="{ path: '/sort-lessons', query: { idChapter: idChapter, idCourse: idCourse } }" class="btn btn-primary">Sắp xếp
        bài học</router-link>
    </div>
  </div>
  <hr class="border border-grey border-1 opacity-50">
  <h5 class="mt-4" style="margin-left: 30px; margin-bottom: -20px;">Danh sách bài học</h5>
  <Table :header="header" :data="data.assignments" :keys="keys" :actions="actions" :viewDetail="false"></Table>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Table from "@/components/Tables/Table.vue";

const rootAPI = process.env.VUE_APP_ROOT_API;

const route = useRoute();

const idChapter = route.query.idChapter;
const idCourse = route.query.idCourse;

const data = reactive({
  assignments: [],
});

const header = ["STT", "Tên Bài Học", "Hành động"];
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

onMounted(async () => {
  await fetchAssignments();
});
</script>

<style scoped></style>
