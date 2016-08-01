
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
		ImageCropperPopup = function (element,options) {
			this.element = '#defaulteditimage';
			this.$element = $(this.element);
			this.$mask = $('#mask');
			this.defaults = $.extend({}, ImageCropperPopup.DEFAULTS, $.isPlainObject(options) ? options : {});
			this.init();
		};

	ImageCropperPopup.prototype = {
		constructor: ImageCropperPopup,
		init: function () {
			if(this.$element.length<=0){
				this.create();
			}else{
				this.showpopup();
			}
			if(this.$mask.length<=0){
				var mask = this.createElement('div','mask','mask');
				mask = jQuery(mask);
				mask.css({
					'display':'none',
					'position':'fixed',
					'width':'100%',
					'height':'100%',
					'top':'0px',
					'background-color':'rgba(0,0,0,0.6)',
					'z-index': '9999'
				});
				this.$mask = $('body').prepend(mask).find('#mask');
			}
		},
		create:function(){
			var _this = this;
			var container = _this.createElement('div','container defaultboximage','defaulteditimage');
			$(container).html('<a href="" class="closedefaultboximage"  style="position: absolute;color: black;z-index: 9999999;right: 40px;-moz-animation: 2s;font-size: 18px;"  ><i class="fa fa-times"></i></a>');
			$(container).append("<div class='blocker'><div class='ball' style='margin-top:11%;' ></div><div class='ball1'></div><p style='display:none;' ></p></div>");
			var box = _this.createElement('div','col-md-12');
			$(box).html("<div class=\"ball\" style='margin-top:140px' ></div><div class=\"ball1\"></div>");
			/*$(box).load('templates/popups/changeimage.html', function( response, status, xhr ) {
				if ( status == "error" ) {
					var msg = "Sorry but there was an error: ";
					//console.log(msg);
				}else{
					_this.load();
				}
			});*/
			setTimeout(function(){
				$(box).html($('#uploaderdiv').html());
				$('#uploaderdiv').html('');
				_this.load();
			},200);

			$(box).css({
				'min-height':'300px',
				'width':'100%',
				'z-index':'99999',
				'box-shadow': '0px 4px 16px rgba(0, 0, 0, 0.2)',
				'-moz-user-select': 'none',
				'background': 'none repeat scroll 0% 0% #FFF',
				'border': '1px solid #ACACAC',
				'color': '#000',
				'padding-left':'0px',
				'padding-right':'0px',
				'border-top': '1px solid #E5E5E5',
				'outline': 'medium none'
			});
			jQuery(window).resize(function(){
				jQuery(container).css('left',($(this).width()/2-(jQuery(container).width()/2)-4)+'px');
			});
			container.appendChild(box);
			$('body').append(container);
			$(container).css({
				'position':'fixed',
				'min-width':'320px',
				'top':'1px',
				'display':'none',
				'z-index':'9999',
				'left':($(window).width()/2-($(container).width()/2)-4)+'px'
			});
			_this.$element =  $(container);
			_this.$mask.fadeIn('slow',function(){
				_this.$element.fadeIn();
			});
		},
		createElement:function(elem,class1,id){
			var el = document.createElement(elem);
			el.setAttribute("class", class1);
			if(id!==undefined && id!=""){
				el.setAttribute('id',id);
			}
			return el;
		},
		load: function(){
			var _this = this;
			_this.jcropperview = _this.$element.find('.jcropper-view');
			_this.fileselectzone = _this.$element.find('.filedropzone');
			_this.browsebutton = _this.$element.find('.newupload');
			_this.fileinput = _this.fileselectzone.find('input[type=file]');
			_this.defaults.input = _this.fileinput;
			_this.addListeners();
			_this.showpopup();
		},
		addListeners: function () {
			var _this = this;

			_this.browsebutton.click(function(e){
				e.stopPropagation();
				_this.fileinput.trigger('click');
			});

			_this.$element.find('a.closedefaultboximage').click(function(e){
				e.preventDefault();
				_this.closepopup();
			});

			_this.jcropperview.on('jcropper-close',function(){
				_this.closepopup();
			});

			_this.jcropperview.on('jcropper-set',function(){
				_this.switchTab();
			});

			_this.jcropperview.on('jcropper-saving',function(){
				_this.startBlocker();
			});

			_this.jcropperview.on('jcropper-saved',function(){
				_this.stopBlocker();
			});

			_this.jcropperview.cropperwrapper(_this.defaults);

		},
		removeListeners: function () {
			var defaults = this.defaults;
			var _this = this;
			_this.browsebutton.off();
			_this.$element.off();
			_this.jcropperview.cropperwrapper('destroy');
		},
		switchTab:function(){
			var _this = this;
			_this.jcropperview.fadeIn();
			_this.fileselectzone.fadeOut();
		},
		startBlocker:function(){
			var blocker = this.$element.find('.blocker');
			blocker.fadeIn();
			var p = blocker.find('p');
			p.html("Wait! Saving Cropped Image");
			p.css({
				'color':'red',
				'text-align':'center',
				'font-size':'24px',
				'font-weight':'bolder'
			});
			p.fadeIn();
		},
		stopBlocker:function(){
			var blocker = this.$element.find('.blocker');
			var p = blocker.find('p');
			p.html("Image Saved Successfully");
			p.css({
				'color':'green'
			});
			setTimeout(function(){
				p.fadeOut();
				blocker.fadeOut();
			},2000);
		},
		showpopup:function(){
			var _this = this;
			_this.jcropperview.fadeOut();
			_this.fileselectzone.fadeIn();
			_this.$mask.fadeIn('slow',function(){
				_this.$element.fadeIn();
			});
		},
		closepopup:function(){
			var _this = this;
			_this.jcropperview.cropperwrapper('destroyCropper');
			_this.$element.fadeOut(function(){
				_this.$mask.fadeOut();
			});
			return false;
		},
		resetCropperPopup:function(options){
			var _this = this;
			//console.log(options);
			//$.extend(_this.defaults, options);
			_this.jcropperview.cropperwrapper('resetCroper',options);
			_this.showpopup();
		}
	};

	ImageCropperPopup.DEFAULTS = {
		// Basic
		cwidth: 320,
		cheight: 320,
		preview: ".cropping-image-wrap",
		cpreview: ".cropping-preview",
		csubmit: ".cropimagesubmit",

		id:0,
		service:0,
		imagefor:0,
		input:{}
	};

	ImageCropperPopup.setDefaults = function (options) {
		$.extend(ImageCropperPopup.DEFAULTS, options);
	};

	// Save the other wrappers
	ImageCropperPopup.other = $.fn.imagecropperpopup;

	// Register as jQuery plugin
	$.fn.imagecropperpopup = function (options) {
		var args = toArray(arguments, 1),
			result;

		this.each(function () {
			var $this = $(this),
				data = $this.data("imagecropperpopup"),
				fn;

			if (!data) {
				$this.data("imagecropperpopup", (data = new ImageCropperPopup(this, options)));
			}

			if (typeof options === "string" && $.isFunction((fn = data[options]))) {
				result = fn.apply(data, args);
			}
		});

		return (typeof result !== STRING_UNDEFINED ? result : this);
	};

	$.fn.imagecropperpopup.Constructor = ImageCropperPopup;
	$.fn.imagecropperpopup.setDefaults = ImageCropperPopup.setDefaults;

	// No conflict
	$.fn.imagecropperpopup.noConflict = function () {
		$.fn.imagecropperpopup = ImageCropperPopup.other;
		return this;
	};
});