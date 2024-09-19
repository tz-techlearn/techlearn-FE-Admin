<template>
  <nav class="navbar-expand-lg navbar">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand" href="#">MyWebsite</a>

      <!-- Nút toggle cho di động -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Mục điều hướng -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" href="#">
              <i class="fas fa-sign-out-alt"></i> Đăng xuất
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Không cần mã script cụ thể cho phần này, Bootstrap lo phần tương tác cho navbar
</script>

<style scoped>
.navbar {
  background-color: #a0b2c4;
}

.navbar-nav .nav-link {
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease-in-out;
}

.navbar-nav .nav-link:hover {
  color: #0d6efd;
}

.nav-link i {
  margin-right: 8px; /* Khoảng cách giữa icon và text */
}
</style>
