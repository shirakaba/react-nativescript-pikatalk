import * as React from "react";
import * as ReactNativeScript from "react-nativescript";
import { $TabView, $TabViewItem, $StackLayout, $Label, $ActionBar, $Page } from "react-nativescript";
import { Color } from "tns-core-modules/color";

export class ChatTab extends React.Component<
    {
        title: string,
        colour: Color,
    },
    {}
>
{
    private readonly selfRef: React.RefObject<any> = React.createRef<any>();

	componentDidMount(){
        console.log(`[componentDidMount] ChatTab mounted!`);
	}

    render(){
        console.log(`[render] ChatTab render!`);
        const { title, colour, children, ...rest } = this.props;

        return (
            <$TabViewItem ref={this.selfRef} title={title}>
                    {/* <$ActionBar title={"ACTION SUB TITLE"}/> */}
                    <$StackLayout height={{ value: 100, unit: "%"}} width={{ value: 100, unit: "%"}} backgroundColor={colour}>
                        <$Label>TODO: PikaTalk 2</$Label>
                    </$StackLayout>
            </$TabViewItem>
        );
    }
}