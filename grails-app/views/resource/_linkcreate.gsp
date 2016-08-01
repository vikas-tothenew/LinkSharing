<div class="modal fade" tabindex="-1" role="dialog" id="linkcreate">
    <div class="modal-dialog">
        <div class="modal-content">
            <form class="form-horizontal" id="formcreatetopic" action="resource/savelink" method="POST">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Share Link</h4>
            </div>
            <div class="modal-body">

                    <div class="form-group">
                        <label for="inputlink" class="col-sm-2 control-label required">Link</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputlink" placeholder="Enter Link" name="link" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputdescription" class="col-sm-2 control-label required">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputdescription" required name="description" ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label required">Topic</label>
                        <div class="col-sm-10">
                            <select class="form-control" required name="topicId">

                            </select>
                        </div>
                    </div>

            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" target-form="formcreatetopic">Share</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->