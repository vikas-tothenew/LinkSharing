<div class="modal fade" tabindex="-1" role="dialog" id="doccreate">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Share Document</h4>
            </div>
            <div class="modal-body">

                <form class="form-horizontal" id="formcreatetopic">
                    <div class="form-group">
                        <label for="inputlink" class="col-sm-2 control-label required">Document</label>
                        <div class="col-sm-8">
                            <!--<div class="row">
                                <div class="progress" style="height:2px;">
                                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"
                                         aria-valuemin="0" aria-valuemax="100" style="width:40%">
                                        40% Complete (success)
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                            </div>-->
                            <input class="form-control" type="text" id="inputlink" name="docfile"/>
                        </div>
                        <div class="col-sm-2" style="padding-left: 10px;">
                            <input type="button" class="btn btn-default" value="Browse" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputdescription" class="col-sm-2 control-label required">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="inputdescription" name="description"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label required">Topic</label>
                        <div class="col-sm-10">
                            <select class="form-control" >

                            </select>
                        </div>
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" target-form="formcreatetopic">Share</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->