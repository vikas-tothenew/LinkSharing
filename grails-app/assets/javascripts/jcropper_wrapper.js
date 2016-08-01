
(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node / CommonJS
    factory(require("jquery"));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {
	
	"use strict";
	
	var TRUE = true,
    FALSE = false,
    NULL = null,
    NAN = NaN,
    INFINITY = Infinity,
    STRING_UNDEFINED = "undefined",
    STRING_DIRECTIVE = "directive",
    isNumber = function (n) {
        return typeof n === "number";
    },
    
    toArray = function (obj, offset) {
        var args = [];

        if (isNumber(offset)) { // It's necessary for IE8
          args.push(offset);
        }

        return args.slice.apply(obj, args);
    },
	
	// Constructor
    CropperWrapper = function (element, options) {
      this.element = element;
      this.$element = $(element);
      this.defaults = $.extend({}, CropperWrapper.DEFAULTS, $.isPlainObject(options) ? options : {});
      this.$original = NULL;
      this.mainpreviewhlr = {};
  	  this.preview = {};
  	  this.croppreviewhlr = {};
  	  this.croppreview = {};
  	  this.cropSubmit = {};
  	  this.$input = $(this.defaults.input);
  	  this.imagename;
  	  this.options;
  	  this.crop = undefined;
      this.init();
    };
	
    CropperWrapper.prototype = {
    	    constructor: CropperWrapper,
    	    init: function () {
    	        var defaults = this.defaults;
    	        this.load();
    	    },
    	    load: function(){
    	    	this.mainpreviewhlr = this.$element.find(this.defaults.preview);
    			this.preview =  $(this.defaults.preview+" > img");
    			this.croppreview = this.$element.find(this.defaults.cpreview);
    			this.croppreviewhlr = this.croppreview.parent();
    			this.cropSubmit = this.$element.find(this.defaults.csubmit);
    			this.addListeners();
    	    },
    	    addListeners: function () {
    	        var defaults = this.defaults;
    	        var _this = this;
    	        
    	        _this.$input.on('change',function(){
    	        	_this.imagename = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
    	        	//console.log("Image name is "+_this.imagename);
    	        	_this.resetOptions();
    	        	_this.setPreview();
    	        	_this.fileSelectHandler();
    			});
    	        
    	        _this.$element.on('click','#crop_zoomIn',function(){
    	        	_this.crop.cropper("zoom", 0.1);
    	        });
    	        
    	        _this.$element.on('click','#crop_zoomOut',function(){
    	        	_this.crop.cropper("zoom", -0.1);
    	        });
    	        
    	        _this.$element.on('click','#crop_rotateLeft',function(){
    	        	_this.crop.cropper("rotate", -90);
    	        });
    	        
    	        _this.$element.on('click','#crop_rotateRight',function(){
    	        	_this.crop.cropper("rotate", 90);
    	        });
    	        
    	        _this.$element.on('click','#crop_reset',function(){
    	        	_this.crop.cropper("reset");
    	        });
    	        
    	        _this.$element.on('click','#crop_clear',function(){
    	        	_this.crop.cropper("clear");
    	        });
    	        
    	        _this.$element.on('click','#crop_destroy',function(){
    	        	_this.crop.cropper("destroy");
    	        });
        		   
    	        _this.$element.on("click",_this.defaults.csubmit,function(e){
        	        e.preventDefault();
        	        _this.$element.trigger('jcropper-saving');
                	var datad = _this.crop.cropper('getData');
                	//console.log(datad);
        	        var ufile = {data:encodeURIComponent(_this.preview[0].src),'imagetitle':_this.imagename,'imgInitW':_this.w,'imgInitH':_this.h,'cropW':datad.width,'cropH':datad.height,'imgX1':datad.x,'imgY1':datad.y,'imgW':_this.defaults.cwidth,'imgH':_this.defaults.cheight};
        	        //console.log(ufile);
					var hiddenfields = [];
					for (var property in ufile) {
						if (ufile.hasOwnProperty(property)) {
							var input = document.createElement("input");
							input.setAttribute("type","hidden");
							input.setAttribute("name",property);
							input.setAttribute("value",ufile[property])
							hiddenfields.push(input);
						}
					}
					var cropperDiv = $(_this.defaults.form).find('#cropperdata');
					if(cropperDiv.length<=0){
						cropperDiv = document.createElement("div");
						cropperDiv.setAttribute("id","cropperdata");
						$(_this.defaults.form).append(cropperDiv);
					}
					$(cropperDiv).html(hiddenfields);

					_this.$element.trigger('image-cropped',[ufile]);
					_this.$element.trigger('jcropper-saved');
					_this.$element.trigger('jcropper-close');
        	    }); 
    	    },
    	    removeListeners: function () {
    	        var defaults = this.defaults;
    	        var _this = this;
    	        _this.$input.off();
    	        _this.$element.off();
    	    },
    	    destroyCropper:function(){
    	    	//console.log(".........destroying cropper.......");
    	    	var _this = this;
    	    	if(_this.crop!=undefined){
    	    		$(_this.crop).cropper('destroy');
    	    		_this.crop==undefined
    	    	}
    	    	setTimeout(function(){
    	    		try{
    	    			$(_this.crop).cropper('destroy');
    	    		}catch(e){
    	    			//console.log(e);
    	    		}
    	    	},1000);
    	    },
    	    sendAjaxCall:function(url,ufile,type){
            	var promise = $.ajax({
              		url:url,
              		data:JSON.stringify(ufile),
              		type: type,
              		dataType:'json',
              		headers : { 'Content-Type': 'application/json;' }
              	});
            	return promise;
            },
            resetOptions:function(){
            	var _this =  this;
    			this.options = {
    			        aspectRatio: _this.defaults.cwidth/_this.defaults.cheight,
    			        data: {
    			            /*x: 480,
    			            y: 60,*/
    			            width: _this.defaults.cwidth,
    			            height: _this.defaults.cheight
    			        },
    			        preview: _this.defaults.cpreview
    			 } 
    			//console.log(_this.defaults.cwidth,_this.defaults.cheight," AR : ",_this.defaults.cwidth/_this.defaults.cheight);
    		},
    		setPreview:function(){
    			var _that = this;
				var ww = _that.croppreviewhlr.parent().outerWidth();
				var rr = _that.defaults.cwidth/_that.defaults.cheight;
				var hh = ww/rr;
				_that.croppreviewhlr.css({
					'width':ww+'px',
					'height':hh+'px',
					'overflow':'hidden'
				});
    		},
    		imageNotFound:function(){
    	    	//console.log("Image not found......");
    	    },
    	    resetCroper:function(options){
    	    	var _this = this;
    	    	$.extend(_this.defaults, options);
    	    	_this.resetOptions();
    	    },
            fileSelectHandler:function() {
    			var _this = this;
    		    // get selected file
    		    var oFile = _this.$input[0].files[0];
    		    //console.log("Reading file from input");

    		    // check for image type (jpg and png are allowed)
    		    var rFilter = /^(image\/jpeg|image\/png)$/i;
    		    if (! rFilter.test(oFile.type)) {
    		        //setErrorMessage('Please select a valid image file (jpg and png are allowed)');
    		        return;
    		    }

    		    // preview element
    		    var oImage = _this.preview[0];

    		    // prepare HTML5 FileReader
    		    var oReader = new FileReader();
    		    oReader.onload = function(e) {
    		        //console.log("Image is loaded");
    		        oImage.src = e.target.result;
    		        oImage.onerror=_this.imageNotFound;
    		        oImage.onload = function () { // onload event handler
    		        	_this.h = oImage.height; _this.w = oImage.width;
    		        	//setInfoMessage("Select Area To Crop Image");
    		        	
    		            // display some basic image info
    		            //var sResultFileSize = bytesToSize(oFile.size);
    		            
    		            setTimeout(function(){
    		            	_this.crop = _this.preview;
    		            	//console.log(_this.options);
    		            	$(_this.crop).cropper(_this.options);
    			            _this.$element.trigger('jcropper-set');
    			            _this.setPreview();
    		            },100);
    		         
    		        };
    		    };
    		    // read selected file as DataURL
    		    oReader.readAsDataURL(oFile);
    		}
    };
    
    CropperWrapper.DEFAULTS = {
    	    // Basic
    	    cwidth: 320,
    	    cheight: 320,
    	    preview: ".cropping-image-wrap",
    	    cpreview: ".cropping-preview",
    	    csubmit: ".cropimagesubmit",
    	    
    	    id:0,
        	service:0,
        	imagefor:0,
        	input:{},
    };

    CropperWrapper.setDefaults = function (options) {
	  $.extend(CropperWrapper.DEFAULTS, options);
  	};

  	// Save the other wrappers
  	CropperWrapper.other = $.fn.cropperwrapper;

    // Register as jQuery plugin
    $.fn.cropperwrapper = function (options) {
    	//console.log("CropperWrapper is Called");
      var args = toArray(arguments, 1),
          result;

      this.each(function () {
        var $this = $(this),
            data = $this.data("cropperwrapper"),
            fn;
        
        if (!data) {
          $this.data("cropperwrapper", (data = new CropperWrapper(this, options)));
        }

        if (typeof options === "string" && $.isFunction((fn = data[options]))) {
          result = fn.apply(data, args);
        }
      });

      return (typeof result !== STRING_UNDEFINED ? result : this);
    };

    $.fn.cropperwrapper.Constructor = CropperWrapper;
    $.fn.cropperwrapper.setDefaults = CropperWrapper.setDefaults;

    // No conflict
    $.fn.cropperwrapper.noConflict = function () {
      $.fn.cropperwrapper = CropperWrapper.other;
      return this;
    };
});