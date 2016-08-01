var Service = function(){
    return{
        isSubscribed : function(data,params){
            //console.log("In subscribed ",params);
            var flag = false;
            $.each(data,function(index,obj){
                if(obj.id == parseInt(params[0]) && obj.user.id == parseInt(params[1])){
                    console.log("Subscription exsist");
                    flag = true;
                }
            })
            return flag;
        },
        isNotSubscribed : function(data,params){
            //console.log("In subscribed ",params);
            var flag = true;
            $.each(data,function(index,obj){
                if(obj.id == parseInt(params[0]) && obj.user.id == parseInt(params[1])){
                    console.log("Subscription exsist");
                    flag = false;
                }
            })
            return flag;
        },
        seriousness : function(data,params){
            //console.log("In subscribed ",params);
            var flag = false;
            $.each(data,function(index,obj){
                if(obj.id == parseInt(params[0]) && obj.user.id == parseInt(params[1])){
                    console.log("Subscription exsist");
                    flag = true;
                }
            })
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
                toastr.success('Your Are Successfully Subscribed!', '')
                $(_this).trigger("subscribed",[_this]);
            }).error(function(e){
                console.log(e);
            });
        },
        unsubscribeTopic : function(id,_this){
            App.sendAjaxCall('topic/unsubscribe',{id:id},'GET',false).success(function(data){
                $(_this).trigger("unsubscribed",[_this]);
            }).error(function(e){
                console.log(e);
            });
        },
        deleteTopic : function(id,_this){
            var c = confirm("Are You sure want to delete this topic ");
            if(c) {
                App.sendAjaxCall('topic/delete', {id: id}, 'GET', false).success(function (data) {
                    console.log("Topic deleted response ",data);
                    if(data.result) {
                        $(_this).trigger("deleted", [_this]);
                    }else{
                        $(_this).trigger("failed", ["Error Deleting Topic"]);
                    }
                }).error(function (e) {
                    console.log(e);
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
                            $(_this).trigger("invited", [_this]);
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
            var holder = $('#topicedit');
            holder.modal();
            holder.find('input').val(topic);
            holder.find('select').val(visibility.trim());
            var inp = document.createElement("input");
            inp.setAttribute("type","hidden");
            inp.setAttribute("name","id");
            inp.setAttribute("value",id);
            holder.find('form').append(inp).validate({
                submitHandler:function(form){
                    $(form).ajaxSubmit(function(data){
                        if(data.result){
                            $(_this).trigger("topicupdated", [_this]);
                            holder.modal("hide");
                        }else{
                            $(_this).trigger("failed", ["Failed to Update Topic!"]);
                        }
                    });
                }
            });
        }
    }
}();