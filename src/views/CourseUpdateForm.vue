<template>
  <div class="container">
    <h2 class="mb-4">Cập nhật khóa học</h2>
    <form @submit.prevent="updateCourse">
      <div class="mb-3">
        <label for="courseName" class="form-label">Tên khóa học</label>
        <input type="text" class="form-control" id="courseName" v-model="course.name" />
      </div>
      <div class="mb-3">
        <label for="courseDescription" class="form-label">Mô tả khóa học</label>
        <input type="text" class="form-control" id="courseDescription" v-model="course.description" />
      </div>
      <div class="mb-3">
        <label for="coursePrice" class="form-label">Giá</label>
        <input type="number" class="form-control" id="coursePrice" v-model="course.price" />
      </div>
      <div class="mb-3">
        <label for="courseUnit" class="form-label">Đơn vị</label>
        <select class="form-select" id="courseUnit" v-model="course.currencyUnit">
          <option value="VND">VND</option>
          <option value="USD">USD</option>
        </select>

      </div>

      <div class="mb-3">
        <label for="courseImageUrl" class="form-label">Đường dẫn ảnh khóa học</label>
        <input type="url" class="form-control" id="courseImageUrl" v-model="course.thumbnailUrl" />
      </div>
      <div class="mb-3">
        <label for="coursetechStacks" class="form-label">Techstacks</label>
        <Multiselect v-model="course.techStack" :options="techOptions" :multiple="true" :taggable="true"
          @tag="addTag" />
      </div>
      <div class="d-flex justify-content-between mb-3">
        <div class="me-2 flex-grow-1">
          <label for="courseActivation" class="form-label">Kích hoạt</label>
          <select class="form-select" id="courseActivation" v-model="course.isActive">
            <option value=true>Kích hoạt</option>
            <option value=false>Không kích hoạt</option>
          </select>
        </div>
        <div class="ms-2 flex-grow-1">
          <label for="coursePublicity" class="form-label">Công khai</label>
          <select class="form-select" id="coursePublicity" v-model="course.isPublic">
            <option value=true>Riêng tư</option>
            <option value=false>Công khai</option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary mx-4">Cập nhật</button>
        <button type="button" class="btn btn-secondary mx-4" @click="goBack">Trở về</button>
      </div>
    </form>
  </div>

</template>

<script>

import axios from 'axios';
import Multiselect from "vue-multiselect";
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    Multiselect,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const rootAPI = process.env.VUE_APP_ROOT_API;

    const course = reactive({
      id: null,
      name: '',
      description: '',
      price: 0,
      currencyUnit: 'VND',
      thumbnailUrl: '',
      techStack: [],
      isActive: true,
      isPublic: true,
      point: 100,
    });

    const techOptions = ['Spring Boot', 'Vuejs', 'Reactjs', 'Angular', 'Node.js', 'Django'];

    const updateCourse = async () => {
      try {
        await axios.put(`${rootAPI}/courses/${course.id}`, course);
        toast.success("Cập nhật khóa học thành công!", {
          autoClose: 1000,
        });
      } catch (error) {
        toast.error("Cập nhật khóa học thất bại!", {
          autoClose: 1000,
        });
        console.error('Error updating course:', error);
      }
    };
    const goBack = () => {
      router.go(-1);
    };

    const addTag = (newTag) => {
      techOptions.push(newTag);
    };

    const fetchCourses = async (id) => {
      try {
        const response = await axios.get(`${rootAPI}/courses/${id}`);
        Object.assign(course, response.data.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };


    onMounted(async () => {
      const { id } = route.params;
      if (id) {
        course.id = id;
        await fetchCourses(id);
      }
    });
    return {
      course,
      techOptions,
      updateCourse,
      goBack,
      addTag,
    };

  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 20px;
}

.btn {
  width: 100px;
  background-color: #0D6EFD;
  border: #ffff;
}

.btn.btn-secondary {
  background-color: #dd8792;
  border: #ffff;
}
</style>