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

    var handleResponsive = function(){

    }

    var handleCommonEvents = function(){
        $('body').on('failed',function(e,data){
            toastr.error(data,'')
        });
    }

    var handleSubscribedTopics = function(){
        var holder = $('#trendingtopics');
        holder.parents('.panel').find('.panel-heading').find('.paneltitle').html('Subscribed Topics');
        console.log("Is this a panel bocy ",holder.parent());
        holder.parent().css({"max-height":"400px","overflow":"auto"})
        var promise = App.sendAjaxCall('user/subscribedtopics',{id:pageData.id},'GET',false);
        promise.success(function(data){
            console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        holder.on('unsubscribed',function(e,data){
            var topic = $(data).parents('.post').find('.topic-name').text();

            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
            toastr.success('Your Are Successfully Unsubscribed from '+topic, '')
        });

        holder.on('deleted',function(e,data){
            var topic = $(data).parents('.post').find('.topic-name').text();

            $(data).parents(".post").fadeOut('slow',function(){
                $(this).remove();
                $('.user-subscription-count').each(function(){
                    var c = $(this).text();
                    c = parseInt(c);
                    $(this).html(c-1);
                });
            });
            toastr.success('Topic '+topic+' deleted successfully!', '')
        });

        holder.on('invited',function(e,data){
            toastr.success('Invite Sent Successfully', '');
        });

        holder.on('topicupdated',function(e,data){
            toastr.success('Topic Updated Successfully', '');
        })

        /*holder.on('subscribed',function(e,data){
            console.log("On Subscribed ",data);
            var topic = $(data).parents('.post').find('.topic-name').text();
            toastr.success('Your Are Successfully Subscribed to '+topic, '')
        });*/
    }

    var handleTrendingTopics = function(){
        var holder = $('#trendingtopics');
        holder.parents('.panel').find('.panel-heading').find('.paneltitle').html('Trending Topics');
        holder.parent().css({
            "max-height": "540px",
            "overflow": "auto"
        });
        var promise = App.sendAjaxCall('topic/trendingtopics',{},'GET',false);
        promise.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })
    }

    var handleStars = function(){
        var starholder = $(".stars");
        var iss = starholder.find('i');
        var selectedindex = parseInt(starholder.attr('rating'));

        starholder.on('mouseover','i',function(){
            var index = $(this).index();
            //console.log("mouseover on ",index);
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
            selectedindex = $(this).index();
            App.sendAjaxCall('resource/saveratings',{id:pageData.id,rating:selectedindex},'POST',true).success(function(data){
                console.log("Response is ",data);
                selectedindex = data.averageScore;
                starholder.trigger("mouseout");
                toastr.success('Your Rating Saved Successfully!', '')
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
                    console.log("Callback Triggered");
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
        App.sendAjaxCall('user/subscribedtopics',{},'GET',false).success(function(data){
            console.log("Topics Found");
            if(data){
                doccreateHolder.find('select').html(getSelectBoxOptions(data,["id","name"],""));
            }
        });
        doccreateHolder.find("form").validate({
            messages: {
                docfile: "Select Document",
                description: "Enter Description"
            },
        });
    }

    var handleShareLink = function(){
        var linkcreateHolder = $('#linkcreate');
        App.sendAjaxCall('user/subscribedtopics',{},'GET',false).success(function(data){
            console.log("Topics Found");
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
                        alert("Link shared Successfully");
                    }else{
                        alert("Failed to share link");
                    }
                });
            }
        });
    }

    var handleCreateTopic = function(){
        console.log("Handling Create Topic");
        var createTopicHandler = $('#topiccreate');
        var editTopicHlr = $('#topicedit');
        App.sendAjaxCall('topic/visibilities',{},'GET',false).success(function(data){
            console.log("Visibilities Found");
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
                        alert("Failed to Save Topic");
                    }else{
                        alert("Topic Saved Successfuly")
                    }
                });
            }
        });
    }

    var handleShowTopic = function(){

        var holder = $('#topicusers');
        var promise = App.sendAjaxCall('topic/users',{id:pageData.id},'GET',false);
        promise.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        var holder2 = $("#topicposts");
        var promise2 = App.sendAjaxCall('resource/search',{topicId:pageData.id,max:5},'GET',false);
        promise2.success(function(data){
            console.log("data returned is ",data);
            setPost(holder2,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })

        var topicsearch = $('#topicresourcesearch');
        topicsearch.on("keyup",function(){
            var q = $(this).val();
            console.log(q);
            App.sendAjaxCall('resource/search',{topicId:pageData.id,max:5,q:q},'GET',false).success(function(data){
                console.log(data);
                setPost(holder2,data);
            }).error(function(){
                var e = parameters.e;
                console.error("Error Response ",parameters);
            });
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
        console.log("Login form is "+loginform.length);
        loginform.validate({
            errorElement: "div",
            submitHandler: function(form) {
                $('#submit').attr('disabled','disabled');
                console.log("Submitting the form");
                form.submit();
            }
        });
    };

    var handleRegisterForm = function(){
        var registerform = $("#registerform");
        var btn = $('#uploadavatar');
        uploaderCropImage(btn,{},registerform);

        registerform.validate({
            submitHandler: function(form) {
                $('#submit').attr('disabled','disabled');
                console.log("Submitting the form");
                form.submit();
            }
        });
    }

    var handleRecentShares = function(){
        var holder = $('#sharedposts');

        var promise = App.sendAjaxCall('resource/recentpost',{},'GET',false);
        promise.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })
    };

    var handleTopPosts = function(){
        var holder = $('#topposts');

        var promise = App.sendAjaxCall('resource/toppost',{},'GET',false);
        promise.success(function(data){
            //console.log("data returned is ",data);
            setPost(holder,data);
        }).error(function(parameters){
            var e = parameters.e;
            console.error("Error Response ",e);
        })
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
        //console.log("Going to process Directives");
        processDirectives(holder,data);

    };

    var processDirectives = function(holder,data){
        var ifs = holder.find('[if],[if-method],[if-attr],[if-method-attr]');
        //console.log("found ",ifs.length);
        ifs.each(function(){
            var f = $(this).attr('if');
            var fMethod = $(this).attr('if-method');
            var fattr = $(this).attr('if-attr');
            var fMethodattr = $(this).attr('if-method-attr');
            if(f) {
                var v = eval(f);
                //console.log("Value after evaluation ", f, v);
                if (!v) {
                    $(this).remove();
                }
            }

            if(fMethod){
                //console.log("fmethod ",fMethod);
                var ops = fMethod.split(",");
                if(Service[ops[0]](data,ops)){
                    try{
                        $(this).remove();
                    }catch(e){
                       console.log(e);
                    }
                }
            }

            if(fattr){
                //console.log("going to evaluate ",fattr);
                var v = eval(fattr);
                //console.log("Value after evaluation ", fattr, v);
                if (v && v.length>0) {
                    $(this).attr(v,"true");
                }
            }

            if(fMethodattr){
                var ops = fMethod.split("\\?");
                if(Service[ops[0]](data,ops)){
                    try{
                        var attr = ops[0].split(":");
                        $(this).attr(attr[0],"true");
                    }catch(e){
                        console.log(e);
                    }
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
            ////////console.log(filedata);
            var bb = $('body').data('imagecropperdata');
            if(bb==undefined){
                $('body').imagecropperpopup(filedata);
                $('body').on('image-cropped',function(e,data){
                    //console.log("Image Cropped ",data);
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
                ////////console.log("reseting tabs");
                jcropperview.fadeIn();
                fileselectzone.fadeOut();
            }
        }

        function showpopup(){
            var jcropperview = editpopup.find('.jcropper-view');
            var fileselectzone = editpopup.find('.filedropzone');
            if(jcropperview && fileselectzone){
                ////////console.log("reseting tabs");
                jcropperview.fadeOut();
                fileselectzone.fadeIn();
            }
            ////////console.log("Tabs Reset! No fading in box");
            mask.fadeIn('slow',function(){
                editpopup.fadeIn();
            });
            return false;
        }
    };

    var PopupCenterDual = function(url, title, w, h) {
        // Fixes dual-screen position Most browsers Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    }

    return {
        init: function () {
            handleResponsive(); // set and handle responsive
            handleCommonEvents();
            handleClickableLinks();

            handleCreateTopic();
            handleShareLink();
            handleShareDocument();
            handleSubscribedTopics();

            if (App.isPage("index")) {

            }

            if(App.isPage("showtopic")){
                handleShowTopic();
            }

            if(App.isPage("dashboard")){

            }

            if(App.isPage("showresource")){
                handleStars();
                handleTrendingTopics();
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

        setData: function (data){
            pageData = data;
        },

        getCurrentPage: function() {
            return currentPage;
        },

        isPage: function (name) {
            return currentPage == name ? true : false;
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
    console.log("In console log");
    page = $('body').find('#page');
    var name = page.attr("name");
    var id = page.attr("data-id");
    switch(name){
        case "login":
            App.initLogin();
            break;
        default:
            App.setPage(name);
            App.setData({id:id});
            App.init();
    }
    console.log("Current Page is "+App.getCurrentPage());
});