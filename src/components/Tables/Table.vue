<template>
  <div
    class="container-fluid my-5"
    style="margin-left: 20px; margin-right: 20px"
  >
    <table class="table table-hover table-striped">
      <thead class="thead-lb">
        <tr>
          <th
            v-for="(header, index) in props.header"
            :key="index"
            :class="{ 'text-center': header === 'STT' }"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.data" :key="index">
          <th scope="row" class="text-center">{{ index + 1 }}</th>
          <td v-for="(key, keyIndex) in props.keys" :key="keyIndex">
            {{ item[key] || "N/A" }}
          </td>
          <td class="action-button">
            <router-link
              :to="props.actions.view(item)"
              class="btn btn-primary btn-sm btn-action"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link
              :to="props.actions.edit(item)"
              class="btn btn-warning btn-sm btn-action"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <router-link
              to=""
              class="btn btn-danger btn-sm btn-action"
              @click="confirmDelete(item)"
            >
              <i class="fas fa-trash"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <b-modal
      v-model="isModalVisible"
      title="Xác nhận xóa"
      ok-title="Xóa"
      cancel-title="Đóng"
      @ok="handleDelete"
    >
      <p>Bạn có chắc chắn xóa khóa học không?</p>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
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
  actions: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["deleteItem"]);

const isModalVisible = ref(false);
const itemToDelete = ref(null);

const confirmDelete = (item) => {
  itemToDelete.value = item;
  isModalVisible.value = true;
};

const handleDelete = () => {
  emit("deleteItem", itemToDelete.value);
  isModalVisible.value = false;
};
</script>

<style scoped>
.action-button {
  display: flex;
  gap: 8px;
}

.table {
  width: 95%;
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
