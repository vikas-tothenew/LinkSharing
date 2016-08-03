<div class="panel panel-default topicspanel">
    <div class="panel-heading">
        <span>Posts : "<strong>${topic?.name}</strong>"</span>
        <span class="topicsearch pull-right" >
            <input type="search" name="topicsearch" id="topicresourcesearch" />
        </span>
    </div>
    <div class="panel-body" style="max-height: 522px;overflow:auto;">
        <div class="posts" id="topicposts">
            <div class="post hide">
                <div class="poster-pic">
                    <img class="img-responsive img-rounded" src="user/image/{{createdBy.id}}"/>
                </div>
                <div class="post-details">
                    <p class="l1">
                        <span class="author-name">{{createdBy.firstName}} {{createdBy.lastName}}</span>
                        <span class="author-details"><a href="profile?id={{createdBy.id}}"><span>@</span>{{createdBy.userName}}</a></span>
                        <span class="time"> {{lastUpdated}}</span>
                        <span class="topic-name pull-right"><a href="topic/show?id={{topic.id}}">{{topic.name}}</a></span>
                    </p>
                    <p class="l2 text-justify">
                        <span>{{description}}</span>
                    </p>
                    <p class="l3">
                        <span class="social-icons">
                            <a class="" href=""><i class="fa fa-facebook-square fa-lg" aria-hidden="true"></i></a>
                            <a class="" href=""><i class="fa fa-tumblr-square fa-lg" aria-hidden="true"></i></a>
                            <a class="" href=""><i class="fa fa-google-plus-square fa-lg" aria-hidden="true"></i></a>
                        </span>
                        <span class="operation-icon pull-right">
                            <a if="'{{resourceType}}'.contains('Document')" class="btn btn-primary btn-xs handleLinks" invoke="downloadResource({{id}})" href="resource/download?id={{id}}"><span class="">Download</span></a>
                            <a if="'{{resourceType}}'.contains('Link')" class="btn btn-primary btn-xs handleLinks" invoke="browseResource({{id}})" href="resource/browse?id={{id}}"><span class="">Browse</span></a>
                            <a class="btn btn-primary btn-xs handleLinks" href="resource/show?id={{id}}"><span class="">View Post</span></a>
                        </span>
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>