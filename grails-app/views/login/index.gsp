<!DOCTYPE html>
<html lang="en">
<head>
    <title>LinkSharing</title>
    <meta name="layout" content="main">
</head>

<body>
<!-- Top nav -->
<div id="top" class="top-nav-fixed">
    <div class="top-wrapper">
        <a href="#" class="navbar-brand" title="">LinkSharing</a>
        <ul class="topnav">
            <!--<li class="topuser">
						<a title="" data-toggle="dropdown"><img src="images/user.png" alt="" /><span>Vikas Kumar</span><i class="caret"></i></a>
						<ul class="dropdown-menu">
							<li><a href="#" title=""><span class="user-profile"></span>My profile</a></li>
							<li><a href="#" title=""><span class="user-stats"></span>Statistics <strong>2</strong></a></li>
							<li><a href="#" title=""><span class="user-settings"></span>Switch user</a></li>
							<li><a href="#" title=""><span class="user-logout"></span>Logout</a></li>
						</ul>
					</li>
					<li><a href="#" title=""><b class="settings"></b></a></li>-->
            <li><a href="#" title=""><b class="logout"></b></a></li>
        </ul>
    </div>
</div>
<!-- /top nav -->

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
                                <div class="posts">
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="${asset.assetPath(src: 'defaults/images.png')}"/>
                                        </div>
                                        <div class="post-details">
                                            <p class="l1">
                                                <span class="author-name">Vikas Kumar</span>
                                                <span class="author-details"><a href="#">@uday</a></span>
                                                <span class="time"> 5 min</span>
                                                <span class="topic-name pull-right"><a href="#">Grails</a></span>
                                            </p>
                                            <p class="l2 text-justify">
                                                <span >Stylized implementation of HTML's <abbr> element for abbreviations and acronyms to show the expanded version on hover. Abbreviations with a title attribute have a light dotted bottom border and a help cursor on hover, providing additional context on hover and to users of assistive technologies.</span>
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
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="${asset.assetPath(src: 'defaults/images.png')}"/>
                                        </div>
                                        <div class="post-details">
                                            <p class="l1">
                                                <span class="author-name">Vikas Kumar</span>
                                                <span class="author-details"><a href="#">@uday</a></span>
                                                <span class="time"> 5 min</span>
                                                <span class="topic-name pull-right"><a href="#">Grails</a></span>
                                            </p>
                                            <p class="l2 text-justify">
                                                <span>Stylized implementation of HTML's <abbr> element for abbreviations and acronyms to show the expanded version on hover. Abbreviations with a title attribute have a light dotted bottom border and a help cursor on hover, providing additional context on hover and to users of assistive technologies.</span>
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
                                <div class="posts">
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="${asset.assetPath(src: 'defaults/images.png')}"/>
                                        </div>
                                        <div class="post-details">
                                            <p class="l1">
                                                <span class="author-name">Vikas Kumar</span>
                                                <span class="author-details"><a href="#">@uday</a></span>
                                                <span class="time"> 5 min</span>
                                                <span class="topic-name pull-right"><a href="#">Grails</a></span>
                                            </p>
                                            <p class="l2 text-justify">
                                                <span>Stylized implementation of HTML's <abbr> element for abbreviations and acronyms to show the expanded version on hover. Abbreviations with a title attribute have a light dotted bottom border and a help cursor on hover, providing additional context on hover and to users of assistive technologies.</span>
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
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="${asset.assetPath(src: 'defaults/images.png')}"/>
                                        </div>
                                        <div class="post-details">
                                            <p class="l1">
                                                <span class="author-name">Vikas Kumar</span>
                                                <span class="author-details"><a href="#">@uday</a></span>
                                                <span class="time"> 5 min</span>
                                                <span class="topic-name pull-right"><a href="#">Grails</a></span>
                                            </p>
                                            <p class="l2 text-justify">
                                                <span>Stylized implementation of HTML's <abbr> element for abbreviations and acronyms to show the expanded version on hover. Abbreviations with a title attribute have a light dotted bottom border and a help cursor on hover, providing additional context on hover and to users of assistive technologies.</span>
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
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <div class="checkbox">
                                <label>
                                    <a href="#">Forgot Password</a>
                                </label>
                                <button type="submit" class="btn btn-primary pull-right">Login</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Register</div>
                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputfirstname">First Name <small class="text-danger">*</small></label>
                                <input type="test" class="form-control" id="exampleInputfirstname" placeholder="First Name">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputlastname">Last Name <small class="text-danger">*</small></label>
                                <input type="test" class="form-control" id="exampleInputlastname" placeholder="Last Name">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email <small class="text-danger">*</small></label>
                                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputusername">Username <small class="text-danger">*</small></label>
                                <input type="test" class="form-control" id="exampleInputusername" placeholder="Username">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password <small class="text-danger">*</small></label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword2">Confirm Password <small class="text-danger">*</small></label>
                                <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm Password">
                            </div>
                            <div class="">

                                <button type="submit" class="btn btn-primary pull-right">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>