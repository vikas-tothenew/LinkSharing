<div class="" style="padding-left:0px !important; padding-right:0px !important;" >
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 style="margin:0px;padding:0px;" ><span class="fa fa-picture-o"></span>Crop Image</h3>
        </div>
        <div class="panel-body">
            <div class="tab-content">
                <div class="tab-pane fade active in" id="uploadtab"  >
                    <div class="filedropzone clearfix">
                        <div class="newupload">
                            <h2>Click Here To Browse</h2>
                        </div>
                        <input type="file">
                    </div><!-- input="upload-demo" j-cropper -->
                    <div  style="display:none;" class="jcropper-view"  cwidth="1366" cheight="250" inheritinputfromparent="true"  error=".error" main-preview=".cropping-image-wrap" crop-preview=".cropping-preview"  crop-preview-pane="true" crop-submit=".cropimagesubmit">
                        <div class="row">
                            <div class="col-md-12">
                                <form action="http://aqvatarius.com/themes/atlant_v1_6/html/assets/cropping/process.php" method="post">
                                    <div class="panel panel-default">
                                        <div class="panel-body" style="max-height: 500px;overflow-y: auto;overflow: -moz-scrollbars-vertical;">
                                            <div class="row-fluid">
                                                <div class="col-md-7">
                                                    <div class="cropping-image-wrap" id="cropping-image-wrap">
                                                        <img src="" class="img-responsive"/><!-- corp/resource/girls-3.jpg -->
                                                    </div>
                                                </div>
                                                <div class="col-md-1 form-horizontal">
                                                    <div class="col-md-12">
                                                        <button id="crop_zoomIn" title="Zoom In" type="button">
                                                            <span class="fa fa-search-plus"></span>
                                                        </button>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <button id="crop_zoomOut" type="button" title="Zoom Out">
                                                            <span class="fa fa-search-minus"></span>
                                                        </button>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <button id="crop_rotateLeft" type="button" title="Rotate Left" >
                                                            <span class="fa fa-reply"></span>
                                                        </button>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <button id="crop_rotateRight" type="button" title="Rotate Right" >
                                                            <span class="fa fa-share"></span>
                                                        </button>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <button id="crop_reset" type="button" titl="Reset" >
                                                            <span class="fa fa-eraser"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="col-md-12">
                                                        <h4>Preview</h4>
                                                        <div class="cropping-preview-wrap">
                                                            <div class="cropping-preview"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-footer clearfix">
                                            <input type="hidden" value="girls-1.jpg" name="cropping-image"/>
                                            <button type="button" class="btn btn-success pull-right cropimagesubmit"><span class="fa fa-picture-o"></span>Save Image</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>

</script>