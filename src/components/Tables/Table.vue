<template>
  <div class="container-fluid my-5">
    <table class="table table-hover table-striped w-100">
      <thead class="thead-lb">
        <tr>
          <th v-for="(header, index) in props.header" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.data" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td v-for="(key, keyIndex) in props.keys" :key="keyIndex">
            {{ item[key] || "N/A" }}
          </td>
          <td class="action-buton">
            <a href="#" class="btn btn-primary btn-sm btn-action">
              <i class="fas fa-eye"></i>
            </a>
            <a href="#" class="btn btn-warning btn-sm btn-action" @click.prevent="editCourse(item.id)">
              <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="btn btn-danger btn-sm btn-action">
              <i class="fas fa-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  header: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  keys: {
    type: Array,
    required: true,
  },
});

const editCourse = (id) => {
  router.push({ name: 'CourseUpdateForm', params: { id } }); 
};
</script>

<style scoped>
.action-buton {
  display: flex;
  gap: 8px;
}
.table {
  width: 100%; /* Đặt chiều rộng bảng 100% để mở rộng toàn màn hình */
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

th,
td {
  vertical-align: middle;
}

.container-fluid {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
