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
				<CustomTabViewItem title="PikaTalk" identifier="Item 1" colour={new Color("yellow")}>
					<$Label>TODO: PikaTalk</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Moments" identifier="Item 2" colour={new Color("orange")}>
					<$Label>TODO: Moments</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Search" identifier="Item 3" colour={new Color("red")}>
					<$Label>TODO: Search</$Label>
				</CustomTabViewItem>
				{/* Less interested in reproducing this one, but we'll see. */}
				<CustomTabViewItem title="Learn" identifier="Item 4" colour={new Color("violet")}>
					<$Label>TODO: Learn</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Profile" identifier="Item 5" colour={new Color("indigo")}>
					<$Label>TODO: Profile</$Label>
				</CustomTabViewItem>
			</$TabView>
		);
	}
}