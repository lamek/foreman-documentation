/*! jquery Tocify - v1.2.0 - 2012-12-31
* Copyright (c) 2012 Greg Franko; Licensed MIT */
(function(e){"use strict";e(window.jQuery,window,document)})(function(e,t,n,r){"use strict";e.widget("toc.tocify",{version:"1.2.0",options:{context:"body",selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"twitterBootstrap",extendPage:!0,extendPageOffset:!0,history:!0},_create:function(){var e=this;e.items=[],e._generateToc(),e._addCSSClasses(),e._setEventHandlers(),t.addEventListener("load",function(){e._setActiveElement(),e.element.bind("extend.tocify",function(){e._setActiveElement()})},!1)},_generateToc:function(){var t=this,n,r;this.options.selectors.indexOf(",")!==-1?n=e(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(","))):n=e(this.options.context).find(this.options.selectors.replace(/ /g,"")),n.each(function(n){r=e("<ul/>",{id:"Header"+n,"class":"header"}).append(t._nestElements(e(this),n)),t.element.append(r),e(this).nextUntil(this.nodeName.toLowerCase()).each(function(){e(this).find(t.options.selectors).length===0?e(this).filter(t.options.selectors).each(function(){t._appendSubheaders.call(this,t,r)}):e(this).find(t.options.selectors).each(function(){t._appendSubheaders.call(this,t,r)})})})},_setActiveElement:function(){var e=this,n=t.location.hash.substring(1),r=e.element.find("li[data-unique='"+n+"']");return n.length?(e.element.find("."+e.focusClass).removeClass(e.focusClass),r.addClass(e.focusClass),e.options.showAndHide&&r.click()):e.element.find("."+e.focusClass).removeClass(e.focusClass),e},_nestElements:function(t,n){var r,i;return r=e.grep(this.items,function(e){return e===t.text()}),r.length?this.items.push(t.text()+n):this.items.push(t.text()),i=e("<li/>",{"class":"item","data-unique":(r.length?t.text()+n:t.text()).replace(/\s/g,"")}).append(e("<a/>").html(t.text() + "<i class='icon-chevron-right'/>")),t.before(e("<div/>",{name:t.text().replace(/\s/g,""),"data-unique":(r.length?t.text()+n:t.text()).replace(/\s/g,"")})),i},_appendSubheaders:function(t,n){var r=e(this).index(t.options.selectors),i=e(t.options.selectors).eq(r-1);+e(this).prop("tagName").charAt(1)<+i.prop("tagName").charAt(1)?t.element.find(".sub-header").last().after(t._nestElements(e(this),r)):+e(this).prop("tagName").charAt(1)===+i.prop("tagName").charAt(1)?n.find(".item").last().after(t._nestElements(e(this),r)):n.find(".item").last().after(e("<ul/>",{"class":"sub-header"})).next(".sub-header").append(t._nestElements(e(this),r))},_setEventHandlers:function(){var r=this,i,s;this.element.on("click.tocify","li",function(n){r.options.history&&(t.location.hash=e(this).attr("data-unique")),r.element.find("."+r.focusClass).removeClass(r.focusClass),e(this).addClass(r.focusClass);if(r.options.showAndHide){var i=e('li[data-unique="'+e(this).attr("data-unique")+'"]');r._triggerShow(i)}r._scrollTo(e(this))}),this.element.find("li").on({"mouseenter.tocify":function(){e(this).addClass(r.hoverClass),e(this).css("cursor","pointer")},"mouseleave.tocify":function(){r.options.theme!=="twitterBootstrap"&&e(this).removeClass(r.hoverClass)}}),e(t).on("scroll.tocify",function(){e("html, body").promise().done(function(){var i=e(t).scrollTop(),s=e(t).height(),o=e(n).height(),u=e("body")[0].scrollHeight,a,f;r.options.extendPage&&(e.browser.webkit&&i>=u-s-r.options.extendPageOffset||!e.browser.webkit&&s+i>o-r.options.extendPageOffset)&&(r.element.scrollTop(i),e(".tocify-extend-page").length||(f=e('div[data-unique="'+e(".item").last().attr("data-unique")+'"]').offset().top,e(r.options.context).append(e("<div />",{"class":"tocify-extend-page",height:Math.abs(f-i)+"px"})),r.element.trigger("extend.tocify"))),setTimeout(function(){e(r.options.context).find("div[data-unique]").next().each(function(){if(Math.abs(e(this).offset().top-i)<r.options.highlightOffset)return a=e('li[data-unique="'+e(this).prev("div[data-unique]").attr("data-unique")+'"]'),r.options.highlightOnScroll&&a.length&&(r.element.find("."+r.focusClass).removeClass(r.focusClass),a.addClass(r.focusClass)),r.options.showAndHideOnScroll&&r.options.showAndHide&&r._triggerShow(a,!0),!1})},0)})}),"onhashchange"in t&&(t.onhashchange=function(){r._setActiveElement()})},show:function(t,n){var r=this,i=t;if(!t.is(":visible")){!t.find(".sub-header").length&&!t.parent().is(".header")&&!t.parent().is(":visible")?t=t.parents(".sub-header").add(t):!t.children(".sub-header").length&&!t.parent().is(".header")&&(t=t.closest(".sub-header"));switch(r.options.showEffect){case"none":t.show();break;case"show":t.show(r.options.showEffectSpeed);break;case"slideDown":t.slideDown(r.options.showEffectSpeed);break;case"fadeIn":t.fadeIn(r.options.showEffectSpeed);break;default:t.show()}}return t.parent().is(".header")?r.hide(e(".sub-header").not(t)):r.hide(e(".sub-header").not(t.closest(".header").find(".sub-header").not(t.siblings()))),r},hide:function(e){var t=this;switch(t.options.hideEffect){case"none":e.hide();break;case"hide":e.hide(t.options.hideEffectSpeed);break;case"slideUp":e.slideUp(t.options.hideEffectSpeed);break;case"fadeOut":e.fadeOut(t.options.hideEffectSpeed);break;default:e.hide()}return t},_triggerShow:function(e,t){var n=this;return e.parent().is(".header")||e.next().is(".sub-header")?n.show(e.next(".sub-header"),t):e.parent().is(".sub-header")&&n.show(e.parent(),t),n},_addCSSClasses:function(){return this.options.theme==="jqueryUI"?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):this.options.theme==="twitterBootstrap"?(this.element.addClass("bs-docs-sidenav").find(".header, .sub-header").addClass("nav nav-list bs-docs-sidenav"),this.focusClass="active"):(this.focusClass="tocify-focus",this.hoverClass="tocify-hover"),this},setOption:function(){e.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){e.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(t,n){var r=this,i=r.options.smoothScroll||0;return e("html, body").promise().done(function(){e("html, body").animate({scrollTop:e('div[data-unique="'+t.attr("data-unique")+'"]').offset().top-r.options.scrollTo+"px"},{duration:i})}),r}})});