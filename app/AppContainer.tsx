import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { Frame, Page } from "react-nativescript/dist/client/ElementRegistry";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Frame, $Page } from "react-nativescript";
import { Color } from "tns-core-modules/color";
import { ChatTab } from "./tabs/Chat";

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

export class AppContainer extends React.Component<{ forwardedRef: React.RefObject<Frame> }, {}> {
	private readonly pageRef: React.RefObject<Page> = React.createRef<Page>();

	componentDidMount(){		
		const frame: Frame = this.props.forwardedRef.current!;
		const page: Page = this.pageRef.current!;
		console.log(`[componentDidMount] AppContainer mounted! frame: ${frame}; page: ${page}`);
		
		if(!frame || !page){
			console.error(`[componentDidMount] AppContainer missing ref - frame: ${frame}; page: ${page}.`);
			return;
		}

		frame.navigate({
			create: () => {
				return page;
			}
		});
	}

	render(){
		const { forwardedRef } = this.props;
		console.log(`[render()] AppContainer rootRef.current: ${forwardedRef.current}`);

		return (
			<$Frame ref={forwardedRef}>
				<$Page ref={this.pageRef}>
					{/* <$ActionBar title={"ACTION BAR MAIN TITLE"}/> */}
					<$TabView selectedIndex={0}>
						<ChatTab title="PikaTalk" colour={new Color("yellow")}/>
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
				</$Page>
			</$Frame>
		);
	}
}