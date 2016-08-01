<div class="panel panel-default" id="loginforgetbox">
    <div class="panel-heading">
        <a href="#" class="btn btn-default btn-sm backbutton">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
    Recover Password</div>

    <div class="panel-body">
        <form id="loginforgetform" action="login/loginforgethandler">
            <div class="form-group">
                <label for="exampleInputEmailusername" class="required">Email</label>
                <input type="email" class="form-control" id="exampleInputEmailusername" placeholder="Enter email to receive password" name="userName" required>
            </div>
            <div class="checkbox">
                <button type="submit" class="btn btn-primary pull-right">Submit</button>
            </div>
        </form>
    </div>
</div>