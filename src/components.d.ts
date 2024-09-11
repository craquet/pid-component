/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ColorHighlight {
        /**
          * The text to highlight.
          * @type {string}
         */
        "text": string;
    }
    interface PidComponent {
        /**
          * The number of items to show in the table per page. Defaults to 10. (optional)
          * @type {number}
         */
        "amountOfItems": number;
        /**
          * The current level of subcomponents. Defaults to 0. (optional)
          * @type {number}
         */
        "currentLevelOfSubcomponents": number;
        /**
          * Determines whether the cache should be deleted after the component on the top level is disconnected. Defaults to true. (optional)
          * @type {boolean}
         */
        "deleteCacheAfterDisconnect": boolean;
        /**
          * Determines whether components should be emphasized towards their surrounding by border and shadow. If set to true, border and shadows will be shown around the component. It not set, the component won't be surrounded by border and shadow. (optional)
          * @type {boolean}
         */
        "emphasizeComponent": boolean;
        /**
          * Determines whether subcomponents should generally be shown or not. If set to true, the component won't show any subcomponents. If not set, the component will show subcomponents if the current level of subcomponents is not the total level of subcomponents or greater. (optional)
          * @type {boolean}
         */
        "hideSubcomponents": boolean;
        /**
          * The total number of levels of subcomponents to show. Defaults to 1. (optional)
          * @type {number}
         */
        "levelOfSubcomponents": number;
        /**
          * Determines whether the component is open or not by default. (optional)
          * @type {boolean}
         */
        "openByDefault": boolean;
        /**
          * A stringified JSON object containing settings for this component. The resulting object is passed to every subcomponent, so that every component has the same settings. Values and the according type are defined by the components themselves. (optional)  Schema: ```typescript {  type: string,  values: {   name: string,   value: any  }[] }[] ```
          * @type {string}
         */
        "settings": string;
        /**
          * Determines whether on the top level the copy button is shown. If set to true, the copy button is shown also on the top level. It not set, the copy button is only shown for sub-components. (optional)
          * @type {boolean}
         */
        "showTopLevelCopy": boolean;
        /**
          * The value to parse, evaluate and render.
          * @type {string}
         */
        "value": string;
    }
}
declare global {
    interface HTMLColorHighlightElement extends Components.ColorHighlight, HTMLStencilElement {
    }
    var HTMLColorHighlightElement: {
        prototype: HTMLColorHighlightElement;
        new (): HTMLColorHighlightElement;
    };
    interface HTMLPidComponentElement extends Components.PidComponent, HTMLStencilElement {
    }
    var HTMLPidComponentElement: {
        prototype: HTMLPidComponentElement;
        new (): HTMLPidComponentElement;
    };
    interface HTMLElementTagNameMap {
        "color-highlight": HTMLColorHighlightElement;
        "pid-component": HTMLPidComponentElement;
    }
}
declare namespace LocalJSX {
    interface ColorHighlight {
        /**
          * The text to highlight.
          * @type {string}
         */
        "text"?: string;
    }
    interface PidComponent {
        /**
          * The number of items to show in the table per page. Defaults to 10. (optional)
          * @type {number}
         */
        "amountOfItems"?: number;
        /**
          * The current level of subcomponents. Defaults to 0. (optional)
          * @type {number}
         */
        "currentLevelOfSubcomponents"?: number;
        /**
          * Determines whether the cache should be deleted after the component on the top level is disconnected. Defaults to true. (optional)
          * @type {boolean}
         */
        "deleteCacheAfterDisconnect"?: boolean;
        /**
          * Determines whether components should be emphasized towards their surrounding by border and shadow. If set to true, border and shadows will be shown around the component. It not set, the component won't be surrounded by border and shadow. (optional)
          * @type {boolean}
         */
        "emphasizeComponent"?: boolean;
        /**
          * Determines whether subcomponents should generally be shown or not. If set to true, the component won't show any subcomponents. If not set, the component will show subcomponents if the current level of subcomponents is not the total level of subcomponents or greater. (optional)
          * @type {boolean}
         */
        "hideSubcomponents"?: boolean;
        /**
          * The total number of levels of subcomponents to show. Defaults to 1. (optional)
          * @type {number}
         */
        "levelOfSubcomponents"?: number;
        /**
          * Determines whether the component is open or not by default. (optional)
          * @type {boolean}
         */
        "openByDefault"?: boolean;
        /**
          * A stringified JSON object containing settings for this component. The resulting object is passed to every subcomponent, so that every component has the same settings. Values and the according type are defined by the components themselves. (optional)  Schema: ```typescript {  type: string,  values: {   name: string,   value: any  }[] }[] ```
          * @type {string}
         */
        "settings"?: string;
        /**
          * Determines whether on the top level the copy button is shown. If set to true, the copy button is shown also on the top level. It not set, the copy button is only shown for sub-components. (optional)
          * @type {boolean}
         */
        "showTopLevelCopy"?: boolean;
        /**
          * The value to parse, evaluate and render.
          * @type {string}
         */
        "value"?: string;
    }
    interface IntrinsicElements {
        "color-highlight": ColorHighlight;
        "pid-component": PidComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "color-highlight": LocalJSX.ColorHighlight & JSXBase.HTMLAttributes<HTMLColorHighlightElement>;
            "pid-component": LocalJSX.PidComponent & JSXBase.HTMLAttributes<HTMLPidComponentElement>;
        }
    }
}
