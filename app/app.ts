/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

/* Controls react-nativescript log verbosity. true: all logs; false: only error logs. */
(global as any).__DEV__ = true;

import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { run } from "tns-core-modules/application/application";
import { Color } from "tns-core-modules/color";
import { AppContainer } from "./AppContainer";


const rootRef: React.RefObject<any> = React.createRef<any>();

// ReactNativeScript.render(
// 	React.createElement(AppContainer, { forwardedRef: rootRef }, null),
// 	null,
// 	() => {
// 		console.log(`AppContainer top-level render complete! run.create with rootRef.current: ${rootRef.current}`);
// 		run({
// 		    create: () => {
// 		        return rootRef.current;
// 		    },
// 		});
// 	},
// 	"__APP_ROOT__",
// );

run({
	create: () => {
		ReactNativeScript.render(
			React.createElement(AppContainer, { forwardedRef: rootRef }, null),
			null,
			() => {
				console.log(`AppContainer top-level render complete! run.create with rootRef.current: ${rootRef.current}`);
			},
			"__APP_ROOT__",
		);
		return rootRef.current;
	},
});


/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
