<div class="modal fade" tabindex="-1" role="dialog" id="topiccreate">
    <div class="modal-dialog">
        <div class="modal-content">
            <form class="form-horizontal" id="formcreatetopic" action="topic/save" method="post">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Create Topic</h4>
            </div>
            <div class="modal-body">

                    <div class="form-group">
                        <label for="topicnamefield" class="col-sm-2 control-label required">Name</label>
                        <div class="col-sm-10">
                            <input type="text" required name="name" class="form-control" id="topicnamefield" placeholder="Topic Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label required" required>Visibility</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="visibilityhlr" name="visibility">

                            </select>
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" target-form="formcreatetopic">Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->