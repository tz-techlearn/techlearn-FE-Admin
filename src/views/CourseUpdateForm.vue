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
          <select class="form-select" id="courseUnit" v-model="course.unit">
            <option value="VND">VND</option>
            <option value="VND">USD</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="courseImageUrl" class="form-label">Đường dẫn ảnh khóa học</label>
          <input type="url" class="form-control" id="courseImageUrl" v-model="course.imageUrl" />
        </div>
        <div class="mb-3">
          <label for="coursetechStacks" class="form-label">Techstacks</label>
          <Multiselect v-model="course.techStacks" :options="techOptions" :multiple="true" :taggable="true" @tag="addTag" />
        </div>
        <div class="d-flex justify-content-between mb-3">
            <div class="me-2 flex-grow-1">
                <label for="courseActivation" class="form-label">Kích hoạt</label>
                <select class="form-select" id="courseActivation" v-model="course.activation">
                    <option value="Kích hoạt">Kích hoạt</option>
                    <option value="Không kích hoạt">Không kích hoạt</option>
                </select>
            </div>
            <div class="ms-2 flex-grow-1">
                <label for="coursePublicity" class="form-label">Công khai</label>
                <select class="form-select" id="coursePublicity" v-model="course.publicity">
                    <option value="Riêng tư">Riêng tư</option>
                    <option value="Công khai">Công khai</option>
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

  export default {
    data() {
      return {
        course: {
          name: '',
          description: '',
          price: 0,
          unit: 'VND',
          imageUrl: '',
          techStacks: '',
          activation: 'Kích hoạt',
          publicity: 'Riêng tư'
        },
        techOptions: ['Spring Boot', 'Vuejs', 'Reactjs', 'Angular', 'Node.js', 'Django']
      };
    },
    methods: {
      updateCourse() {
        console.log('Course updated:', this.course);
      },
      goBack() {
        console.log('Go back');
      }
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
  