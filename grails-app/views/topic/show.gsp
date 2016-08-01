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
            <div class="col-md-5">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span>Topic : "<strong>${topic?.name}</strong>"</span>
                            </div>
                            <div class="panel-body">
                                <div class="editbox">
                                    <div class="pic">
                                        <img class="img-responsive img-rounded" src="${asset.assetPath(src: 'defaults/images.png')}"/>
                                    </div>
                                    <div class="details row">
                                        <p class="l1">
                                            <span><a href="topic/show?id=${topic?.id}" ><u>${topic?.name}</u></a></span>
                                            <span><mark>${topic?.visibility?.name()}</mark></span>
                                        </p>
                                        <p class="l2 col-sm-4 no-padding no-margin">
                                            <g:if test="${session.user}">
                                                <g:if test="${session.user.id!=topic.createdBy.id && com.ttnd.linksharing.DefaultMethods.isSubscribed(topic.subscriptions,session.user)}">
                                                    <span>
                                                        <b style="display:block;"><span>@</span>${topic.createdBy?.userName}</b>
                                                        <a href="#" class="handleLinks" invoke="unsubscribeTopic(${topic?.id})" >unsubscribe</a>
                                                    </span>
                                                </g:if>
                                                <g:elseif test="${session.user.id!=topic.createdBy.id}">
                                                    <span>
                                                        <b style="display:block;"><span>@</span>${topic?.createdBy?.userName}</b>
                                                        <a href="#" class="handleLinks" invoke="subscribeTopic(${topic?.id})">subscribe</a>
                                                    </span>
                                                </g:elseif>
                                                <g:else>
                                                    <span>
                                                        <b style="display:block;"><span>@</span>${topic?.createdBy?.userName}</b>
                                                    </span>
                                                </g:else>
                                            </g:if>
                                            <g:else>
                                                <span>
                                                    <b style="display:block;"><span>@</span>${topic?.createdBy?.userName}</b>
                                                    <a href="#" class="handleLinks" invoke="subscribeTopic(${topic?.id})">subscribe</a>
                                                </span>
                                            </g:else>
                                        </p>
                                        <p class="l2 col-sm-5 no-padding no-margin">
                                            <span>
                                                <b style="display:block;">Subscriptions</b>
                                                <i>50</i>
                                            </span>
                                        </p>
                                        <p class="l2 col-sm-3 no-padding">
                                            <span>
                                                <b style="display:block;">Posts</b>
                                                <i>50</i>
                                            </span>
                                        </p>
                                        <p class="commandbox">

                                            <span class="op-btn">
                                                <a href="#" class="sharetopic"><i class="fa fa-envelope-o"></i></a>
                                            </span>

                                            <span class="editfield">
                                                <select>
                                                    <option>Serious</option>
                                                    <option>Not-Serious</option>
                                                </select>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading"> <span>Users : "<strong>${topic?.name}</strong>"</span></div>
                            <div class="panel-body">
                                <div class="posts" id="topicusers">
                                    <div class="post">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="user/image/{{id}}"/>
                                        </div>
                                        <div class="post-details">
                                            <h3>{{firstName}} {{lastName}}</h3>
                                            <p class="l1">
                                                <span class="author-details"><a href="#"><span>@</span>{{userName}}</a></span>
                                            </p>
                                            <hr/>
                                            <p class="l3 col-sm-6 no-padding">
                                                <span>
                                                    <b style="display:block;">Subscriptions</b>
                                                    <i>{{subscriptions.length}}</i>
                                                </span>
                                            </p>
                                            <p class="l3 col-sm-6">
                                                <span>
                                                    <b style="display:block;">Topics</b>
                                                    <i>{{topic.length}}</i>
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
            <div class="col-md-7">
                <g:render template="/resource/panel" />
            </div>
        </div>
    </div>
</div>
<div id="page" style="display:none;" name="showtopic" data-id="${topic?.id}"></div>
</body>
</html>