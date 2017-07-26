# switchmenu
Code by Jacob Runge - 2017

JQuery and Velocity plugins that allow for the creation of dynamically switching screens, creating a single-page app effect. Additionally, the plugin monitors screen switches and alters browser history states, allowing the user to use the forward and back buttons to move from screen to screen without page refreshes.

## Versions
* jwrunge/switchmenu_jquery.js - The original version, built on top of [JQuery](https://www.jquery.com) and using JQuery's .animate() function. It is dependent on the inclusion of JQuery before that of switchmenu. Velocity.js is not required.
* jwrunge/switchmenu_velocity.js - A modified version built with [Velocity.js](http://www.velocityjs.org), which may have performance beneifits if you are already using the Velocity.js engine.
