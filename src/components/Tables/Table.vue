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
      <draggable
        tag="tbody"
        v-if="isDraggable"
        :list="props.data"
        :disabled="!enabled"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="
          (evt) => {
            dragging = false;
            emit('updateOrder', props.data);
          }
        "
      >
        <template #item="{ element, index }">
          <tr :key="element.id" class="w-100 drag-item">
            <th scope="row">{{ index + 1 }}</th>
            <td v-for="(key, keyIndex) in props.keys" :key="keyIndex">
              {{ element[key] || "N/A" }}
            </td>
            <td>
              {{ element.isPublic ? "Công khai" : "Riêng tư" }}
            </td>
          </tr>
        </template>
      </draggable>
      <template v-else>
        <tbody>
          <tr v-for="(item, index) in props.data" :key="index">
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td v-for="(key, keyIndex) in props.keys" :key="keyIndex">
              {{ item[key] || "N/A" }}
            </td>
            <td class="action-button">
              <router-link
                v-if="props.viewDetail"
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
                @click="confirmDelete(item)"
                class="btn btn-danger btn-sm btn-action"
              >
                <i class="fas fa-trash"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import draggable from "vuedraggable";

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
  isDraggable: {
    type: Boolean,
    default: false,
  },
  viewDetail: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["updateOrder", "deleteItem"]);
const enabled = true;
const dragging = ref(false);

function checkMove(evt) {
  return true;
}

const confirmDelete = (item) => {
  emit("deleteItem", item);
};

onMounted(async () => {
  console.log(props.viewDetail);
});
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

.ghost {
  background-color: #f8f9fa;
}

.drag-item {
  cursor: pointer;
}
</style>
