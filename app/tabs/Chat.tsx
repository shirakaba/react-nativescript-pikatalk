import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { Frame, Page, ActionBar } from "react-nativescript/dist/client/ElementRegistry";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Frame, $Page } from "react-nativescript";
import { Color } from "tns-core-modules/color";
import { isIOS } from "tns-core-modules/platform/platform";
import { EventData } from "tns-core-modules/ui/page/page";

export class ChatTab extends React.Component<{}, {}>
{
    private readonly frameRef: React.RefObject<any> = React.createRef<Frame>();
	private readonly pageRef: React.RefObject<Page> = React.createRef<Page>();

	componentDidMount(){		
		const frame: Frame = this.frameRef.current!;
		const page: Page = this.pageRef.current!;
		console.log(`[componentDidMount] AppContainer mounted! frame: ${frame}; page: ${page}`);
		
		if(!frame || !page){
			console.error(`[componentDidMount] AppContainer missing ref, so unable to navigate - frame: ${frame}; page: ${page}.`);
			return;
		}

		frame.navigate({
			create: () => {
				return page;
			}
		});
    }
    
    private readonly setActionBarNativeStyle = (ab: ActionBar) => {
        if(!isIOS){
            return;
        }

        const uiNavBar: UINavigationBar = ab.ios as UINavigationBar;
        uiNavBar.prefersLargeTitles = true;
    };

	render(){
		const {} = this.props;
		console.log(`[render] ChatTab render!`);

		return (
            <$TabViewItem title={"Chat"}>
                <$Frame ref={this.frameRef}>
                    <$Page ref={this.pageRef}>
                        <$ActionBar
                            title={"Conversations"}
                            onLoaded={(args: EventData) => {
                                this.setActionBarNativeStyle(args.object as ActionBar);
                            }}
                        />
                        <$StackLayout height={{ value: 100, unit: "%"}} width={{ value: 100, unit: "%"}} backgroundColor={new Color("white")}>
                            <$Label>TODO: Put something in here</$Label>
                        </$StackLayout>
                    </$Page>
                </$Frame>
            </$TabViewItem>
		);
	}
}