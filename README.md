# SwitchMenu
Code by Jacob Runge - 2017

JQuery and Velocity plugins that allow for the creation of dynamically switching screens, creating a single-page app effect. Additionally, the plugin monitors screen switches and alters browser history states, allowing the user to use the forward and back buttons to move from screen to screen without page refreshes.

## Versions
* jwrunge/switchmenu_jquery.js - The original version, built on top of [JQuery](https://www.jquery.com) and using JQuery's .animate() function. It is dependent on the inclusion of JQuery before that of SwitchMenu. Velocity.js is not required.
* jwrunge/switchmenu_velocity.js - A modified version built with [Velocity.js](http://www.velocityjs.org), which may have performance beneifits if you are already using the Velocity.js engine. This version allows for alteration of the switching in and out animations, including custom switch in and out animations defined with the Velocity UI pack's RegisterEffect() function. The UI Pack *is* required for this version to work.

## Basic Usage
Usage of the plugin is the same for all versions. For the following examples, the Velocity version is used.

Basic usage is simple:
* Set up your HTML file with references to JQuery, Velocity (if needed), and screenswitch.
* Create `<div>`s for each content screen you wish to display, each with a unique id attribute. There is no need to set any displays to visible or alter any position attributes--the plugin will do this for you.
* Create a container with a unique ID to hold any links you wish to prompt screen changes. To ensure functionality if JavaScript is disabled or any libraries or plugins fail to load, I recommend setting the link's `href` attribute to the hashed id of screen the link is meant to reveal.
* Set up the SwitchMenu after the document has loaded using `var menu = new SwitchMenu(anchor_container, [array_of_screens])`. anchor_container should be a string in the form of a CSS selector (e.g. '#nav_menu'); array_of_screens must be an array of CSS selectors in the order of their corresponding links (e.g. "['#content1', '#content2', '#content3']"). Links not meant to switch in a new screen can be set to either `null` or the string 'skip'.

[SwitchMenu Simple Example](https://jsfiddle.net/jwrunge/baxot1ub/)

[SwitchMenu Skipped Anchor Example](https://jsfiddle.net/jwrunge/7dpdwyq1/)

[Submenus / Nested Menus Example](https://jsfiddle.net/jwrunge/wvt74q5L/)

## Extra Features
While SwitchMenu is designed to do most all the work in the background, with minimal programmer intervention, there are a few functions you may need to take advantage of, depending on how your site functions.

### Options
Options can be passed in as a JavaScript object in an optional third parameter in both the SwitchMenu object and the generic switchin() function. The options you can specify are as follows:
* scrollTarget: Scrolls to the top of a specified target. This can be set to 'body', 'screen', or 'both' to scroll to the top of either the HTML document, the screen being switched in, or both, respectively. This occurs after the previous screen is switched out and before the next screen is switched in. Default is 'both.'
* scrollDuration: The duration of the aforementioned scroll. Default is 0.
* outAnimation (Velocity version only): The animation used to switch out the current screen. Can be passed a JavaScript object with the CSS properties to animate (following Velocity's syntax), a named Velocity UI animation, or named animation defined with $.Velocity.RegisterEffect(). Default is "transition.slideLeftBigOut.'
* inAnimation (Velocity version only): The animation used to transition in the next screen. Can be passed the same kinds of values as outAnimation. Default is "transition.slideRightBigIn."
* outSpeed: The duration of outAnimation. Default is 500.
* inSpeed: The duration of inAnimation. Default is 500.

### Styling and Manipulation
SwitchMenu establishes the following:
* All SwitchMenu menus will be assigned the CSS class `.switch_menu`
* The selected link anchor in all SwitchMenus will be assigned the class `.selected`
* All screens belonging to a particular SwitchMenu will be assigned the class `.MenuID_screen` (e.g. if the SwitchMenu's ID is `#MyMenu`, all screens belonging to `#MyMenu` will be of class `.MyMenu_screen`)

See the JSFiddles on this Readme (especially under the CSS section) for examples.

### Resetting a Menu
Most likely to be of value, `SwitchMenu.reset()` will restore a menu and its currently-displayed scree, to its initial value. If you are including submenus in your project (a SwitchMenu within a SwitchMenu), you may wish to call `.reset()` on a switched-out submenu when your top-level menu changes screens in order to prevent the submenu from switching back in later with the wrong screen (see example below). SwitchMenu does not automatically reset submenus when they are switched out because each SwitchMenu instance is unaware of other SwitchMenus. By comparison, see the submenu example above (which does NOT use `.reset()`.

[Submenus / Nested Menus with Reset Example](https://jsfiddle.net/jwrunge/gd47y1eb/)

### The currently_switching Flag
The SwitchMenu plugin defines a flag variable called `currently_switching`, which is set to true when a screen switch starts and back to false when the switch ends.

### Manual Switching
You can manually switch screens and screen classes in and out of view by calling `switchin(element_in, element_out)`. This can switch any element out for any other, despite how your SwitchMenu objects are set up. The only limitation of calling `switchin()` is that it will not alter browser history unless you explicitly call `set_state()`.

[Manual Switching Example](https://jsfiddle.net/jwrunge/8u3smmkk/)

### Setting the Screen State
While SwitchMenu objects automatically alter browser history via the `history` object, you can also push your own menu states to the browser using `set_state(state_array)`. `set_state()` is *not* a member function of a SwitchMenu object. To use it, pass it an array of CSS id selectors, one for each SwitchMenu on the page in the order they were declared. When you set the page's state, each SwitchMenu will switch in the id selector specified, and will record the state in browswer history.

[Setting the Screen State Example](https://jsfiddle.net/jwrunge/4661n2qf/)
