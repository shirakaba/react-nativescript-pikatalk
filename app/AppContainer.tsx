import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { Frame, Page } from "react-nativescript/dist/client/ElementRegistry";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Frame, $Page } from "react-nativescript";
import { Color } from "tns-core-modules/color";
import { ChatTab } from "./tabs/Chat";

/* Just a placeholder until I've made bona fide TabViewItems for these. */
class CustomTabViewItem extends React.Component<
	{
		title: string,
		colour: Color,
	},
	{}
>
{	
	private readonly selfRef: React.RefObject<any> = React.createRef<any>();

    render(){
        const { title, colour, children, ...rest } = this.props;

        return (
    		<$TabViewItem ref={this.selfRef} title={title}>
    			<$StackLayout height={{ value: 100, unit: "%"}} width={{ value: 100, unit: "%"}} backgroundColor={colour}>
    				{children}
    			</$StackLayout>
    		</$TabViewItem>
    	);
    }
}

export class AppContainer extends React.Component<{ forwardedRef: React.RefObject<any> }, { selectedIndex: number, }> {
	constructor(props){
		super(props);

		this.state = {
			selectedIndex: 0,
		};
	}

	render(){
		const { forwardedRef, } = this.props;
		const { selectedIndex, } = this.state;
		console.log(`[render()] AppContainer rootRef.current: ${forwardedRef.current}`);

		/* Structure recommended by: https://docs.nativescript.org/core-concepts/navigation#tabview-navigation */
		return (
			<$TabView
				ref={forwardedRef}
				selectedIndex={selectedIndex}
				onSelectedIndexChanged={(args) => { this.setState({ selectedIndex: args.newIndex }); }}
			>
				<ChatTab focused={selectedIndex === 0}/>
				<CustomTabViewItem title="Moments" colour={new Color("orange")}>
					<$Label>TODO: Moments</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Search" colour={new Color("red")}>
					<$Label>TODO: Search</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Learn" colour={new Color("violet")}>
					<$Label>TODO: Learn</$Label>
				</CustomTabViewItem>
				<CustomTabViewItem title="Profile" colour={new Color("indigo")}>
					<$Label>TODO: Profile</$Label>
				</CustomTabViewItem>
			</$TabView>
		);
	}
}