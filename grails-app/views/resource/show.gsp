<%@ page import="com.ttnd.linksharing.DefaultMethods" %>
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
            <div class="col-md-7">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="editbox">
                                    <div class="pic">
                                        <img class="img-responsive img-rounded" src="user/image/${resource?.createdBy.id}"/>
                                    </div>
                                    <div class="details row">
                                        <div class="col-sm-12">
                                            <span class="heading">
                                                ${resource?.createdBy.firstName +" "+resource?.createdBy.lastName}
                                            </span>
                                            <span class="link pull-right">
                                                <a href="topic/show?id=${resource?.topic.id}"><strong>${resource?.topic.name}</strong></a>
                                            </span>
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="author-details">
                                                <a href="profile?id=${resource?.createdBy.id}"><span>@</span>${resource?.createdBy.userName}</a>
                                            </span>
                                            <span class="link pull-right">
                                                ${new java.text.SimpleDateFormat("hh:mm aa dd MMM yyyy").format(resource?.lastUpdated)}
                                            </span>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="stars-container pull-right">
                                                <g:set var="ratings" value="${resource.getRatingInfo()}"/>
                                                <span class="stars" rating="${ratings?.averageScore-1}">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                </span>
                                                <span>
                                                    <i style="color:#dfdfdf;">By </i><small style="color:#d34836;" id="bytotaluser">${ratings.totalVotes} User</small>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <p class="text-justify">${resource.description}</p>
                                        </div>
                                    </div>
                                    <div class="details row">
                                        <p class="l3 col-sm-12">
                                            <span class="social-icons">
                                                <a class="" href=""><i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i></a>
                                                <a class="" href=""><i class="fa fa-tumblr-square fa-lg" aria-hidden="true"></i></a>
                                                <a class="" href=""><i class="fa fa-google-plus-square fa-lg" aria-hidden="true"></i></a>
                                            </span>
                                            <span class="operation-icon pull-right">
                                                <g:if test="${resource.class.name.contains("Document")}">
                                                    <a class="btn btn-primary btn-xs handleLinks" invoke="downloadResource(${resource.id})" href="resource/download?id=${resource.id}"><span class="">Download</span></a>
                                                </g:if>
                                                <g:else>
                                                    <a class="btn btn-primary btn-xs handleLinks" invoke="browseResource(${resource.id})" href="resource/browse?id=${resource.id}"><span class="">Browse</span></a>
                                                </g:else>
                                                <a class="btn btn-primary btn-xs" href="resource/show?id=${resource.id}"><span class="">View Post</span></a>
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
            <div class="col-md-5">
                <g:render template="/topic/panel" />
            </div>
        </div>
    </div>
</div>
<div id="page" style="display:none;" name="showresource" data-id="${resource?.id}" loggedin="${session.user?.id}"></div>
</body>
</html>