/*
	TO USE:
	Pass JQuery menu reference and array of options and screen elements to create_switch_menu()
*/

/*
	GENERIC SWITCH FUNCTION (does not alter history)
*/
function switchin(switch_in, switch_out) //callback = null, track_order = null)
{			
	$(switch_out).animate({left: '-10em', opacity: '0'}, 300, 'swing', function() {
		$('html, body').scrollTop(0);
		$(switch_in).scrollTop(0);
		$(switch_in).css('left', '10em').css('opacity', '0').show().animate({left: '0', opacity: '1.0'}, 300, 'swing');
		$(this).hide();
	});
}

/*
	SWITCH MENU OBJECT
*/
var SwitchMenu = function(menu_selector = null, screens = null)
{	
	//Switching animation
	this.switchin = function(switch_in, switch_out) //callback = null, track_order = null)
	{	
		$(switch_out).animate({left: '-10em', opacity: '0'}, 300, 'swing', function() {
			$('html, body').scrollTop(0);
			$(switch_in).scrollTop(0);
			$(switch_in).css('left', '10em').css('opacity', '0').show().animate({left: '0', opacity: '1.0'}, 300, 'swing');
			$(this).hide();
		});
	}
	
	//Reset menu -- must pass the menu's selector
	this.reset = function()
	{
		//Handle page switchout
		var screen_class = '.' + $(this.menu_selector).prop('id') + '_screen';
		
		this.switchin('#' + $(screen_class).first().prop('id'), screen_class);
		
		//Handle link reselection
		$(this.menu_selector).children('a').removeClass('selected');
		$(this.menu_selector).children("a[href='" + '#' + $(screen_class).first().prop('id') + "']").addClass('selected');
	}
	
	//Bind event listeners to each anchor; iterate over screens to ensure specific screen is affected (not only the last in the array)
	this.init = function()
	{	
		//Ensure the menu and screens are properly set up; display error if not
		this.menu_selector = menu_selector;
		var menu = $(this.menu_selector);			//Reference to the menu
		menu.addClass('switch_menu');			//Make sure the menu knows it's a menu
		var options = $(menu_selector + ' a'); 	//Reference to the anchors in the menu
		var screen_class = menu.prop('id') + '_screen'; //Class for all menu subscreens
		
		//Set initial values
		menu.children('a').first().addClass('selected');
		menu.prop('data-curScreen', screens[0]);
	
		var screenMenuObject = this;	//Set reference; 'this' changes context in $.each()

		$.each(screens, function(index, current_screen)
		{
			if(current_screen != 'skip' && current_screen != null) //Two options to skip assigning action to an anchor: 'skip' or null; the following is for non-skip anchors
			{
				$(current_screen).addClass(screen_class).css('position', 'relative');	//Add common class

				
				if(index > 0) //Make screens after first screen visible
					$(current_screen).css('display', 'none');
			
				$(options[index]).on('click', function(e)
				{
					e.preventDefault();		//prevents default link behavior
					e.stopPropagation();	//prevents parent anchors from enacting default link behavior

					if($(current_screen).css('display') == 'none')
					{
						//Update current screen
						menu.prop('data-curScreen', current_screen);
					
						//Alter history
						var pages = [];
						$('.switch_menu').each(function()
						{
							pages.push($(this).prop('data-curScreen'));
						});

						history.pushState(pages, null, menu.prop('data-curScreen'));
					
						//Switch in new screen
						screenMenuObject.switchin(current_screen, '.' + screen_class);
					}
					
					menu.children('a').removeClass('selected');
					$(this).addClass('selected');
				});
			}
		});
	}
	
	this.init(); //Initialize
}

/*
	HANDLE STATE CHANGES
*/
window.addEventListener('popstate', function(e) {
	//If there is state information, cycle back through history
	if(e.state)
	{
		if(e.state)
			set_state(e.state);
	}
});

function set_state(state)
{
	$('.switch_menu').each(function(index, value)
	{
		if($(state[index]).css('display') == 'none')
		{
			if(state[index] !== null)
			{
				switchin(state[index], '.' + $(this).prop('id') + '_screen');
				
				//Handle link reselection
				$(this).children('a').removeClass('selected');
				$(this).children("a[href='" + state[index] + "']").addClass('selected');
			}
		}
	});
}