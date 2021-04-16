var fakewaffle = ( function ( $, fakewaffle ) {
	'use strict';

	fakewaffle.responsiveTabs = function ( collapseDisplayed ) {

		fakewaffle.currentPosition = 'tabs';

		var tabGroups = $( '.nav-tabs.responsive' );
		var hidden    = '';
		var visible   = '';
		var activeTab = '';

		if ( collapseDisplayed === undefined ) {
			collapseDisplayed = [ 'xs', 'sm' ];
		}

		$.each( collapseDisplayed, function () {
			hidden  += ' hidden-' + this;
			visible += ' visible-' + this;
		} );

		$.each( tabGroups, function ( index ) {
			var collapseDiv;
			var $tabGroup = $( this );
			var tabs      = $tabGroup.find( 'li a' );

			if ( $tabGroup.attr( 'id' ) === undefined ) {
				$tabGroup.attr( 'id', 'tabs-' + index );
			}

			collapseDiv = $( '<div></div>', {
				'class' : 'panel-group responsive' + visible,
				'id'    : 'collapse-' + $tabGroup.attr( 'id' )
			} );

			$.each( tabs, function () {
				var $this          = $( this );
				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
				var newLinkClass   = 'accordion-toggle';
				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
				var newParentClass = 'panel panel-default';
				var newHash        = $this.get( 0 ).hash.replace( '#', 'collapse-' );

				if ( oldLinkClass.length > 0 ) {
					newLinkClass += ' ' + oldLinkClass;
				}

				if ( oldParentClass.length > 0 ) {
					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
					newParentClass += ' ' + oldParentClass;
					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
				}

				if ( $this.parent().hasClass( 'active' ) ) {
					activeTab = '#' + newHash;
				}

				collapseDiv.append(
					$( '<div>' ).attr( 'class', newParentClass ).html(
						$( '<div>' ).attr( 'class', 'panel-heading' ).html(
							$( '<h4>' ).attr( 'class', 'panel-title' ).html(
								$( '<a>', {
									'class'       : newLinkClass,
									'data-toggle' : 'collapse',
									'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
									'href'        : '#' + newHash,
									'html'        : $this.html()
								} )
							)
						)
					).append(
						$( '<div>', {
							'id'    : newHash,
							'class' : 'panel-collapse collapse'
						} )
					)
				);
			} );

			$tabGroup.next().after( collapseDiv );
			$tabGroup.addClass( hidden );
			$( '.tab-content.responsive' ).addClass( hidden );

			if ( activeTab ) {
				$( activeTab ).collapse( 'show' );
			}
		} );

		fakewaffle.checkResize();
		fakewaffle.bindTabToCollapse();
	};

	fakewaffle.checkResize = function () {

		if ( $( '.panel-group.responsive' ).is( ':visible' ) === true && fakewaffle.currentPosition === 'tabs' ) {
			fakewaffle.tabToPanel();
			fakewaffle.currentPosition = 'panel';
		} else if ( $( '.panel-group.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
			fakewaffle.panelToTab();
			fakewaffle.currentPosition = 'tabs';
		}

	};

	fakewaffle.tabToPanel = function () {

		var tabGroups = $( '.nav-tabs.responsive' );

		$.each( tabGroups, function ( index, tabGroup ) {

			// Find the tab
			var tabContents = $( tabGroup ).next( '.tab-content' ).find( '.tab-pane' );

			$.each( tabContents, function ( index, tabContent ) {
				// Find the id to move the element to
				var destinationId = $( tabContent ).attr( 'id' ).replace ( /^/, '#collapse-' );

				// Convert tab to panel and move to destination
				$( tabContent )
					.removeClass( 'tab-pane' )
					.addClass( 'panel-body fw-previous-tab-pane' )
					.appendTo( $( destinationId ) );

			} );

		} );

	};

	fakewaffle.panelToTab = function () {

		var panelGroups = $( '.panel-group.responsive' );

		$.each( panelGroups, function ( index, panelGroup ) {

			var destinationId = $( panelGroup ).attr( 'id' ).replace( 'collapse-', '#' );
			var destination   = $( destinationId ).next( '.tab-content' )[ 0 ];

			// Find the panel contents
			var panelContents = $( panelGroup ).find( '.panel-body.fw-previous-tab-pane' );

			// Convert to tab and move to destination
			panelContents
				.removeClass( 'panel-body fw-previous-tab-pane' )
				.addClass( 'tab-pane' )
				.appendTo( $( destination ) );

		} );

	};

	fakewaffle.bindTabToCollapse = function () {

		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
		var collapse = $( '.panel-group.responsive' ).find( '.panel-collapse' );

		// Toggle the panels when the associated tab is toggled
		tabs.on( 'shown.bs.tab', function ( e ) {

			if (fakewaffle.currentPosition === 'tabs') {
				var $current  = $( e.currentTarget.hash.replace( /#/, '#collapse-' ) );
				$current.collapse( 'show' );

				if ( e.relatedTarget ) {
					var $previous = $( e.relatedTarget.hash.replace( /#/, '#collapse-' ) );
					$previous.collapse( 'hide' );
				}
			}

		} );

		// Toggle the tab when the associated panel is toggled
		collapse.on( 'shown.bs.collapse', function ( e ) {

			if (fakewaffle.currentPosition === 'panel') {
				// Activate current tabs
				var current = $( e.target ).context.id.replace( /collapse-/g, '#' );
				$( 'a[href="' + current + '"]' ).tab( 'show' );

				// Update the content with active
				var panelGroup = $( e.currentTarget ).closest( '.panel-group.responsive' );
				$( panelGroup ).find( '.panel-body' ).removeClass( 'active' );
				$( e.currentTarget ).find( '.panel-body' ).addClass( 'active' );
			}

		} );
	};

	$( window ).resize( function () {
		fakewaffle.checkResize();
	} );

	return fakewaffle;
}( window.jQuery, fakewaffle || { } ) );

var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('clock')[0];

for (var i = 1; i < 60; i++) {
  clockEl.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
  var weekday = new Array(7),
      d = new Date(),
      h = d.getHours(),
      m = d.getMinutes(),
      s = d.getSeconds(),
      date = d.getDate(),
      month = d.getMonth() + 1,
      year = d.getFullYear(),
           
      hDeg = h * 30 + m * (360/720),
      mDeg = m * 6 + s * (360/3600),
      sDeg = s * 6,
      
      hEl = document.querySelector('.hour-hand'),
      mEl = document.querySelector('.minute-hand'),
      sEl = document.querySelector('.second-hand'),
      dateEl = document.querySelector('.date'),
      dayEl = document.querySelector('.day');

      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
  
      var day = weekday[d.getDay()];
  
  if(month < 9) {
    month = "0" + month;
  }
  
  hEl.style.transform = "rotate("+hDeg+"deg)";
  mEl.style.transform = "rotate("+mDeg+"deg)";
  sEl.style.transform = "rotate("+sDeg+"deg)";
  dateEl.innerHTML = date+"/"+month+"/"+year;
  dayEl.innerHTML = day;
}

setInterval("clock()", 100);


/**
 * Defines the bootstrap tabs handler.
 *
 * @param {string} element
 *  Element.
 */
function valWindowSize() {
	"use strict";
  var width = $(window).width();
		if (width < 768) {
	  $('ul[data-id="menu"]').removeClass();
	  $('ul[data-id="menu"]').addClass('nav navbar-nav');
	} else {
	  $('ul[data-id="menu"]').removeClass();
	  $('ul[data-id="menu"]').addClass('nav nav-tabs');
	  $('ul[data-id="menu"]').get(0).firstElementChild.classList.add('active');
	  $('ul[data-id="menu"]').get(0).firstElementChild.children[0].click();
	  $('#service-menu').removeClass('collapse');
	  
	}
}


$(document).on('ready',function(){
  "use strict";
    valWindowSize();
// this is what the magic of tabs to accordion does
	fakewaffle.responsiveTabs(['xs', 'sm']);
 
// this is what validates the size to see what style the tabs are given
	$(window).on('resize', function () {
		valWindowSize();
	});
});

function reset()
{
    $('.nav-tabs').each(function() {

      if($(this)[0].children[$(this)[0].children.length-1].classList[1] == "pull-right")
      {
          var drop_down_tab = $(this)[0].children[$(this)[0].children.length-1].children[1];
          var initial_value =  drop_down_tab.children.length;

         for(var i = 0; i < initial_value; i++)
         {
             $(this).append(drop_down_tab.children[0]);
         }

         $(this)[0].children[$(this)[0].children.length-(1+initial_value)].remove();
      }

    });
}

function ddTab(total_dropdown, tabName)
{
      var n_li = document.createElement("li");
            n_li.setAttribute("class","dropdown pull-right");
            n_li.style.position = "relative";
            n_li.style.right = "13px";

      var n_a = document.createElement("a");
            n_a.setAttribute("class","dropdown-toggle");
            n_a.setAttribute("data-toggle","dropdown");
            n_a.setAttribute("href","#");

      var n_sp = document.createElement("span");
            n_sp.setAttribute("class","caret");

      var n_ul = document.createElement("ul");
            n_ul.setAttribute("class","dropdown-menu");

      var n_tx = document.createTextNode(tabName + " (" + total_dropdown + ")");

      n_a.appendChild(n_tx);
      n_a.appendChild(n_sp);

      n_li.appendChild(n_a);
      n_li.appendChild(n_ul);

      return [n_li, n_ul, n_tx];
}

function isActive(dropdown_tabs, child)
{
    for (var i = 0; i < dropdown_tabs[1].children.length; i++)
    {
        if(dropdown_tabs[1].children[i].classList[0] == "active")
        {
           child.setAttribute("class","dropdown pull-right active");
        }

    }
}

var $currentPopover = null;
  $(document).on('shown.bs.popover', function (ev) {
    var $target = $(ev.target);
    if ($currentPopover && ($currentPopover.get(0) != $target.get(0))) {
      $currentPopover.popover('toggle');
    }
    $currentPopover = $target;
  }).on('hidden.bs.popover', function (ev) {
    var $target = $(ev.target);
    if ($currentPopover && ($currentPopover.get(0) == $target.get(0))) {
      $currentPopover = null;
    }
  });


//quicktmpl is a simple template language I threw together a while ago; it is not remotely secure to xss and probably has plenty of bugs that I haven't considered, but it basically works
//the design is a function I read in a blog post by John Resig (http://ejohn.org/blog/javascript-micro-templating/) and it is intended to be loosely translateable to a more comprehensive template language like mustache easily
$.extend({
    quicktmpl: function (template) {return new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+template.replace(/[\r\t\n]/g," ").split("{{").join("\t").replace(/((^|\}\})[^\t]*)'/g,"$1\r").replace(/\t:(.*?)\}\}/g,"',$1,'").split("\t").join("');").split("}}").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")}
});

$.extend(Date.prototype, {
  //provides a string that is _year_month_day, intended to be widely usable as a css class
  toDateCssClass:  function () { 
    return '_' + this.getFullYear() + '_' + (this.getMonth() + 1) + '_' + this.getDate(); 
  },
  //this generates a number useful for comparing two dates; 
  toDateInt: function () { 
    return ((this.getFullYear()*12) + this.getMonth())*32 + this.getDate(); 
  },
  toTimeString: function() {
    var hours = this.getHours(),
        minutes = this.getMinutes(),
        hour = (hours > 12) ? (hours - 12) : hours,
        ampm = (hours >= 12) ? ' pm' : ' am';
    if (hours === 0 && minutes===0) { return ''; }
    if (minutes > 0) {
      return hour + ':' + minutes + ampm;
    }
    return hour + ampm;
  }
});

  $(document).ready(function() {
	fakewaffle.responsiveTabs(['xs', 'sm']);
    valWindowSize();
  });
  
  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }
  //from date and To Date in Leave Application
  $( function() {
    $( "#field-from-date" ).datepicker();
  } );
  
  $( function() {
    $( "#field-to-date" ).datepicker();
  } );
  
    $( function() {
    $( "#field-due-date" ).datepicker();
  } );
  
  //grids
  $(document).ready(function() {
    $('#request-view').dataTable();
  } );
  
  // Minimal Javascript (for Edge, IE and select box)
document.addEventListener("change", function(event) {
  let element = event.target;
  if (element && element.matches(".form-element-field")) {
    element.classList[element.value ? "add" : "remove"]("-hasvalue");
  }
});
  
  /* Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });
  */