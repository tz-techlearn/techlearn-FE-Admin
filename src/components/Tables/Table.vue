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
          <td class="action-button">
            <router-link :to="props.actions.view(item)" class="btn btn-primary btn-sm btn-action">
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link :to="props.actions.edit(item)" class="btn btn-warning btn-sm btn-action">
              <i class="fas fa-edit"></i>
            </router-link>
            <router-link :to="props.actions.delete(item)" class="btn btn-danger btn-sm btn-action">
              <i class="fas fa-trash"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
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
</script>

<style scoped>
.action-button {
  display: flex;
  gap: 8px;
}

.table {
  width: 100%;
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
