<template>
  <div class="container">
    <h2 class="mb-4">
      {{ isUpdate ? "Cập nhật khóa học" : "Tạo khóa học mới" }}
    </h2>
    <form @submit.prevent="submitCourse">
      <div class="mb-3">
        <label for="courseName" class="form-label">Tên khóa học</label>
        <input
          type="text"
          class="form-control"
          id="courseName"
          v-model="course.name"
        />
      </div>
      <div class="mb-3">
        <label for="courseDescription" class="form-label">Mô tả khóa học</label>
        <textarea
          type="text"
          class="form-control"
          id="courseDescription"
          v-model="course.description"
        />
      </div>
      <div class="price-container">
        <div class="mb-3" style="flex: 1">
          <label for="coursePrice" class="form-label">Giá</label>
          <input
            type="text"
            class="form-control"
            id="coursePrice"
            v-model="priceTemp"
          />
        </div>
        <div class="mb-3" style="flex: 1">
          <label for="courseUnit" class="form-label">Đơn vị</label>
          <select
            class="form-select"
            id="courseUnit"
            v-model="course.currencyUnit"
          >
            <option value="VND">VND</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
      <div class="mb-3 image-container">
        <label for="courseImageUrl" class="form-label">Chọn ảnh khóa học</label>
        <div class="upload-area-container" v-if="showUploadArea">
          <input
            @change="handleUploadImage"
            type="file"
            id="fileInput"
            style="display: none"
          />
          <label
            for="fileInput"
            style="
              cursor: pointer;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <img
              class="img-upload"
              src="../../../public/upload_area.png"
              alt=""
            />
            <p>Chọn ảnh của khóa học</p>
          </label>
        </div>
        <div class="uploaded-image-container" v-if="imageUrl">
          <img
            :src="imageUrl"
            alt="Uploaded Course Image"
            class="uploaded-image"
          />
          <button class="remove-btn" @click="removeImage">X</button>
        </div>
      </div>
      <div class="mb-3">
        <label for="courseTechStacks" class="form-label">Công nghệ</label>
        <Multiselect
          v-model="course.techStack"
          :options="techStack.data"
          label="name"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
          @remove="removeTag"
          placeholder="Chọn công nghệ"
        />
      </div>
      <div class="mb-3">
        <label for="supporter" class="form-label">Giảng viên</label>
        <Multiselect
          v-model="course.teacher"
          :options="teachers.data"
          label="name"
          track-by="id"
          :multiple="true"
          :taggable="true"
          @tag="addTeacher"
          @remove="removeTeacher"
          placeholder="Chọn người hỗ trợ"
        />
      </div>
      <div class="d-flex justify-content-between mb-3">
        <div class="me-2 flex-grow-1 d-flex gap-2 align-items-center">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="courseActivation"
              id="activated"
              value="true"
              v-model="course.isActive"
            />
            <label class="form-check-label" for="activated"> Kích hoạt </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="courseActivation"
              id="deactivated"
              value="false"
              v-model="course.isActive"
            />
            <label class="form-check-label" for="deactivated">
              Không kích hoạt
            </label>
          </div>
        </div>
        <!-- <div class="ms-2 flex-grow-1">
          <label for="coursePublicity" class="form-label">Trạng thái</label>
          <select
            class="form-select"
            id="coursePublicity"
            v-model="course.isPublic"
          >
            <option value="false">Riêng tư</option>
            <option value="true">Công khai</option>
          </select>
        </div> -->
        <div class="ms-2 flex-grow-1">
          <label for="coursePublicity" class="form-label">Lượt hỗ trợ</label>
          <input type="number" class="form-control" v-model="course.point" />
        </div>
      </div>
      <div class="d-flex justify-content-center mb-4">
        <button type="submit" class="btn btn-primary mx-4">
          {{ isUpdate ? "Cập nhật" : "Tạo mới" }}
        </button>
        <button type="button" class="btn btn-secondary mx-4" @click="goBack">
          Trở về
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { watch } from "vue";

export default {
  components: {
    Multiselect,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const rootAPI = process.env.VUE_APP_ROOT_API;
    const supporters = ref([]);
    const isUpdate = ref(false);
    const imageUrl = ref(null);
    const showUploadArea = ref(true);
    const priceTemp = ref(0);
    const course = reactive({
      id: null,
      name: "",
      description: "",
      price: 0,
      currencyUnit: "VND",
      thumbnailUrl: "",
      techStack: [],
      teacher: [],
      isActive: true,
      isPublic: true,
      point: 30,
    });

    const techStack = reactive({
      data: [],
    });
    const teachers = reactive({
      data: [],
    });

    const submitCourse = async () => {
      try {
        const courseData = {
          ...course,
          techStack: course.techStack.map((tech) => tech.id),
          price: priceTemp.value.replace(/,/g, ""),
        };
        if (isUpdate.value) {
          await axios.put(`${rootAPI}/courses/${course.id}`, courseData);
          toast.success("Cập nhật khóa học thành công!", {
            autoClose: 1000,
          });
        } else {
          await axios.post(`${rootAPI}/courses`, courseData);
          toast.success("Tạo khóa học mới thành công!", {
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error(
          isUpdate.value
            ? "Cập nhật khóa học thất bại!"
            : "Tạo khóa học mới thất bại!",
          {
            autoClose: 1000,
          }
        );
        console.error("Error submitting course:", error);
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    const addTag = (newTag) => {
      course.techStack.push({ name: newTag });
    };
    const addTeacher = (newTeacher) => {
      course.teacher.push({ name: newTeacher });
    };

    const removeTag = (tagToRemove) => {
      const techStackSet = new Set(course.techStack.map((tag) => tag.name));
      techStackSet.delete(tagToRemove.name);
      course.techStack = Array.from(techStackSet).map((name) => ({ name }));
    };

    const removeTeacher = (tToRemove) => {
      const teacherSet = new Set(course.teacher);
      teacherSet.delete(tToRemove.name);
      course.teacher = Array.from(teacherSet);
    };

    const fetchCourse = async (id) => {
      try {
        const response = await axios.get(`${rootAPI}/courses/${id}`);
        Object.assign(course, response.data.data);
        console.log(course);
        priceTemp.value = formatCurrency(course.price, course.currencyUnit);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    const fetchTechStack = async () => {
      const response = await axios.get(`${rootAPI}/tech-stacks`);
      techStack.data = response.data.data.items;
    };

    const fetchTeachers = async () => {
      const response = await axios.get(`${rootAPI}/teachers`);
      teachers.data = response.data.data.items.map((teacher) => ({
        id: teacher.id,
        name: teacher.name,
        avatar: teacher.avatar,
        color: teacher.color,
      }));
    };

    const handleUploadImage = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
        showUploadArea.value = false;
        //setting lai thumbnailurl tai day
      } else {
        alert("Vui lòng chọn một ảnh hợp lệ.");
      }
    };

    const removeImage = () => {
      imageUrl.value = null;
      showUploadArea.value = true;
    };

    watch(
      () => course.currencyUnit,
      (newValue) => {
        priceTemp.value = formatCurrency(course.price, newValue);
      }
    );

    const formatCurrency = (value, unit) => {
      if (typeof value !== "number") {
        return value;
      }

      // Phân chia hàng nghìn
      const formattedValue = value.toLocaleString();

      let currencySymbol;
      switch (unit) {
        case "USD":
          currencySymbol = "$"; // Ký hiệu USD
          break;
        case "VND":
          currencySymbol = "₫"; // Ký hiệu VND
          break;
        default:
          return formattedValue; // Trả về giá trị đã định dạng nếu đơn vị không hợp lệ
      }

      // Trả về giá trị đã định dạng cùng với ký hiệu tiền tệ
      return `${currencySymbol}${formattedValue}`;
    };

    onMounted(async () => {
      const { id } = route.params;
      if (id) {
        isUpdate.value = true;
        course.id = id;
        await fetchCourse(id);
      }
      priceTemp.value = formatCurrency(priceTemp.value, "VND");
      await fetchTechStack();
      await fetchTeachers();
    });

    return {
      imageUrl,
      course,
      techStack,
      teachers,
      isUpdate,
      submitCourse,
      goBack,
      addTag,
      removeTag,
      addTeacher,
      removeTeacher,
      handleUploadImage,
      showUploadArea,
      removeImage,
      formatCurrency,
      priceTemp,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin-top: 20px;
}

.btn {
  width: 100px;
  background-color: #0d6efd;
  border: #ffff;
}

.btn.btn-secondary {
  background-color: #d44a4a;
  border: #ffff;
}
.btn.btn-secondary:hover {
  background-color: #d42c43;
}

.price-container {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.image-container {
  display: flex;
  flex-direction: column;
}
.img-upload {
  width: 80px;
  height: auto;
}
.upload-area-container {
  border: 2px dashed rgb(157, 136, 136);
  flex: 1;
  height: auto;
  display: flex;
  justify-content: center;
}
.uploaded-image-container {
  position: relative;
  display: inline-block;
}
.uploaded-image {
  width: 100%;
  height: auto;
}
.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50px;
  padding: 4px 12px;
  cursor: pointer;
  background: transparent;
  color: white;
  border: 1px;
}
</style>
