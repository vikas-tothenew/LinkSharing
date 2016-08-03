<div class="panel panel-default topicspanel">
    <div class="panel-heading">
        <span class="paneltitle"></span>
    </div>
    <div class="panel-body" ><!-- style="max-height: 522px;overflow:auto;" -->
        <div class="posts" id="subscribedtopics">
            <div class="post hide">
                <div class="poster-pic">
                    <img class="img-responsive img-rounded" src="user/image/{{createdBy.id}}"/>
                </div>
                <div class="post-details">
                    <p class="l1">
                        %{--<span class="author-name">{{createdBy.firstName}} {{createdBy.lastName}}</span>--}%
                        <span class="topic-name"><a href="topic/show?id={{id}}">{{name}}</a></span>
                    </p>
                    <div class="row">
                        <span class="col-sm-4">
                            <a href=""><span>@</span>{{createdBy.userName}}</a>
                            <a href="topic/subscribe?id={{id}}" if-method="isNotSubscribed,{{id}},${session?.user?.id}" class="handleLinks" invoke="subscribeTopic({{id}},this)">Subscribe</a>
                            <a href="topic/unsubscribe?id={{id}}" if="{{createdBy.id}}!=${session?.user?.id}" if-method="isSubscribed,{{id}},${session?.user?.id}" class="handleLinks" invoke="unsubscribeTopic({{id}},this)">Unsubscribe</a>
                        </span>
                        <span class="col-sm-5">
                            <span style="display:block">Subscriptions</span>
                            <span>{{subscriptions.length}}</span>
                        </span>
                        <span class="col-sm-3">
                            <span style="display:block">Posts</span>
                            <span>{{resources.length}}</span>
                        </span>
                    </div>
                    <p class="l3">
                        <span class="operation-icon pull-right">
                            <select class="selectseriousness seriousness handleChange" invoke="updateSubscription({{id}},${session.user?.id},this)" if-method="isSubscribed,{{id}},${session?.user?.id}">
                                <option value="CASUAL" if-method-attr="seriousness,CASUAL,{{id}},${session?.user?.id}?selected:''">Casual</option>
                                <option value="SERIOUS" if-method-attr="seriousness,SERIOUS,{{id}},${session?.user?.id}?selected:''">Serious</option>
                                <option value="VERY_SERIOUS" if-method-attr="seriousness,VERY_SERIOUS,{{id}},${session?.user?.id}?selected:''">Very Serious</option>
                            </select>
                            <select if="{{createdBy.id}}==${session?.user?.id}" class="visibility">
                                <option if-attr="'{{visibility.name}}'=='PUBLIC'?'selected':''" value="PUBLIC">Public</option>
                                <option if-attr="'{{visibility.name}}'=='PRIVATE'?'selected':''" value="PRIVATE">Private</option>
                            </select>
                            <a class="btn btn-success btn-xs handleLinks" invoke="inviteTopic({{id}},this)" href="topic/invite?id={{id}}">
                                <i class="fa fa-envelope-o"></i>
                            </a>
                            <a if="{{createdBy.id}}==${session?.user?.id}" class="btn btn-primary btn-xs handleLinks" invoke="editTopic({{id}},this)" href="topic/edit?id={{id}}">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a if="{{createdBy.id}}==${session?.user?.id}" class="btn btn-danger btn-xs handleLinks" invoke="deleteTopic({{id}},this)" href="topic/delete?id={{id}}">
                                <i class="fa fa-trash-o"></i>
                            </a>
                        </span>
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>