<%@ page import="com.ttnd.linksharing.Seriousness; com.ttnd.linksharing.DefaultMethods" %>
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
                                <div class="editbox post">
                                    <div class="pic">
                                        <img class="img-responsive img-rounded" src="user/image/${topic.createdBy.id}"/>
                                    </div>
                                    <div class="details row">
                                        <p class="l1">
                                            <span class="topic-name"><a href="topic/show?id=${topic?.id}" ><u>${topic?.name}</u></a></span>
                                            <span><mark>${topic?.visibility?.name()}</mark></span>
                                        </p>
                                        <p class="l2 col-sm-4 no-padding no-margin">
                                            <g:if test="${session.user}">
                                                <g:if test="${session.user.id!=topic.createdBy.id && com.ttnd.linksharing.DefaultMethods.isSubscribed(topic.subscriptions,session.user)}">
                                                    <span>
                                                        <a href="profile?id=${topic.createdBy.id}"><b style="display:block;"><span>@</span>${topic.createdBy?.userName}</b></a>
                                                        <a href="#" class="handleLinks" invoke="unsubscribeTopic(${topic?.id},this)" >unsubscribe</a>
                                                    </span>
                                                </g:if>
                                                <g:elseif test="${session.user.id!=topic.createdBy.id}">
                                                    <span>
                                                        <a href="profile?id=${topic.createdBy.id}"><b style="display:block;"><span>@</span>${topic.createdBy?.userName}</b></a>
                                                        <a href="#" class="handleLinks" invoke="subscribeTopic(${topic?.id},this)">subscribe</a>
                                                    </span>
                                                </g:elseif>
                                                <g:else>
                                                    <span>
                                                        <a href="profile?id=${topic.createdBy.id}"><b style="display:block;"><span>@</span>${topic.createdBy?.userName}</b></a>
                                                    </span>
                                                </g:else>
                                            </g:if>
                                            <g:else>
                                                <span>
                                                    <a href="profile?id=${topic.createdBy.id}"><b style="display:block;"><span>@</span>${topic.createdBy?.userName}</b></a>
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
                                        <p class="commandbox pull-right">
                                            <g:if test="${session.user && com.ttnd.linksharing.DefaultMethods.isSubscribed(topic.subscriptions,session.user)}">
                                                <select class="handleChange" invoke="updateSubscription(${topic.id},${session.user?.id},this)">
                                                    <% com.ttnd.linksharing.Seriousness s = com.ttnd.linksharing.DefaultMethods.getSeriousness(topic.subscriptions,session.user);%>
                                                    <option <%s==com.ttnd.linksharing.Seriousness.CASUAL?out.print("selected"):out.print("") %>>CASUAL</option>
                                                    <option <%s==com.ttnd.linksharing.Seriousness.SERIOUS?out.print("selected"):out.print("") %>>SERIOUS</option>
                                                    <option <%s==com.ttnd.linksharing.Seriousness.VERY_SERIOUS?out.print("selected"):out.print("") %>>VERY_SERIOUS</option>
                                                </select>
                                            </g:if>
                                            <g:if test="${topic.createdBy.id == session?.user?.id}">
                                                <select class="visibility">
                                                    <option <%topic.visibility==com.ttnd.linksharing.Visibility.PUBLIC?out.print("selected"):out.print("");%> value="PUBLIC">Public</option>
                                                    <option <%topic.visibility==com.ttnd.linksharing.Visibility.PRIVATE?out.print("selected"):out.print("");%> value="PRIVATE">Private</option>
                                                </select>
                                            </g:if>
                                            <a href="#" invoke="inviteTopic(${topic.id},this)" class="btn btn-danger btn-xs handleLinks">
                                                <i class="fa fa-envelope-o"></i>
                                            </a>
                                            <g:if test="${topic.createdBy.id == session?.user?.id}">
                                                <a class="btn btn-primary btn-xs handleLinks" invoke="editTopic(${topic.id},this)" href="topic/edit?id={{id}}">
                                                    <i class="fa fa-edit"></i>
                                                </a>
                                                <a if="{{createdBy.id}}==${session?.user?.id}" class="btn btn-danger btn-xs handleLinks" invoke="deleteTopic(${topic.id},this)" href="topic/delete?id={{id}}">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </g:if>
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
                                    <div class="post hide">
                                        <div class="poster-pic">
                                            <img class="img-responsive img-rounded" src="user/image/{{id}}"/>
                                        </div>
                                        <div class="post-details">
                                            <h3>{{firstName}} {{lastName}}</h3>
                                            <p class="l1">
                                                <span class="author-details"><a href="profile?id={{id}}"><span>@</span>{{userName}}</a></span>
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
<div id="page" style="display:none;" name="showtopic" data-id="${topic?.id}" loggedin="${session.user?.id}"></div>
</body>
</html>