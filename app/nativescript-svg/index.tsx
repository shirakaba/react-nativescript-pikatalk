import * as console from "react-nativescript/dist/shared/Logger";
import * as React from "react";
import { PropsWithoutForwardedRef } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { SVGImage as NativeScriptSVGImage, ImageSourceSVG } from "nativescript-svg";
import { ViewComponentProps, RCTView } from "react-nativescript/dist/components/View";
import { EventData } from "tns-core-modules/data/observable/observable";
import { register } from "react-nativescript/dist/client/ElementRegistry";

const elementKey: string = "svgImage";
register(elementKey, NativeScriptSVGImage);

type SVGImageProps = Pick<NativeScriptSVGImage, "imageSource"|"src"|"isLoading"|"loadMode">;

interface Props {
    onIsLoadingChange?: (isLoading: boolean) => void;
}

export type SVGImageComponentProps<
    E extends NativeScriptSVGImage = NativeScriptSVGImage
> = Props /* & typeof SVGImage.defaultProps */ & Partial<SVGImageProps> & ViewComponentProps<E>;

export class _SVGImage<
    P extends SVGImageComponentProps<E>,
    S extends {},
    E extends NativeScriptSVGImage
> extends RCTView<P, S, E> {
    // static defaultProps = {
    //     forwardedRef: React.createRef<NativeScriptSVGImage>()
    // };
    
    // private readonly onIsLoadingChange = (args: EventData) => {
    //     const isLoading: boolean = (args.object as NativeScriptSVGImage).isLoading;

    //     this.props.onIsLoadingChange && this.props.onIsLoadingChange(isLoading);
    // };

    // componentDidMount() {
    //     super.componentDidMount();

    //     const node: E | null = this.getCurrentRef();
    //     if (!node) {
    //         console.warn(`React ref to NativeScript View lost, so unable to update event listeners.`);
    //         return;
    //     }
    //     node.on("isLoadingChange", this.onIsLoadingChange);
    // }

    // componentWillUnmount() {
    //     super.componentWillUnmount();

    //     const node: E | null = this.getCurrentRef();
    //     if (!node) {
    //         console.warn(`React ref to NativeScript View lost, so unable to update event listeners.`);
    //         return;
    //     }
    //     node.off("isLoadingChange", this.onIsLoadingChange);
    // }

    render(): React.ReactNode {
        const {
            forwardedRef,

            onLoaded,
            onUnloaded,
            onAndroidBackPressed,
            onShowingModally,
            onShownModally,

            onTap,
            onDoubleTap,
            onPinch,
            onPan,
            onSwipe,
            onRotation,
            onLongPress,
            onTouch,

            onPropertyChange,

            children,
            //@ts-ignore - ATLoader not liking this rest operation for some reason.
            ...rest
        } = this.props;

        return React.createElement(
            elementKey,
            {
                ...rest,
                ref: forwardedRef || this.myRef,
            },
            children
        );
    }
}

type OwnPropsWithoutForwardedRef = PropsWithoutForwardedRef<SVGImageComponentProps<NativeScriptSVGImage>>;

export const $SVGImage: React.ComponentType<
    OwnPropsWithoutForwardedRef & React.ClassAttributes<NativeScriptSVGImage>
> = React.forwardRef<NativeScriptSVGImage, OwnPropsWithoutForwardedRef>(
    (props: React.PropsWithChildren<OwnPropsWithoutForwardedRef>, ref: React.RefObject<NativeScriptSVGImage>) => {
        const { children, ...rest } = props;

        return React.createElement(
            _SVGImage,
            {
                ...rest,
                forwardedRef: ref,
            },
            children
        );
    }
);
