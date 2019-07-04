import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { $TabView, $TabViewItem, $StackLayout, $Label } from "react-nativescript";
import { run } from "tns-core-modules/application/application";
import { Color } from "tns-core-modules/color";

class CustomTabViewItem extends React.Component<
	{
		title: string,
		identifier: string,
		colour: Color,
	},
	{}
>
{
	private readonly selfRef: React.RefObject<any> = React.createRef<any>();

    render(){
        const { title, identifier, colour, children, ...rest } = this.props;

        return (
    		<$TabViewItem ref={this.selfRef} title={title} identifier={identifier}>
    			<$StackLayout height={{ value: 100, unit: "%"}} width={{ value: 100, unit: "%"}} backgroundColor={colour}>
    				{children}
    			</$StackLayout>
    		</$TabViewItem>
    	);
    }
}

export class AppContainer extends React.Component<{ forwardedRef: React.RefObject<any> }, {}> {
	render(){
		const { forwardedRef } = this.props;

		return (
			<$TabView ref={forwardedRef} selectedIndex={0}>
				<CustomTabViewItem title="One" identifier="Item 1" colour={new Color("yellow")}>
					<$Label>Uno</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Two" identifier="Item 2" colour={new Color("orange")}>
					<$Label>Dos</$Label>
				</CustomTabViewItem>
			</$TabView>
		);
	}
}