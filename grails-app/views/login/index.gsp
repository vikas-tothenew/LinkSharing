<!DOCTYPE html>
<html lang="en">
<head>
    <title>LinkSharing</title>
    <meta name="layout" content="main">
</head>

<body>

<div class="container" style="padding-top:66px;">
    <g:if test="${error}"><p style="color:red;text-align:center;">${error}</p></g:if>
    <div class="row">
        <div class="col-sm-12">
            <div class="col-md-7">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">Recent Shares</div>
                            <div class="panel-body">
                                <div class="posts" id="sharedposts">
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="user/image/{{createdBy.id}}"/>
                                        </div>
                                        <div class="post-details">
                                            <p class="l1">
                                                <span class="author-name">{{createdBy.firstName}} {{createdBy.lastName}}</span>
                                                <span class="author-details"><a href="#"><span>@</span>{{createdBy.userName}}</a></span>
                                                <span class="time"> 5 min</span>
                                                <span class="topic-name pull-right"><a href="#">{{topic.name}}</a></span>
                                            </p>
                                            <p class="l2 text-justify">
                                                <span>{{description}}</span>
                                            </p>
                                            <p class="l3">
                                                <span class="social-icons">
                                                    <a class=""><i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i></a>
                                                    <a class=""><i class="fa fa-tumblr-square fa-lg" aria-hidden="true"></i></a>
                                                    <a class=""><i class="fa fa-google-plus-square fa-lg" aria-hidden="true"></i></a>
                                                </span>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">Top Posts</div>
                            <div class="panel-body">
                                <div class="posts" id="topposts">
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="user/image/{{createdBy.id}}"/>
                                        </div>
                                        <div class="post-details">
                                            <p class="l1">
                                                <span class="author-name">{{createdBy.firstName}} {{createdBy.lastName}}</span>
                                                <span class="author-details"><a href="#"><span>@</span>{{createdBy.userName}}</a></span>
                                                <span class="time"> 5 min</span>
                                                <span class="topic-name pull-right"><a href="#">{{topic.name}}</a></span>
                                            </p>
                                            <p class="l2 text-justify">
                                                <span>{{description}}</span>
                                            </p>
                                            <p class="l3">
                                                <span class="social-icons">
                                                    <a class=""><i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i></a>
                                                    <a class=""><i class="fa fa-tumblr-square fa-lg" aria-hidden="true"></i></a>
                                                    <a class=""><i class="fa fa-google-plus-square fa-lg" aria-hidden="true"></i></a>
                                                </span>
                                            </p>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="loginholder">
                    <g:render template="/user/login" />
                    <g:render template="/user/loginforget" />
                </div>
                <g:render template="/user/register" />
            </div>
        </div>
    </div>
</div>
<div id="page" style="display:none;" name="login"></div>
</body>
</html>