import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/components/NotFound/NotFound.vue'
import CoursePage from '@/views/CoursePage.vue'
import ChapterPage from '@/views/ChapterPage.vue'
import CourseUpdateForm from '@/views/CourseUpdateForm.vue'
import LessonsPage from '@/views/LessonsPage.vue'

const routes = [
  {
    path: '/',
    name: 'CoursePage',
    component: CoursePage
  },
  {
    path: '/chapters',
    name: 'ChapterPage',
    component: ChapterPage,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/courses-update/:id/',
    name: 'CourseUpdateForm',
    component: CourseUpdateForm,
    props: true
  },
  {
    path: '/courses-create',
    name: 'CourseCreateForm',
    component: CourseUpdateForm,
    props: true
  },
  {
    path: '/lessons',
    name: "LessonsPage",
    component: LessonsPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
// onMounted(() => {
//   myModal.value = new bootstrap.Modal(document.getElementById("exampleModal"));
//   fetchStudents();
// });

// const handleDelete = async (data) => {
//   try {
//     await axios.delete(`${rootApi}/api/v1/users/${data.id}`);
//     list.value = list.value.filter((item) => item.id !== data.id);
//     closeModal();
//   } catch (error) {
//     console.error('Error deleting student:', error);
//   }
// };

// const openModal = (student) => {
//   seletedObject.value = student;
//   myModal.value.show();
// };

// const closeModal = () => {
//   myModal.value.hide();
// };
