<template>
    <div class="d-flex mt-3 justify-content-between align-items-center">
        <router-link to="/" class="text-decoration-none">
            <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-arrow-left text-dark"></i>
                <p class="mb-0 text-dark">Danh sách khoá học</p>
            </div>
        </router-link>
        <div>
            <router-link :to="{ path: '/add-chapter', query: { idCourse: idCourse } }" type="button"
                class="btn btn-primary mr-3">Thêm chương</router-link>
            <button type="button" class="btn btn-primary">Sắp xếp chương</button>
        </div>
    </div>
    <hr class="border border-grey border-1 opacity-50">
    <div class="container text-center">
        <div class="row">
            <div class="col-md-5">
                <img class="img-fluid" :src="dataCourse.course.thumbnailUrl" alt="">
            </div>
            <div class="col-md-7 text-start">
                <p>
                    <span class="fw-bold">Tên khoá học:</span> {{ dataCourse.course.name }}
                </p>
                <p>
                    <span class="fw-bold">Mô tả khoá học:</span> {{ dataCourse.course.description }}
                </p>
                <p>
                    <span class="fw-bold">Giá khoá học:</span> {{ dataCourse.course.price }}
                </p>
                <p>
                    <span class="fw-bold">Đơn vị:</span> {{ dataCourse.course.currencyUnit }}
                </p>
                <p>
                    <span class="fw-bold">Tech stack:</span> {{ dataCourse.course.techStack?.join(', ') || 'N/A' }}
                </p>
            </div>
        </div>
    </div>
    <hr class="border border-grey border-1 opacity-50">
    <h5 class="mt-4" style="margin-left: 10px">Danh sách chương</h5>
    <Table :header="header" :data="data.chapter" :keys="keys" :actions="actions" :isDraggable="true"
        @updateOrder="updateChapterOrder" />

</template>

<script setup>
import Table from "@/components/Tables/Table.vue";
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from 'vue-router';
import { toast } from "vue3-toastify";

const rootAPI = process.env.VUE_APP_ROOT_API;
const route = useRoute();
const idCourse = route.query.idCourse;

const data = reactive({
    chapter: [],
});

const dataCourse = reactive({
    course: {}
});

const header = ["STT", "Tên chương", "Hành động"];
const keys = ["name"];

const actions = {
    view: (item) => `/lesson?idChapter=${item.id}`,
    edit: (item) => ({
        path: `/edit-chapter/${item.id}`,
        query: { idCourse: idCourse }
    }),
    delete: (item) => `/courses/${item.id}`,
};

const fetchChapter = async () => {
    try {
        const response = await axios.get(`${rootAPI}/chapters?idCourse=${idCourse}`);
        data.chapter = response.data.data.items;
    } catch (error) {
        console.error(error);
    }
}

const fetchCourse = async () => {
    try {
        const response = await axios.get(`${rootAPI}/courses/${idCourse}`);
        dataCourse.course = response.data.data;
    } catch (error) {
        console.error(error);
    }
}

// update orderChapter
async function updateChapterOrder(updatedData) {
    const orderData = updatedData.map((item, index) => ({
        id: item.id,
        order: (index + 1)
    }));

    try {
        await axios.patch(`${rootAPI}/chapters/update-order`, orderData);
        toast.success("Cập nhật thứ tự thành công", {
            position: "top-right",
            autoClose: 3000,
        });
    } catch (error) {
        toast.error("Lỗi cập nhật thứ tự chương", {
            position: "top-right",
            autoClose: 3000,
        });
        console.error("Lỗi cập nhật thứ tự chương:", error);
    }
}

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
    font-size: 1.0rem;
}

img {
    border-radius: 10px;
    max-width: 80%;
    height: auto;
}
</style>