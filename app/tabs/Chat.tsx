import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { Frame, Page, ActionBar } from "react-nativescript/dist/client/ElementRegistry";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Frame, $Page, $ListView } from "react-nativescript";
import { Color } from "tns-core-modules/color";
import { isIOS } from "tns-core-modules/platform/platform";
import { EventData } from "tns-core-modules/ui/page/page";
import { TabViewItemWithPage } from "~/components/TabViewItemWithPage";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

interface Props {
    focused: boolean,
}

interface State {

}

interface ConversationItem {
    type: string,
    avatar: string,
    name: string,
    message: string,
    timestamp: Date,
    online: boolean,
}

export class ChatTab extends React.Component<Props, State>
{
    private readonly items: ObservableArray<ConversationItem> = new ObservableArray([
        {
            type: "GRASS",
            avatar: "someUrl",
            name: "Venusaur",
            message: "Solar beam!",
            timestamp: new Date(),
            online: true,
        }
    ]);

    // static getDerivedStateFromProps(props: Readonly<Props>, state: Readonly<State>){
    //     return {
    //         ...state,

    //     };
    // }

    private readonly updateItems = (): Promise<ConversationItem[]> => {
        return Promise.resolve([]);
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>){
        if(!this.props.focused && nextProps.focused){
            // if(this.items.length === 0)
            this.updateItems().catch(console.error);
        }

        return true;
    }

    
    
    private readonly setActionBarNativeStyle = (ab: ActionBar) => {
        if(!isIOS){
            return;
        }

        const uiNavBar: UINavigationBar = ab.ios as UINavigationBar;
        uiNavBar.prefersLargeTitles = true;
    };

	render(){
		const { focused, } = this.props;
		console.log(`[render] ChatTab render!`);

		return (
            <TabViewItemWithPage title={"Chat"}>
                <$ActionBar
                    title={"Conversations"}
                    onLoaded={(args: EventData) => {
                        this.setActionBarNativeStyle(args.object as ActionBar);
                    }}
                />
                <$StackLayout
                    height={{ value: 100, unit: "%"}}
                    width={{ value: 100, unit: "%"}}
                    backgroundColor={new Color("white")}
                >
                    {/* <$Label>TODO: Put something in here</$Label> */}
                    <$ListView
                        height={{ value: 100, unit: "%"}}
                        width={{ value: 100, unit: "%"}}
                        items={this.items}
                        cellFactory={(item: ConversationItem, ref: React.RefObject<any>) => {
                            return (
                                <$Label ref={ref}>HEYA</$Label>
                            );
                        }}
                    />
                </$StackLayout>
            </TabViewItemWithPage>
		);
	}
}