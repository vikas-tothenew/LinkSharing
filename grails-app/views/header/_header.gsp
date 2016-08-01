<!-- Top nav -->
<div id="top" class="top-nav-fixed">
    <div class="top-wrapper">
        <a href="#" class="navbar-brand" title="">LinkSharing</a>
        <ul class="topnav">
            <li class="searchwrapper nothover">
                <div class="searchbox">
                    <span class="searchicon"><i class="fa fa-search"></i></span>
                    <input type="search" name="query"/>
                </div>
            </li>
            <g:if test="${session.user}">
                <li><a href="#" title="" data-toggle="modal" data-target="#topiccreate"><i class="fa fa-comment-o"></i></a></li>
                <li><a href="#" title="" data-toggle="modal" data-target="#topicinvite"><i class="fa fa-envelope-o"></i></a></li>
                <li><a href="#" title="" data-toggle="modal" data-target="#linkcreate"><i class="fa fa-link"></i></a></li>
                <li><a href="#" title="" data-toggle="modal" data-target="#doccreate"><i class="fa fa-file-o" ></i></a></li>
                <li class="topuser nothover">
                    <a title="" data-toggle="dropdown"><img src="user/image/${session.user.id}" style="width:26px;" alt="" /><span>${session.user.name}</span><i class="caret"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" title=""><span class="user-profile"></span>My profile</a></li>
                        <li><a href="#" title=""><span class="user-stats"></span>Statistics <strong>2</strong></a></li>
                        <li><a href="#" title=""><span class="user-settings"></span>Switch user</a></li>
                        <li><a href="login/logout" title="" ><span class="user-logout"></span>Logout</a></li>
                    </ul>
                </li>
            </g:if>
        </ul>
    </div>
</div>
<!-- /top nav -->