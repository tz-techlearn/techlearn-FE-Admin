<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h4>Thêm mới gói hỗ trợ</h4>
      <form @submit.prevent="submitCreate" novalidate>
        <div class="form-group">
          <label for="name">Tên gói:</label>
          <input
            type="text"
            v-model="point.name"
            id="name"
            required
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
          />
          <div v-if="errors.name" class="invalid-feedback">
            {{ errors.name }}
          </div>
        </div>
        <div class="form-group flex-group">
          <div class="form-group flex-group">
            <div class="flex-item points">
              <label for="points">Số lượt:</label>
              <input
                type="number"
                v-model="point.points"
                id="points"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.points }"
              />
              <div v-if="errors.points" class="invalid-feedback">
                {{ errors.points }}
              </div>
            </div>
            <div class="flex-item price">
              <label for="price">Giá:</label>
              <input
                type="number"
                v-model="point.price"
                id="price"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.price }"
              />
              <div v-if="errors.price" class="invalid-feedback">
                {{ errors.price }}
              </div>
            </div>
            <div class="flex-item currency">
              <label for="idCurrency">Đơn vị:</label>
              <div class="select-wrapper">
                <select
                  v-model="point.idCurrency"
                  id="idCurrency"
                  class="form-control"
                >
                  <option value="" disabled selected hidden>Chọn đơn vị</option>
                  <option
                    v-for="currency in currencies"
                    :key="currency.id"
                    :value="currency.id"
                  >
                    {{ currency.units }}
                  </option>
                </select>
                <span class="select-arrow">&#9662;</span>
              </div>
              <div v-if="errors.idCurrency" class="invalid-feedback">
                {{ errors.idCurrency }}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Thêm Mới</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      point: {
        name: "",
        points: "",
        price: "",
        idCurrency: "",
      },
      currencies: [],
      errors: {},
    };
  },
  created() {
    this.fetchCurrencies();
  },
  methods: {
    async fetchCurrencies() {
      try {
        const response = await axios.get(
          "http://localhost:8282/api/v1/currencies"
        );
        this.currencies = response.data;
        this.point.idCurrency = 3;
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    },
    validate() {
      this.errors = {};
      if (!this.point.name) {
        this.errors.name = "Tên gói là bắt buộc.";
      }
      if (!this.point.points) {
        this.errors.points = "Số lượt hỗ trợ là bắt buộc.";
      } else if (this.point.points <= 0) {
        this.errors.points = "Số lượt hỗ  phải lớn hơn 0.";
      }
      if (!this.point.price) {
        this.errors.price = "Giá là bắt buộc.";
      } else if (this.point.price <= 0) {
        this.errors.price = "Giá phải lớn hơn 0.";
      }
      if (!this.point === "") {
        this.errors.idCurrency = "Vui lòng chọn loại tiền tệ.";
      }
      return Object.keys(this.errors).length === 0;
    },
    async submitCreate() {
      if (this.validate()) {
        try {
          await axios.post("http://localhost:8282/api/v1/points", this.point);
          this.closeModal();
          this.$emit("created");
          toast.success("Tạo gói hỗ trợ thành công");
        } catch (error) {
          console.error("Error creating point:", error);
        }
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

  
<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  position: relative;
  width: 550px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.5s ease;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  color: #333;
  cursor: pointer;
}

.flex-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-item {
  flex: 1;
  margin-right: 10px;
}

.flex-item:last-child {
  margin-right: 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.flex-item input.form-control,
.flex-item select.form-control {
  height: 46px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

select.form-control {
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.modal-body .form-group input[type="text"],
.modal-body .form-group input[type="number"] {
  width: calc(50% - 10px);
}

.modal-body .form-group select {
  width: calc(50% - 10px);
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
}

.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
.flex-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-item {
  flex-basis: 0;
  flex-grow: 1;
  margin-right: 10px;
}

.points {
  flex: 3;
}

.price {
  flex: 4;
}

.currency {
  flex: 3;
}

.flex-item:last-child {
  margin-right: 0;
}
.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-arrow {
  position: absolute;
  top: 5px;
  right: 10px;
  pointer-events: none;
  font-size: 25px;
  color: #000000;
}
.select-wrapper:hover .select-arrow {
  transform: rotate(180deg);
}
</style>
