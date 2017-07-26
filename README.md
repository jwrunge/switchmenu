# switchmenu
Code by Jacob Runge - 2017

JQuery and Velocity plugins that allow for the creation of dynamically switching screens, creating a single-page app effect. Additionally, the plugin monitors screen switches and alters browser history states, allowing the user to use the forward and back buttons to move from screen to screen without page refreshes.

## Versions
* jwrunge/switchmenu_jquery.js - The original version, built on top of [JQuery](https://www.jquery.com) and using JQuery's .animate() function. It is dependent on the inclusion of JQuery before that of switchmenu. Velocity.js is not required.
* jwrunge/switchmenu_velocity.js - A modified version built with [Velocity.js](http://www.velocityjs.org), which may have performance beneifits if you are already using the Velocity.js engine.

## Basic Usage
Usage of the plugin is the same for all versions. For the following examples, the Velocity version is used.

Basic usage is simple:
* Set up your HTML file with references to JQuery, Velocity (if needed), and screenswitch.
* Create `<div>`s for each content screen you wish to display, each with a unique id attribute. There is no need to set any displays to visible or alter any position attributes--the plugin will do this for you.
* Create a container with a unique ID to hold any links you wish to prompt screen changes. To ensure functionality if JavaScript is disabled or any libraries or plugins fail to load, I recommend setting the link's `href` attribute to the hashed id of screen the link is meant to reveal.
* Set up the switchmenu after the document has loaded using `var menu = new SwitchMenu(anchor_container, [array_of_screens])`. anchor_container should be a string in the form of a css selector (e.g. '#nav_menu'); array_of_screens must be an array of css selectors in the order of their corresponding anchors (e.g. "['#content1', '#content2', '#content3']").
