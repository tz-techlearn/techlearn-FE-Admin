<template>
  <div>
    <!-- Modern Sidebar -->
    <div class="sidebar">
      <router-link to="/" class="brand">
        <span>Logo</span>
      </router-link>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" exact>
            <i class="bi bi-house-door-fill"></i> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/profile"
            class="nav-link"
            active-class="active"
            exact
          >
            <i class="bi bi-house-door-fill"></i> Profile
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active">
            <i class="bi bi-speedometer2"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link" active-class="active">
            <i class="bi bi-table"></i> Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link" active-class="active">
            <i class="bi bi-gear-fill"></i> Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link" active-class="active">
            <i class="bi bi-person-circle"></i> Profile
          </router-link>
        </li> -->
      </ul>

      <!-- <div class="user-dropdown mt-auto">
        <router-link to="/profile" class="user-info">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            class="user-img rounded-circle"
          />
          <strong>User</strong>
        </router-link>
        <ul class="dropdown-menu">
          <li>
            <router-link class="dropdown-item" to="/settings"
              >Settings</router-link
            >
          </li>
          <li>
            <router-link class="dropdown-item" to="/profile"
              >Profile</router-link
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <router-link class="dropdown-item" to="/logout"
              >Sign out</router-link
            >
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Sidebar styling */
.sidebar {
  position: fixed; /* Fix position to the left side of the viewport */
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh; /* Full viewport height */
  padding: 20px;
  background-color: #2c3e50; /* Modern dark blue */
  color: #ecf0f1; /* Light text */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable scrolling for sidebar content if needed */
}

.brand {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 1.5rem;
  color: #ecf0f1;
  text-decoration: none;
}

.brand:hover {
  color: #3498db; /* Light blue */
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 8px;
  margin-bottom: 10px;
}

.nav-link i {
  margin-right: 8px;
}

.nav-link:hover {
  background-color: #3498db; /* Light blue on hover */
}

.nav-link.active {
  background-color: #2980b9; /* Dark blue for active link */
}

.user-dropdown {
  margin-top: auto;
}

.user-info {
  display: flex;
  align-items: center;
  color: #ecf0f1;
  text-decoration: none;
  margin-bottom: 10px;
}

.user-info:hover {
  color: #3498db;
}

.user-img {
  margin-right: 10px;
}

.dropdown-menu {
  background-color: #34495e;
  color: #ecf0f1;
  border: none;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: none;
}

.user-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  color: #ecf0f1;
  padding: 5px 10px;
}

.dropdown-item:hover {
  background-color: #3498db;
  border-radius: 5px;
}
</style>
