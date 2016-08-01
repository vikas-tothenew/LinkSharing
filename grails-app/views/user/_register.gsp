<div class="panel panel-default">
    <div class="panel-heading">Register</div>
    <div class="panel-body">
        <form id="registerform" action="login/register" method="POST">
            <div class="form-group">
                <label for="exampleInputfirstname" class="required">First Name</label>
                <input type="text" class="form-control" name="firstName" id="exampleInputfirstname" placeholder="First Name" required>
            </div>
            <div class="form-group">
                <label for="exampleInputlastname" class="required">Last Name</label>
                <input type="text" class="form-control" name="lastName" id="exampleInputlastname" placeholder="Last Name" required>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1" class="required">Email</label>
                <input type="email" class="form-control" name="email" id="exampleInputEmail1" placeholder="Email" required>
            </div>
            <div class="form-group">
                <label for="exampleInputusername" class="required">Username</label>
                <input type="text" class="form-control" name="userName" id="exampleInputusername" placeholder="Username" required>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="required">Password</label>
                <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password" required>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword2" class="required">Confirm Password</label>
                <input type="password" class="form-control" name="confirmPassword" id="exampleInputPassword2" placeholder="Confirm Password" required>
            </div>
            <p class="selectedimage"></p>
            <div class="">
                <button type="button" class="btn btn-default pull-left" id="uploadavatar">Upload Avatar</button>
                <button type="submit" class="btn btn-primary pull-right">Register</button>
            </div>
        </form>
    </div>
</div>