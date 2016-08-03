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
                                <img class="img-responsive img-rounded" src="user/image/${user?.id}"/>
                            </div>
                            <div class="profile-details">
                                <h3>${user?.name}</h3>
                                <p class="l1">
                                    <span class="author-details"><a href="profile?id=${user?.id}">@${user?.userName}</a></span>
                                </p>
                                <hr/>
                                <p class="l2 col-sm-6">
                                    <span>
                                        <b style="display:block;">Subscriptions</b>
                                        <i class="user-subscription-count">${user?.subscriptions?.size()}</i>
                                    </span>
                                </p>
                                <p class="l2 col-sm-6">
                                    <span>
                                        <b style="display:block;">Topics</b>
                                        <i class="user-topic-count">${user?.topic?.size()}</i>
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
                <div class="row">
                    <div class="col-sm-12">
                        <g:render template="/topic/panel2" />
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <g:render template="/user/inbox" />
            </div>
        </div>
    </div>
</div>
<div id="page" style="display:none;" name="publicprofile" data-id="${user?.id}" loggedin="${session.user?.id}"></div>
</body>
</html>