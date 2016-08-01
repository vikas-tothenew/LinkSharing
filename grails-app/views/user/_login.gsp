<div class="panel panel-default" id="loginbox">
    <div class="panel-heading">Login</div>
    <div class="panel-body">
        <form id="loginform" action="login/loginHandler">
            <div class="form-group">
                <label for="exampleInputEmailusername">Email / Username</label>
                <input type="text" class="form-control" id="exampleInputEmailusername" placeholder="Email Or UserName" name="userName" required>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword11">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword11" placeholder="Password" name="password" required>
            </div>
            <div class="checkbox">
                <label>
                    <a href="#" id="forgetpasswordlink">Forgot Password</a>
                </label>
                <button type="submit" class="btn btn-primary pull-right">Login</button>
            </div>
        </form>
    </div>
</div>