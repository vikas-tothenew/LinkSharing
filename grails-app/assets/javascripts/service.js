var Service = function(){
    var customParseInt = function(val){
        if(val){
            return parseInt(val);
        }
        return 0;
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
    };

    return{
        isSubscribed : function(data,params){
            //console.log("In subscribed ",params,data);
            var tid = params[1];
            var uid = params[2];
            var flag = false;
            for(var i=0;i<data.length;i++){
                var o = data[i];
                //console.log("Object at ",i," is ",o);
                if(o.id == tid){
                    $.each(o.subscriptions,function(index,obj){
                        //console.log("Subscription object ",obj);
                        //console.log("Comparing ",o.id,tid,obj.user.id,uid);
                        if(obj.user.id == uid){
                            //console.log("Subscription exsist");
                            flag = true;
                        }
                    });
                }
            }
            /*$.each(data,function(index,obj){
                console.log("Comparing ",customParseInt(obj.id,params[0]),obj.user.id,customParseInt(params[1]));
                if(obj.id == customParseInt(params[0]) && obj.user.id == customParseInt(params[1])){
                    console.log("Subscription exsist");
                    flag = true;
                }
            })*/
            return flag;
        },
        isNotSubscribed : function(data,params){
            //console.log("In subscribed ",params);
            var tid = params[1];
            var uid = params[2];
            var flag = true;
            for(var i=0;i<data.length;i++){
                var o = data[i];
                //console.log("Object at ",i," is ",o);
                if(o.id == tid){
                    $.each(o.subscriptions,function(index,obj){
                        //console.log("Subscription object ",obj);
                        //console.log("Comparing ",o.id,tid,obj.user.id,uid);
                        if(obj.user.id == uid){
                            //console.log("Subscription exsist");
                            flag = false;
                        }
                    });
                }
            }
            /*$.each(data,function(index,obj){
                if(obj.id == customParseInt(params[0]) && obj.user.id == customParseInt(params[1])){
                    console.log("Subscription exsist");
                    flag = false;
                }
            })*/
            return flag;
        },
        seriousness : function(data,params){
            //console.log("In check seriousness ",data,params);
            var flag = false;
            var uid = params[3];
            var tid = params[2];
            var seriouness = params[1];
            for(var i=0;i<data.length;i++){
                var o = data[i];
                //console.log("Object at ",i," is ",o);
                if(o.id == params[2]){
                    $.each(o.subscriptions,function(index,obj){
                        //console.log("seriouness object ",obj);
                        if(obj.user.id == uid && obj.topic.id==tid){
                            //console.log("Subscription exsist ",obj.seriousness);
                            if(obj.seriousness.name.trim() == seriouness.trim()){
                                flag = true;
                            }
                        }
                    });
                    break;
                }
            }
            return flag;
        },
        downloadResource : function(id){
            window.location.href = "resource/download?id="+id;
        },
        browseResource : function(id){
            App.sendAjaxCall('resource/browse',{id:id},'GET',false).success(function(data){
                //console.log(data);
                PopupCenterDual(data.link,'Browsing Link','650','450');
            }).error(function(e){
                console.log(e);
            });
        },
        subscribeTopic : function(id,_this){
            var seriousness = $(_this).parents('.post').find('select.selectseriousness').val();
            App.sendAjaxCall('topic/subscribe',{id:id,seriousness:seriousness},'GET',false).success(function(data){
                if(data.result) {
                    $(_this).trigger("subscribed",[_this,data.message]);
                    //console.log("Subscription successfully triggered");
                }else{
                    $(_this).trigger("failed", [_this,data.message]);
                }
            }).error(function(e){
                console.log(e);
            });
        },
        unsubscribeTopic : function(id,_this){
            App.sendAjaxCall('topic/unsubscribe',{id:id},'GET',false).success(function(data){
                if(data.result) {
                    $(_this).trigger("unsubscribed",[_this,data.message]);
                }else{
                    $(_this).trigger("failed", [_this,data.message]);
                }
            }).error(function(e){
                $(_this).trigger("failed", [_this,"Internal Error"]);
            });
        },
        deleteTopic : function(id,_this){
            var c = confirm("Are You sure want to delete this topic ");
            if(c) {
                App.sendAjaxCall('topic/delete', {id: id}, 'GET', false).success(function (data) {
                    //console.log("Topic deleted response ",data);
                    if(data.result) {
                        $(_this).trigger("deleted", [_this,data.message]);
                    }else{
                        $(_this).trigger("failed", ["Error Deleting Topic"]);
                    }
                }).error(function (e) {
                    $(_this).trigger("failed", [_this,data.message]);
                });
            }
        },
        inviteTopic : function(id,_this){
            var topic = $(_this).parents('.post').find('.topic-name').text();
            var holder = $('#topicinvite2');
            holder.find('select').html('<option value="'+id+'">'+topic+'</option>');
            holder.find('#inviteemail').val('');
            holder.modal();
            holder.find('form').validate({
                submitHandler:function(form){
                    $(form).ajaxSubmit(function(data){
                        if(data.result){
                            $(_this).trigger("invited", [_this,data.message]);
                            holder.modal("hide");
                        }else{
                            $(_this).trigger("failed", ["Failed to send Invite!"]);
                        }
                    });
                }
            });
        },
        editTopic : function (id,_this) {
            var h = $(_this).parents('.post');
            var topic = h.find('.topic-name').text();
            var visibility = h.find('.visibility').val();
            console.log("visibility is "+visibility);
            var holder = $('#topicedit');
            holder.modal();
            var input = holder.find('input');
            input.val(topic);
            holder.find('select').val(visibility.trim());
            var inp = document.createElement("input");
            inp.setAttribute("type","hidden");
            inp.setAttribute("name","id");
            inp.setAttribute("value",id);
            holder.find('form').append(inp).validate({
                submitHandler:function(form){
                    $(form).ajaxSubmit(function(data){
                        if(data.result){
                            $(_this).trigger("topicupdated", [_this,data.message]);
                            holder.modal("hide");
                            holder.find('form').off();
                        }else{
                            $(_this).trigger("failed", [_this,data.message]);
                        }
                    });
                }
            });
        },
        updateSubscription : function(tid,uid,_this){
            console.log(tid,uid,_this);
            var seriousness = $(_this).val();
            App.sendAjaxCall('topic/subscribe',{id:tid,seriousness:seriousness},'GET',false).success(function(data){
                if(data.result) {
                    $(_this).trigger("subscriptionupdated",[_this,data.message]);
                    //console.log("Subscription successfully updated");
                }else{
                    $(_this).trigger("failed", [_this,data.message]);
                }
            }).error(function(e){
                console.log(e);
            });
        },
        updateTopic:function(){

        }
    }
}();