import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { Frame, Page, ActionBar, TabViewItem } from "react-nativescript/dist/client/ElementRegistry";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Frame, $Page } from "react-nativescript";
import { TabViewItemComponentProps } from "react-nativescript/dist/components/TabViewItem";

export class TabViewItemWithPage extends React.Component<{} & TabViewItemComponentProps<TabViewItem>, {}>{
    private readonly frameRef: React.RefObject<any> = React.createRef<Frame>();
	private readonly pageRef: React.RefObject<Page> = React.createRef<Page>();

	componentDidMount(){		
		const frame: Frame = this.frameRef.current!;
		const page: Page = this.pageRef.current!;
		console.log(`[componentDidMount] TabViewItemWithPage mounted! frame: ${frame}; page: ${page}`);
		
		if(!frame || !page){
			console.error(`[componentDidMount] TabViewItemWithPage missing ref, so unable to navigate - frame: ${frame}; page: ${page}.`);
			return;
		}

		frame.navigate({
			create: () => {
				return page;
			}
		});
    }

	render(){
		const { children, ...rest } = this.props;
		console.log(`[render] ChatTab render!`);

		return (
            <$TabViewItem {...rest}>
                <$Frame ref={this.frameRef}>
                    <$Page ref={this.pageRef}>{children}</$Page>
                </$Frame>
            </$TabViewItem>
		);
	}
}