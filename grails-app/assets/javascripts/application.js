//= require cropper
//= require jcropper_wrapper
//= require image_cropper_popup
//= require service
//= require_self

var App = function(){

    var currentPage = ''; // current page
    var bindingRegex = /(\{\{([^}]+)\}\})/g;
    var bindingKeyRegex = /{\{([^}]+)\}\}/g;
    var bodyfind = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
    var pageData = {};
    var isLoggedIn = false;

    var handleResponsive = function(){

    }

    var handleMyProfile = function(){
        var registerform = $("#registerform");
        var btn = $('#uploadavatar');
        var changepasswordform = $('#changepasswordform');

        registerform.validate({
            rules: {
                userName: {
                    required: true,
                    remote: {
                        url: "user/availability",
                        type: "post"
                    }
                }
            },
            messages: {
                userName: {
                    required: "Please Enter Username!",
                    remote: "Username already in use!"
                },
                email: {
                    required: "Please Enter Email!",
                    remote: "Email already in use!"
                }
            },
            submitHandler: function(form) {
                $('#submit').attr('disabled','disabled');
                //console.log("Submitting the form");
                $(form).ajaxSubmit(function(data){
                    if(data.result){
                        toastr.success(data.message,'');
                        setTimeout(function(){
                            window.location.reload();
                        },700)
                    }else{
                        toastr.success(data.message,'');
                    }
                });
            }
        });

        changepasswordform.validate({
            rules : {
                password : {
                    minlength : 8
                },
                confirmPassword : {
                    minlength : 5,
                    equalTo : "#password"
                }
            },
            submitHandler: function(form) {
                $('#submit').attr('disabled','disabled');
                //console.log("Submitting the changepassword form");
                $(form).ajaxSubmit(function(data){
                    if(data.result){
                        toastr.success(data.message,'');
                        setTimeout(function(){
                            window.location.reload();
                        },700)
                    }else{
                        toastr.success(data.message,'');
                    }
                });
            }
        });

        uploaderCropImage(btn,{},registerform);
    }

    var handleMyTopics = function(id){
        var holder = $('#trendingtopics');
        holder.parents('.panel').find('.panel-heading').find('.paneltitle').html('Topics');
        holder.parent().css({
            "max-height": "290px",
            "overflow": "auto"
        });
        var data = {};
        if(id){
            data.id = id;
        }
        var promise = App.sendAjaxCall('user/topics',data,'GET',false);
        promise.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            console.error("Error Response ",parameters);
        })

        holder.on('unsubscribed',function(e,data){
            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
        });

        holder.on('deleted',function(e,data){
            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
                $('.user-topic-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
        });

        holder.on('topicupdated',function(e,data,name){
            $(data).parents('.post').find('.topic-name').find('a').html(name);
        });
    }

    var handleCommonEvents = function(){
        $('body').on('failed',function(e,data,message){
            toastr.error(message,'');
        });

        $('body').on('subscribed',function(e,data,message){
            toastr.success(message,'');
        });

        $('body').on('unsubscribed',function(e,data,message){
            toastr.success(message,'');
        });

        $('body').on('deleted',function(e,data,message){
            toastr.success(message,'');
        });

        $('body').on('invited',function(e,data,message){
            toastr.success(message,'');
        });

        $('body').on('topicupdated',function(e,data,message){
            toastr.success(message,'');
        });

        $('body').on('subscriptionupdated',function(e,data,message){
            toastr.success("Subscription Updated",'');
        })
    }

    var handleMyPost = function(){
        var holder2 = $("#topicposts");
        holder2.parents('.panel').find('.panel-heading').find('.paneltitle').html('Posts');
        var promise2 = App.sendAjaxCall('user/posts',{id:pageData.id,max:5},'GET',false);
        promise2.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder2,data);
        }).error(function(parameters){
            console.error("Error Response ",parameters);
        })

        var topicsearch = $('#topicsearch');
        topicsearch.on("keyup",function(){
            var q = $(this).val();
            //console.log(q);
            App.sendAjaxCall('user/inbox',{topicId:pageData.id,max:5,q:q},'GET',false).success(function(data){
                //console.log(data);
                setPost(holder2,data);
            }).error(function(parameters){
                console.error("Error Response ",parameters);
            });
        });
    };
    
    var handleInbox = function(){
        var holder2 = $("#topicposts");
        var promise2 = App.sendAjaxCall('user/inbox',{topicId:pageData.id,max:5},'GET',false);
        promise2.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder2,data);
        }).error(function(parameters){
            console.error("Error Response ",parameters);
        })

        var topicsearch = $('#topicsearch');
        topicsearch.on("keyup",function(){
            var q = $(this).val();
            //console.log(q);
            App.sendAjaxCall('user/inbox',{topicId:pageData.id,max:5,q:q},'GET',false).success(function(data){
                //console.log(data);
                setPost(holder2,data);
            }).error(function(parameters){
                console.error("Error Response ",parameters);
            });
        });
    }

    var handleSubscribedTopics = function(id){
        var holder = $('#subscribedtopics');
        holder.parents('.panel').find('.panel-heading').find('.paneltitle').html('Subscribed Topics');
        //console.log("Is this a panel bocy ",holder.parent());
        holder.parent().css({"max-height":"290px","overflow":"auto"})
        var promise = App.sendAjaxCall('user/subscribedtopics',{id:pageData.id},'GET',false);
        promise.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        holder.on('unsubscribed',function(e,data){
            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
        });

        holder.on('deleted',function(e,data){
            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
                $('.user-topic-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
        });

        holder.on('topicupdated',function(e,data,name){
            $(data).parents('.post').find('.topic-name').find('a').html(name);
        });
    }

    var handleTrendingTopics = function(){
        var holder = $('#trendingtopics');
        holder.parents('.panel').find('.panel-heading').find('.paneltitle').html('Trending Topics');
        holder.parent().css({
            "max-height": "290px",
            "overflow": "auto"
        });
        var promise = App.sendAjaxCall('topic/trendingtopics',{},'GET',false);
        promise.success(function(data){
            ////console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        holder.on('unsubscribed',function(e,data){
            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
        });

        holder.on('deleted',function(e,data){
            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
                $('.user-topic-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
        });

        holder.on('topicupdated',function(e,data,name){
            $(data).parents('.post').find('.topic-name').find('a').html(name);
        });
    }

    var handleStars = function(){
        var starholder = $(".stars");
        var iss = starholder.find('i');
        var selectedindex = parseInt(starholder.attr('rating'));

        starholder.on('mouseover','i',function(){
            var index = $(this).index();
            ////console.log("mouseover on ",index);
            iss.each(function(){
                if($(this).index()<=index){
                    $(this).removeClass('fa-star-o').addClass('fa-star');
                }else{
                    $(this).removeClass('fa-star').addClass('fa-star-o');
                }
            });
        });

        starholder.on('mouseout',function(){
            iss.each(function(){
                if($(this).index()<=selectedindex){
                    $(this).removeClass('fa-star-o').addClass('fa-star');
                }else{
                    $(this).removeClass('fa-star').addClass('fa-star-o');
                }
            });
        });

        starholder.on('click','i',function(){
            var _this = this;
            selectedindex = $(this).index();
            App.sendAjaxCall('resource/saveratings',{id:pageData.id,rating:selectedindex+1},'POST',true).success(function(data){
                //console.log("Response is ",data);
                if(data.result) {
                    /*selectedindex = data.averageScore-1;
                    //console.log("average Score returned from server "+data.averageScore);
                    starholder.next('span').find("#bytotaluser").html(data.totalVotes+" User");*/
                    starholder.trigger("mouseout");
                    toastr.success('Your Rating Saved Successfully!', '')
                    setTimeout(function(){
                        window.location.reload();
                    },700)
                }else{
                    $(_this).trigger("failed", [_this,data.message]);
                }
            });
        });

        starholder.trigger("mouseout");
    }

    var handleClickableLinks = function(){
        var _this = this;
        $('body').on('click','.handleLinks',function(e){
            e.preventDefault();
            var _this = this;
            method = $(this).attr('invoke');
            href = $(this).attr('href');
            if(method && method.length>0){
                var callback = function(ff){
                    //console.log("Callback Triggered");
                    /*$(_this).parents(ff).fadeOut('slow',function(){
                        $(this).remove();
                    });*/
                };
                eval("Service."+method);
            }else{
                var timer = setTimeout(function(){
                    if(href!=undefined)
                        window.location.href = href;
                },100);
            }
        });
    }

    var handleChange = function(){
        var _this = this;
        $('body').on('change','.handleChange',function(e){
            e.preventDefault();
            var _this = this;
            method = $(this).attr('invoke');
            href = $(this).attr('href');
            if(method && method.length>0){
                var callback = function(ff){
                    //console.log("Callback Triggered");
                    /*$(_this).parents(ff).fadeOut('slow',function(){
                     $(this).remove();
                     });*/
                };
                eval("Service."+method);
            }else{
                var timer = setTimeout(function(){
                    if(href!=undefined)
                        window.location.href = href;
                },100);
            }
        });
    }

    var handleShareDocument = function(){
        var doccreateHolder = $('#doccreate');

        doccreateHolder.find('#browsebtn').click(function(){
            $(this).next('input').trigger('click');
        });

        var docselectbox = doccreateHolder.find('#inputlink');
        doccreateHolder.find('#filebox').change(function(){
            //console.log("File Selected");
            var label = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
            var filesize = $(this).get(0).files[0].size;
            var filetype = $(this).get(0).files[0].type;
            docselectbox.val(label+" [size: "+preciseRound(filesize/1024,2)+"KB] [type: "+filetype+"]");
        });
        
        App.sendAjaxCall('user/subscribedtopics',{},'GET',false).success(function(data){
            //console.log("Topics Found");
            if(data){
                doccreateHolder.find('select').html(getSelectBoxOptions(data,["id","name"],""));
            }
        });
        doccreateHolder.find("form").validate({
            messages: {
                docfile: "Select Document",
                description: "Enter Description"
            },
            submitHandler:function(form){
                $(form).ajaxSubmit(function(data){
                    if(data=="success"){
                        doccreateHolder.modal('hide');
                        toastr.success("Document Resource Created Successfully")
                        setTimeout(function(){
                            window.location.reload();
                        },700)
                    }else{
                        toastr.error("Failed to Create Document Resource");
                    }
                });
            }

        });
    }

    var handleShareLink = function(){
        var linkcreateHolder = $('#linkcreate');
        App.sendAjaxCall('user/subscribedtopics',{},'GET',false).success(function(data){
            //console.log("Topics Found");
            if(data){
                linkcreateHolder.find('select').html(getSelectBoxOptions(data,["id","name"],""));
            }
        });
        linkcreateHolder.find('form').validate({
            messages: {
                link: "Enter Resource Link",
                description: "Enter Description"
            },
            submitHandler:function(form){
                $(form).ajaxSubmit(function(data){
                    if(data=="success"){
                        linkcreateHolder.modal('hide');
                        toastr.success("Link Resource Created Successfully")
                        setTimeout(function(){
                            window.location.reload();
                        },600)
                    }else{
                        toastr.error("Failed to Create Link Resource");
                    }
                });
            }
        });
    }

    var handleCreateTopic = function(){
        //console.log("Handling Create Topic");
        var createTopicHandler = $('#topiccreate');
        var editTopicHlr = $('#topicedit');
        App.sendAjaxCall('topic/visibilities',{},'GET',false).success(function(data){
            //console.log("Visibilities Found");
            var visibilityhlr = createTopicHandler.find('#visibilityhlr');
            var visibilityhlr2 = editTopicHlr.find('#visibilityhlr');
            if(data){
                visibilityhlr.html(getSelectBoxOptions(data,""));
                visibilityhlr2.html(visibilityhlr.html());
            }
        });

        createTopicHandler.find('form').validate({
            submitHandler: function(form) {
                $(form).ajaxSubmit(function(data) {
                    if(data.hasError){
                        toastr.error("Failed To create Topic");
                    }else{
                        toastr.success("Topic Created Successfully");
                        setTimeout(function(){
                            window.location.reload();
                        },600)
                    }
                },function(){
                    toastr.error("Failed To create Topic");
                });
            }
        });
    }

    var handleShowTopic = function(){

        var holder = $('#topicusers');
        var promise = App.sendAjaxCall('topic/users',{id:pageData.id},'GET',false);
        promise.success(function(data){
            ////console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        var holder2 = $("#topicposts");
        var promise2 = App.sendAjaxCall('resource/search',{topicId:pageData.id,max:5},'GET',false);
        promise2.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder2,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        var topicsearch = $('#topicresourcesearch');
        topicsearch.on("keyup",function(){
            var q = $(this).val();
            //console.log(q);
            App.sendAjaxCall('resource/search',{topicId:pageData.id,max:5,q:q},'GET',false).success(function(data){
                //console.log(data);
                setPost(holder2,data);
            }).error(function(){
                var e = parameters.e;
                console.error("Error Response ",parameters);
            });
        });

        $('body').on('subscribed',function(e,data,message){
            //console.log("Listening for subscribed event ")
            setTimeout(function(){
                location.reload();
            },500);
        });

        $('body').on('unsubscribed',function(e,data,message){
            setTimeout(function(){
                location.reload();
            },500);
        });

    };

    var handleLoginForm = function(){
        var loginbox = $('#loginbox');
        var loginforgetbox = $('#loginforgetbox');

        loginforgetbox.hide();

        loginbox.find('#forgetpasswordlink').click(function(e){
            e.preventDefault();
            loginbox.slideUp('slow');
            loginforgetbox.slideDown("slow");
        });

        loginforgetbox.find('.backbutton').click(function(e){
            e.preventDefault();
            loginbox.slideDown('slow');
            loginforgetbox.slideUp("slow");
        });
        
        
        var loginform = $("#loginform");
        //console.log("Login form is "+loginform.length);
        loginform.validate({
            errorElement: "div",
            submitHandler: function(form) {
                $('#submit').attr('disabled','disabled');
                //console.log("Submitting the form");
                form.submit();
            }
        });
    };

    var handleRegisterForm = function(){
        var registerform = $("#registerform");
        var btn = $('#uploadavatar');
        uploaderCropImage(btn,{},registerform);

        registerform.validate({
            rules: {
                userName: {
                    required: true,
                    remote: {
                        url: "login/availability",
                        type: "post"
                    }
                },
                email:{
                    required: true,
                    remote: {
                        url: "login/emailavailability",
                        type: "post"
                    }
                }
            },
            messages: {
                userName: {
                    required: "Please Enter Username!",
                    remote: "Username already in use!"
                },
                email: {
                    required: "Please Enter Email!",
                    remote: "Email already in use!"
                }
            },
            submitHandler: function(form) {
                $('#submit').attr('disabled','disabled');
                //console.log("Submitting the form");
                form.submit();
            }
        });
    }

    var handleRecentShares = function(){
        var holder = $('#sharedposts');

        holder.parent().css({
            "max-height": "290px",
            "overflow": "auto"
        });

        var promise = App.sendAjaxCall('resource/recentpost',{},'GET',false);
        promise.success(function(data){
            ////console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })
    };

    var handleTopPosts = function(){
        var holder = $('#topposts');

        holder.parent().css({
            "max-height": "290px",
            "overflow": "auto"
        });

        var promise = App.sendAjaxCall('resource/toppost',{},'GET',false);
        promise.success(function(data){
            ////console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })
    };

    var preciseRound = function(num,decimals){
        return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
    };

    var setPost = function(holder,data){
        var post = holder.data("postattached");
        if(!post){
            post = holder.find('.post').removeClass('hide').detach();
            holder.data("postattached",post);
        }
        var posts = [];
        $.each(data,function(index,o){
            posts.push(dataBind(post,o));
        });
        holder.html(posts);
        ////console.log("Going to process Directives");
        processDirectives(holder,data);

    };

    var processDirectives = function(holder,data){
        var ifs = holder.find('[if],[if-method],[if-attr],[if-method-attr]');
        ////console.log("found ",ifs.length);
        ifs.each(function(){
            var f = $(this).attr('if');
            var fMethod = $(this).attr('if-method');
            var fattr = $(this).attr('if-attr');
            var fMethodattr = $(this).attr('if-method-attr');
            if(f) {
                ////console.log("Going to evaluate ",f);
                var v;
                try{
                    v = eval(f);
                }catch(e){}

                ////console.log("Value after evaluation ", f, v);
                if (!v) {
                    $(this).remove();
                }
            }

            if(fMethod){
                ////console.log("fmethod ",fMethod);
                var ops = fMethod.split(",");
                var res = Service[ops[0]](data,ops);
                ////console.log("Returned from the method = ",ops[0],res);
                if(!res){
                    try{
                        $(this).remove();
                    }catch(e){
                       //console.log(e);
                    }
                }
            }

            if(fattr){
                //console.log("going to evaluate ",fattr);
                var v;
                try{
                    fattr = "v="+fattr;
                    eval(fattr);
                }catch(e){}
                //console.log("Value after evaluation ", fattr, v);
                if (v && v.length>0) {
                    $(this).attr(v,"true");
                }
            }

            if(fMethodattr){
                var str = fMethodattr.split("\?");
                var ops = str[0].split(",");
                var res = Service[ops[0]](data,ops);
                //console.log("returned from ",ops[0],res)
                if(res){
                    try{
                        var attr = str[1].split(":");
                        $(this).attr(attr[0],"true");
                    }catch(e){}
                }
            }
        });
    }

    jQuery.fn.outerHTML = function() {
        return jQuery('<div />').append(this.eq(0).clone()).html();
    };

    var getMatches = function(string, regex, index) {
        index || (index = 1); // default to the first capturing group
        var matches = [];
        var match;
        while (match = regex.exec(string)) {
            matches.push(match[index]);
        }
        return matches;
    };

    var getPropertyValue = function(obj,k,index){
        if(k.length-1 >index){
            if(obj && obj.hasOwnProperty(k[index])){
                return getPropertyValue(obj[k[index]],k,index+1);
            }
        }else{
            if(obj && obj.hasOwnProperty(k[index])){
                return obj[k[index]];
            }
        }
        return "";
    };

    var dataBind = function(el,data){
        var matches;
        var e = el.outerHTML();
        if(el.data("processed")){
            matches = el.data("processed");
        }else{
            matches = getMatches(e,bindingRegex,1);
            el.data("processed",matches);
        }
        $.each(matches,function(index,obj){
            var key = getMatches(obj,bindingKeyRegex,1)[0];
            var pv = getPropertyValue(data,key.split("\."),0);
            e = e.replace(obj,pv);
        });
        return e;
    };

    var getSelectBoxOptions = function(data,keys,selected){
        var select = "";
        var s = selected?selected:-1;
        if(data){
            $.each(data,function(index,obj){
                var id,value;
                if(keys && keys.length>=2){
                    id = obj[keys[0]];
                    value = obj[keys[1]];
                }else{
                    id = obj;
                    value = obj;
                }
                if(value == s || id == s){
                    select+="<option value='"+id+"' selected>"+value+"</option>";
                }else{
                    select+="<option value='"+id+"' >"+value+"</option>";
                }
            });
        }
        return select;
    };

    var uploaderCropImage = function(editlink,attr,form){
        var attributes = attr?attr:{};
        var editpopup = undefined;
        var mask = jQuery('#mask');
        var fileselectzone,jcropperview,fileinput;
        var cwidth = attributes.cwidth?parseInt(attributes.cwidth):200;
        var cheight = attributes.cheight?parseInt(attributes.cheight):200;

        editlink.click(function(){
            var filedata = {};
            filedata = {cwidth:cwidth,cheight:cheight,id:1,service:0,imagefor:1,form:form};
            //////////console.log(filedata);
            var bb = $('body').data('imagecropperdata');
            if(bb==undefined){
                $('body').imagecropperpopup(filedata);
                $('body').on('image-cropped',function(e,data){
                    ////console.log("Image Cropped ",data);
                    $(form).find('.selectedimage').html("Selected Image : "+data.imagetitle);
                });
                $('body').data('imagecropperdata','Attached');
            }else{
                $('body').imagecropperpopup('resetCropperPopup',filedata);
            }
        });

        function closepopup(){
            editpopup.find('.filedropzone').trigger('destroy-cropper');
            editpopup.off();
            editpopup.fadeOut(function(){
                mask.fadeOut();
            });
            return false;
        }

        function switchTab(){
            var jcropperview = editpopup.find('.jcropper-view');
            var fileselectzone = editpopup.find('.filedropzone');
            if(jcropperview && fileselectzone){
                //////////console.log("reseting tabs");
                jcropperview.fadeIn();
                fileselectzone.fadeOut();
            }
        }

        function showpopup(){
            var jcropperview = editpopup.find('.jcropper-view');
            var fileselectzone = editpopup.find('.filedropzone');
            if(jcropperview && fileselectzone){
                //////////console.log("reseting tabs");
                jcropperview.fadeOut();
                fileselectzone.fadeIn();
            }
            //////////console.log("Tabs Reset! No fading in box");
            mask.fadeIn('slow',function(){
                editpopup.fadeIn();
            });
            return false;
        }
    };

    return {
        init: function () {
            handleResponsive(); // set and handle responsive
            handleCommonEvents();
            handleClickableLinks();
            handleChange();

            if(App.isLoggedIn()){
                handleCreateTopic();
                handleShareLink();
                handleShareDocument();
            }

            if (App.isPage("index")) {

            }

            if(App.isPage("showtopic")){
                handleShowTopic();
            }

            if(App.isPage("dashboard")){
                handleSubscribedTopics();
                handleTrendingTopics();
                handleInbox();
            }

            if(App.isPage("showresource")){
                handleStars();
                handleTrendingTopics();
            }

            if(App.isPage("profile")){
                handleMyTopics();
                handleMyProfile();
            }

            if(App.isPage("publicprofile")){
                handleSubscribedTopics(App.getDate().id);
                handleMyTopics(App.getDate().id);
                handleMyPost();
            }
        },

        // login page setup
        initLogin: function () {
            App.setPage("login");
            handleClickableLinks();
            handleLoginForm(); // handles login form
            handleRegisterForm(); //handles register form
            handleTopPosts(); // load and handles topposts
            handleRecentShares()//load and handles shared Resosurces
        },

        setPage: function (name) {
            currentPage = name;
        },

        setLoggecIn : function(val){
            isLoggedIn = val;
        },

        setData: function (data){
            pageData = data;
        },

        getDate: function(){
            return pageData;
        },

        getCurrentPage: function() {
            return currentPage;
        },

        isPage: function (name) {
            return currentPage == name ? true : false;
        },

        isLoggedIn : function(){
            return isLoggedIn;
        },

        sendAjaxCall:function(url,data,type,noserialize){

            if(noserialize==undefined || noserialize){
                data = $.param(data);
            }

            var promise = $.ajax({
                url:url,
                data:data,
                type: type,
                dataType:'json',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            return promise;
        },
    }
}();

var page;

$(document).ready(function(){
    //console.log("In console log");
    page = $('body').find('#page');
    var name = page.attr("name");
    var id = page.attr("data-id");
    var loggedin = page.attr("loggedin");
    switch(name){
        case "login":
            App.initLogin();
            break;
        default:
            App.setPage(name);
            if(loggedin && loggedin.length>0){
                App.setLoggecIn(true);
            }
            App.setData({id:id});
            App.init();
    }
    //console.log("Current Page is "+App.getCurrentPage());
});