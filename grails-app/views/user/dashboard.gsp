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
                                <img class="img-responsive img-rounded" src="${asset.assetPath(src: 'defaults/images.png')}"/>
                            </div>
                            <div class="profile-details">
                                <h3>${session.user?.name}</h3>
                                <p class="l1">
                                    <span class="author-details"><a href="#">@${session.user?.userName}</a></span>
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
                                        <i>${user?.topic.size()}</i>
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
                <g:render template="/user/inbox" />

                <div class="panel panel-default">
                    <div class="panel-heading">Change Password</div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="firstname" class="col-sm-3 control-label required">Password</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="firstname" placeholder="First Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="lastname" class="col-sm-3 control-label required">Confirm Password</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" id="lastname" placeholder="Last Name">
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
<div id="page" style="display:none;" name="dashboard" data-id="${user?.id}"></div>
</body>
</html>