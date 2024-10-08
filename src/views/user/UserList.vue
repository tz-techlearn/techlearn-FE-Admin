<template>
    <div class="container-fluid p-5">
        <div class="card-body">
            <div class="table-responsive">
                <div class="row justify-content-between">
                    <div class="col-sm-5 col-md-5">
                        <p class="course-list-title h4">Danh sách gói hỗ trợ</p>
                    </div>
                    <div class="col-sm-2 col-md-2">
                    <div class="user-list-files d-flex">
                        <router-link class="bg-primary" to="/create-user">
                            Thêm mới
                        </router-link>
                    </div>
                    </div>
                </div>
                <table id="user-list-table" class="table table-striped dataTable mt-4" role="grid"
                    aria-describedby="user-list-page-info">
                    <thead>
                    <tr class="ligth">
                        <th>Ảnh</th>
                        <th>Họ và Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th style="min-width: 100px">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="text-center"><img class="rounded img-fluid avatar-40"
                                src="https://i.pinimg.com/564x/38/b5/0b/38b50b2961c574dca380b9e4cb847e26.jpg" alt="profile"></td>
                        <td>Anna Sthesia</td>
                        <td>annasthesia@gmail.com</td>
                        <td>Giảng viên</td>
                        <td>
                            <div class="flex align-items-center list-user-action">
                                <a class="btn btn-sm bg-edit" data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Edit" href="#"><i class="fas fa-edit" style="color: white"></i>
                            </a>
                                <a class="btn btn-sm bg-delete" data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Delete" href="#"> <i class="fas fa-trash " style="color: white"></i></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>

    </div>
</template>
<script setup>
</script>
<style scoped>
.course-list-title {
  font-weight: bold;
}

.card-body {
    background-color: white;
    border-radius: 8px;
}

h2 {
    color: #5a5a5a;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.row.justify-content-between {
    margin-bottom: 1.5rem;
}

.form-control {
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    width: 100%;
    font-size: 0.9rem;
}

.user-list-files a {
    background-color: #0B5ED7;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background-color 0.3s ease;
    margin-left: 0.5rem;
}

.user-list-files a:hover {
    background-color: #0B5ED7;
}

.table {
    border-collapse: separate;
    border-spacing: 0 0.5rem;
}

thead {
    background-color: #f8fafc;
}

thead th {
    border: none;
    font-weight: 600;
    color: #64748b;
    padding: 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
}

tbody tr {
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

tbody tr:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

tbody td {
    vertical-align: middle;
    padding: 1rem;
    border: none;
    font-size: 0.9rem;
}

td, th {
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; 
    max-width: 150px;
}

td:nth-child(2), 
td:nth-child(4), 
td:nth-child(5), 
td:nth-child(7)  {
    max-width: 200px; 
}

.avatar-40 {
    width: 40px;
    height: 40px;
    object-fit: cover;
}

.badge {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
    border-radius: 20px;
    font-weight: 500;
}


.badge.bg-primary {
    color: white;
}

.bg-edit{
    background-color: #efb400 !important;
}

.bg-delete{
    background-color: #df3f4f !important;
}

.badge.bg-warning-light {
    background-color: #fef3c7;
    color: #d97706;
}

.badge.bg-danger-light {
    background-color: #fee2e2;
    color: #dc2626;
}

.list-user-action {
    display: flex;
    gap: 0.5rem;
}

.btn-sm {
    padding: 0.25rem;
    font-size: 0.875rem;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.btn-sm:hover {
    background-color: #0B5ED7;
}

.btn-sm i {
    font-size: 1rem;
}

@media (max-width: 768px) {
    td, th {
        max-width: 100px; 
    }
}

.table-responsive {
    overflow-x: auto;
}

.table-responsive::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(to right, transparent, #38bdf8);
    opacity: 0.5;
}

.table-responsive {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

.table-responsive::-webkit-scrollbar {
    display: none;
}
</style>