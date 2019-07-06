import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { Frame, Page, ActionBar } from "react-nativescript/dist/client/ElementRegistry";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Frame, $Page, $ListView, $GridLayout, $Image, $ContentView } from "react-nativescript";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Color } from "tns-core-modules/color";
import { isIOS } from "tns-core-modules/platform/platform";
import { EventData } from "tns-core-modules/ui/page/page";
import { TabViewItemWithPage } from "~/components/TabViewItemWithPage";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { FontWeight } from "tns-core-modules/ui/enums/enums";
import { Length } from "tns-core-modules/ui/styling/style-properties";
import { $SVGImage } from "../nativescript-svg/index";
import { SVGImage, ImageSourceSVG } from "nativescript-svg";

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
            avatar: "~/img/002.svg",
            name: "Venusaur",
            message: "Solar beam!",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
            online: false,
        },
        {
            type: "ELECTRIC",
            avatar: "~/img/025.svg",
            name: "Pikachu",
            message: "Pika pika!",
            timestamp: new Date(),
            online: true,
        },
        {
            type: "NORMAL",
            avatar: "~/img/133.svg",
            name: "Eevee",
            message: "Smell ya later!",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
            online: false,
        },
        {
            type: "FAIRY",
            avatar: "~/img/035.svg",
            name: "Clefairy",
            message: "...",
            timestamp: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            online: false,
        },
        {
            type: "NORMAL",
            avatar: "~/img/143.svg",
            name: "Snorlax",
            message: "gtg 😴",
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
            online: false,
        },
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

    private readonly avatarLength: number = Length.toDevicePixels(60);

    private readonly styles = {
        avatar: {
            width: { value: this.avatarLength, unit: "px" as "px" },
            height: { value: this.avatarLength, unit: "px" as "px" },
        },
    };

	render(){
		const { focused, } = this.props;
		console.log(`[render] ChatTab render with this.avatarLength ${this.avatarLength}!`);

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
                            const { type, avatar, name, message, timestamp, online } = item;
                            
                            return (
                                <$GridLayout ref={ref}
                                    rows={[new ItemSpec(1, "star")]}
                                    columns={[new ItemSpec(this.avatarLength, "pixel"), new ItemSpec(1, "star"), new ItemSpec(1, "auto")]}
                                >
                                    <$SVGImage
                                        row={0}
                                        col={0}
                                        src={item.avatar}
                                        loadMode={"sync"}
                                        // onLoaded={(args: EventData) => {
                                        //     const svgImage: SVGImage = args.object as SVGImage;
                                        //     const imageSource: ImageSourceSVG = svgImage.imageSource;
                                        // }}
                                        style={this.styles.avatar}
                                        onIsLoadingChange={(isLoading: boolean)=>{
                                            console.log(`SVGImage 'isLoading' now: ${isLoading}`);
                                        }}
                                    />
                                    <$GridLayout
                                        row={0}
                                        col={1}
                                        rows={[new ItemSpec(1, "star"), new ItemSpec(1, "star")]}
                                        columns={[new ItemSpec(1, "star")]}
                                    >
                                        <$Label row={0} col={0} style={{ fontWeight: FontWeight.bold }}>{item.name}</$Label>
                                        <$Label row={1} col={0} color={new Color('gray')}>{item.message}</$Label>
                                    </$GridLayout>
                                    <$GridLayout
                                        row={0}
                                        col={2}
                                        rows={[new ItemSpec(1, "star"), new ItemSpec(1, "star")]}
                                        columns={[new ItemSpec(1, "star")]}
                                    >
                                        <$Label row={0} col={0} textAlignment={"right"} color={new Color('lightgray')}>
                                            {`${[timestamp.getDate(), timestamp.getMonth(), timestamp.getFullYear().toString().slice(2)].join('/')}`}
                                        </$Label>
                                        <$Label row={1} col={0} textAlignment={"center"}>{online ? "💡" : ""}</$Label>
                                    </$GridLayout>
                                </$GridLayout>
                            );
                        }}
                    />
                </$StackLayout>
            </TabViewItemWithPage>
		);
	}
}