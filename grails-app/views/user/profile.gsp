<!DOCTYPE html>
<html lang="en">
<head>
    <title>LinkSharing</title>
    <meta name="layout" content="main">
</head>

<body>


<div class="container" style="padding-top:66px;">
    <div class="row">
        <div class="col-sm-12">
            <div class="col-md-5">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="profile">
                            <div class="profile-pic">
                                <img class="img-responsive img-rounded" src="user/image/${user.id}"/>
                            </div>
                            <div class="profile-details">
                                <h3>${session.user?.name}</h3>
                                <p class="l1">
                                    <span class="author-details"><a href="#">@${user?.userName}</a></span>
                                </p>
                                <hr/>
                                <p class="l2 col-sm-6">
                                    <span>
                                        <b style="display:block;">Subscriptions</b>
                                        <i class="user-subscription-count">${user?.subscriptions.size()}</i>
                                    </span>
                                </p>
                                <p class="l2 col-sm-6">
                                    <span>
                                        <b style="display:block;">Topics</b>
                                        <i class="user-topic-count">${user?.topic.size()}</i>
                                    </span>
                                </p>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <g:render template="/topic/panel" />
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="panel panel-default">
                    <div class="panel-heading">Profile</div>
                    <div class="panel-body">
                        <form id="registerform" action="user/update" method="POST" autocomplete="off">
                            <div class="form-group">
                                <label for="exampleInputfirstname" class="required">First Name</label>
                                <input type="hidden" value="${user.id}" name="id"/>
                                <input type="text" class="form-control" name="firstName"  value="${user.firstName}" id="exampleInputfirstname" placeholder="First Name" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputlastname" class="required">Last Name</label>
                                <input type="text" class="form-control" name="lastName" value="${user.lastName}" id="exampleInputlastname" placeholder="Last Name" required>
                            </div>
                            <div class="form-group">
                                <label for="userName" class="required">Username</label>
                                <input type="text" class="form-control" name="userName" id="userName" value="${user.userName}" value="" placeholder="Username" required>
                            </div>
                            <p class="selectedimage"></p>
                            <div class="">
                                <button type="button" class="btn btn-default pull-left" id="uploadavatar">Select Photo</button>
                                <button type="submit" class="btn btn-primary pull-right">Update</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Change Password</div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="user/changepassword" method="post" id="changepasswordform" autocomplete="off">
                            <div class="form-group">
                                <label for="password" class="col-sm-3 control-label required">Password</label>
                                <div class="col-sm-9">
                                    <input type="hidden" value="${user.id}" name="id"/>
                                    <input type="password" class="form-control" id="password" value="" name="password" placeholder="New Password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirmpassword" class="col-sm-3 control-label required">Confirm Password</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control" id="confirmpassword" name="confirmPassword" placeholder="Confirm Password">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10 clearfix">
                                    <button type="submit" class="btn btn-default pull-right">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="page" style="display:none;" name="profile" data-id="${user?.id}" loggedin="${session.user?.id}"></div>
</body>
</html>