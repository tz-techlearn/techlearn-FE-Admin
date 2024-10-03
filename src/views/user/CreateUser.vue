<template>
<div class="container-fluid p-5">
<div>
    <div class="card-header d-flex justify-content-between">
        <div class="header-title">
            <h4 class="card-title">Thêm thông tin người dùng</h4>
        </div>
    </div>
    <hr/>
    <div class="card-body">
        <form action="page-list-users.html" data-toggle="validator">
            <div class="row"> 
                <div class="col-md-6">                      
                    <div class="form-group">
                        <label>Họ và tên</label>
                        <input type="text" class="form-control" placeholder="Nhập họ và tên" required>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>  
                <!-- <div class="col-md-6">                      
                    <div class="form-group">
                        <label>User Name *</label>
                        <input type="text" class="form-control" placeholder="Nhập User Name" required>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>   -->
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="text" class="form-control" placeholder="Nhập Email" required>
                        <div class="help-block with-errors"></div>
                    </div>
                </div> 
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Giới tính</label>
                        <select name="type" class="selectpicker form-control" data-style="py-0">
                            <option>Nữ</option>
                            <option>Nam</option>
                        </select>
                    </div>
                </div> 
                                
                <div class="col-md-6">                      
                    <div class="form-group">
                        <label>Mật khẩu</label>
                        <input type="text" class="form-control" placeholder="Nhập Mật khẩu" required>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>  
                <div class="col-md-6">                      
                    <div class="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input type="text" class="form-control" placeholder="Xác nhận mật khẩu" required>
                        <div class="help-block with-errors"></div>
                    </div>
                </div> 
                <!-- <div class="col-md-12">
                    <div class="checkbox d-inline-block mb-3">
                        <input type="checkbox" class="checkbox-input mr-2" id="checkbox1" checked="">
                        <label for="checkbox1">Notify User by Email</label>
                    </div>
                </div>                                -->
            </div>                            
            <button type="submit" class="btn btn-primary mr-2">Thêm người dùng</button>
            <button type="reset" class="btn btn-danger">Quay lại</button>
        </form>
    </div>
</div>
</div>
</template>
<script setup>
</script>
<style scoped>
.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
}

.selectpicker {
height: 100%;
}

.form-group label {
  font-weight: 600;
}

button.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
  color: white;
}

button.btn-danger {
  background-color: #f8d7da;
  border-color: #f8d7da;
  color: #721c24;
}

.checkbox-input {
  margin-right: 5px;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
}

.btn {
  font-size: 16px;
  margin-top: 10px;
}
</style>