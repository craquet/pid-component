/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { FoldableAction, FoldableItem } from "./components/foldable-component/foldable-component";
export { FoldableAction, FoldableItem } from "./components/foldable-component/foldable-component";
export namespace Components {
    interface BeautifulOrcid {
        /**
          * The date of the affiliation to display. (optional) Defaults to the current date.
          * @type {Date}
         */
        "affiliationAt": Date;
        /**
          * The ORCiD to display, evaluate and link in this component. (required)
          * @type {string}
         */
        "orcid": string;
        /**
          * Whether to show the affiliation or not. (optional) Defaults to true.
          * @type {boolean}
         */
        "showAffiliation": boolean;
        /**
          * Whether to show the department of the affiliation or not. Depends internally on availability of the department in the ORCiD information. (optional) Defaults to false.
          * @type {boolean}
         */
        "showDepartment": boolean;
        /**
          * Whether to show the ORCiD inline or not. (optional) Defaults to false.
          * @type {boolean}
         */
        "showOrcid": boolean;
    }
    interface DisplayMagic {
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
          * Determines whether subcomponents should generally be shown or not. If set to true, the component won't show any subcomponents. If not set, the component will show subcomponents, if the current level of subcomponents is not the total level of subcomponents or greater. (optional)
          * @type {boolean}
         */
        "doNOTShowSubcomponents": boolean;
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
          * The value to parse, evaluate and render.
          * @type {string}
         */
        "value": string;
    }
    interface FoldableComponent {
        "actions": FoldableAction[];
        /**
          * Should the table inside the component change colors every other line?
         */
        "changingColors": boolean;
        /**
          * The current elevation level of the subcomponents. If the difference between the current level and the level of the subcomponents is 0, the subcomponents are not shown.
         */
        "currentLevelOfSubcomponents": number;
        "items": FoldableItem[];
        /**
          * The maximum level of subcomponents to show.
         */
        "levelOfSubcomponents": number;
        /**
          * Should the details element be open by default?
         */
        "openStatus": boolean;
        /**
          * Should the subcomponents be shown?
         */
        "showSubcomponents": boolean;
    }
    /**
     * This component highlights a handle and links to the FAIR DO Scope.
     * It automatically generates colors for the parts of the handle (prefix and suffix) to make them easily distinguishable.
     */
    interface HandleHighlight {
        /**
          * Whether the component should use the filled or the outlined design.
         */
        "filled": boolean;
        /**
          * The Handle to highlight and link in this component.
         */
        "handle": string;
        /**
          * An optional custom link to use instead of the default one which links to the FAIR DO Scope.
         */
        "linkTo": 'disable' | 'fairdoscope' | 'resolveRef';
    }
    interface IntelligentHandle {
        /**
          * Should the table inside the component change colors every other line?
         */
        "changingColors": boolean;
        /**
          * The current elevation level of the subcomponents. If the difference between the current level and the level of the subcomponents is 0, the subcomponents are not shown.
         */
        "currentLevelOfSubcomponents": number;
        /**
          * The Handle to highlight and link in this component.
         */
        "handle": string;
        /**
          * The maximum level of subcomponents to show.
         */
        "levelOfSubcomponents": number;
        /**
          * Should the details element be open by default?
         */
        "openStatus": boolean;
        /**
          * Should the subcomponents be shown?
         */
        "showSubcomponents": boolean;
    }
    interface UsefulOrcid {
        /**
          * The date of the affiliation to display. (optional) Defaults to the current date.
          * @type {Date}
         */
        "affiliationAt": Date;
        /**
          * Should the table inside the component change colors every other line?
         */
        "changingColors": boolean;
        /**
          * Should the details element be open by default?
         */
        "openStatus": boolean;
        /**
          * The ORCiD to display, evaluate and link in this component. (required)
          * @type {string}
         */
        "orcid": string;
        /**
          * Whether to show the affiliation or not. (optional) Defaults to true.
          * @type {boolean}
         */
        "showAffiliation": boolean;
        /**
          * Whether to show the department of the affiliation or not. Depends internally on availability of the department in the ORCiD information. (optional) Defaults to false.
          * @type {boolean}
         */
        "showDepartment": boolean;
        /**
          * Whether to show the ORCiD inline or not. (optional) Defaults to false.
          * @type {boolean}
         */
        "showOrcid": boolean;
    }
}
declare global {
    interface HTMLBeautifulOrcidElement extends Components.BeautifulOrcid, HTMLStencilElement {
    }
    var HTMLBeautifulOrcidElement: {
        prototype: HTMLBeautifulOrcidElement;
        new (): HTMLBeautifulOrcidElement;
    };
    interface HTMLDisplayMagicElement extends Components.DisplayMagic, HTMLStencilElement {
    }
    var HTMLDisplayMagicElement: {
        prototype: HTMLDisplayMagicElement;
        new (): HTMLDisplayMagicElement;
    };
    interface HTMLFoldableComponentElement extends Components.FoldableComponent, HTMLStencilElement {
    }
    var HTMLFoldableComponentElement: {
        prototype: HTMLFoldableComponentElement;
        new (): HTMLFoldableComponentElement;
    };
    /**
     * This component highlights a handle and links to the FAIR DO Scope.
     * It automatically generates colors for the parts of the handle (prefix and suffix) to make them easily distinguishable.
     */
    interface HTMLHandleHighlightElement extends Components.HandleHighlight, HTMLStencilElement {
    }
    var HTMLHandleHighlightElement: {
        prototype: HTMLHandleHighlightElement;
        new (): HTMLHandleHighlightElement;
    };
    interface HTMLIntelligentHandleElement extends Components.IntelligentHandle, HTMLStencilElement {
    }
    var HTMLIntelligentHandleElement: {
        prototype: HTMLIntelligentHandleElement;
        new (): HTMLIntelligentHandleElement;
    };
    interface HTMLUsefulOrcidElement extends Components.UsefulOrcid, HTMLStencilElement {
    }
    var HTMLUsefulOrcidElement: {
        prototype: HTMLUsefulOrcidElement;
        new (): HTMLUsefulOrcidElement;
    };
    interface HTMLElementTagNameMap {
        "beautiful-orcid": HTMLBeautifulOrcidElement;
        "display-magic": HTMLDisplayMagicElement;
        "foldable-component": HTMLFoldableComponentElement;
        "handle-highlight": HTMLHandleHighlightElement;
        "intelligent-handle": HTMLIntelligentHandleElement;
        "useful-orcid": HTMLUsefulOrcidElement;
    }
}
declare namespace LocalJSX {
    interface BeautifulOrcid {
        /**
          * The date of the affiliation to display. (optional) Defaults to the current date.
          * @type {Date}
         */
        "affiliationAt"?: Date;
        /**
          * The ORCiD to display, evaluate and link in this component. (required)
          * @type {string}
         */
        "orcid": string;
        /**
          * Whether to show the affiliation or not. (optional) Defaults to true.
          * @type {boolean}
         */
        "showAffiliation"?: boolean;
        /**
          * Whether to show the department of the affiliation or not. Depends internally on availability of the department in the ORCiD information. (optional) Defaults to false.
          * @type {boolean}
         */
        "showDepartment"?: boolean;
        /**
          * Whether to show the ORCiD inline or not. (optional) Defaults to false.
          * @type {boolean}
         */
        "showOrcid"?: boolean;
    }
    interface DisplayMagic {
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
          * Determines whether subcomponents should generally be shown or not. If set to true, the component won't show any subcomponents. If not set, the component will show subcomponents, if the current level of subcomponents is not the total level of subcomponents or greater. (optional)
          * @type {boolean}
         */
        "doNOTShowSubcomponents"?: boolean;
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
          * The value to parse, evaluate and render.
          * @type {string}
         */
        "value"?: string;
    }
    interface FoldableComponent {
        "actions"?: FoldableAction[];
        /**
          * Should the table inside the component change colors every other line?
         */
        "changingColors"?: boolean;
        /**
          * The current elevation level of the subcomponents. If the difference between the current level and the level of the subcomponents is 0, the subcomponents are not shown.
         */
        "currentLevelOfSubcomponents"?: number;
        "items"?: FoldableItem[];
        /**
          * The maximum level of subcomponents to show.
         */
        "levelOfSubcomponents"?: number;
        /**
          * Should the details element be open by default?
         */
        "openStatus"?: boolean;
        /**
          * Should the subcomponents be shown?
         */
        "showSubcomponents"?: boolean;
    }
    /**
     * This component highlights a handle and links to the FAIR DO Scope.
     * It automatically generates colors for the parts of the handle (prefix and suffix) to make them easily distinguishable.
     */
    interface HandleHighlight {
        /**
          * Whether the component should use the filled or the outlined design.
         */
        "filled"?: boolean;
        /**
          * The Handle to highlight and link in this component.
         */
        "handle": string;
        /**
          * An optional custom link to use instead of the default one which links to the FAIR DO Scope.
         */
        "linkTo"?: 'disable' | 'fairdoscope' | 'resolveRef';
    }
    interface IntelligentHandle {
        /**
          * Should the table inside the component change colors every other line?
         */
        "changingColors"?: boolean;
        /**
          * The current elevation level of the subcomponents. If the difference between the current level and the level of the subcomponents is 0, the subcomponents are not shown.
         */
        "currentLevelOfSubcomponents"?: number;
        /**
          * The Handle to highlight and link in this component.
         */
        "handle": string;
        /**
          * The maximum level of subcomponents to show.
         */
        "levelOfSubcomponents"?: number;
        /**
          * Should the details element be open by default?
         */
        "openStatus"?: boolean;
        /**
          * Should the subcomponents be shown?
         */
        "showSubcomponents"?: boolean;
    }
    interface UsefulOrcid {
        /**
          * The date of the affiliation to display. (optional) Defaults to the current date.
          * @type {Date}
         */
        "affiliationAt"?: Date;
        /**
          * Should the table inside the component change colors every other line?
         */
        "changingColors"?: boolean;
        /**
          * Should the details element be open by default?
         */
        "openStatus"?: boolean;
        /**
          * The ORCiD to display, evaluate and link in this component. (required)
          * @type {string}
         */
        "orcid": string;
        /**
          * Whether to show the affiliation or not. (optional) Defaults to true.
          * @type {boolean}
         */
        "showAffiliation"?: boolean;
        /**
          * Whether to show the department of the affiliation or not. Depends internally on availability of the department in the ORCiD information. (optional) Defaults to false.
          * @type {boolean}
         */
        "showDepartment"?: boolean;
        /**
          * Whether to show the ORCiD inline or not. (optional) Defaults to false.
          * @type {boolean}
         */
        "showOrcid"?: boolean;
    }
    interface IntrinsicElements {
        "beautiful-orcid": BeautifulOrcid;
        "display-magic": DisplayMagic;
        "foldable-component": FoldableComponent;
        "handle-highlight": HandleHighlight;
        "intelligent-handle": IntelligentHandle;
        "useful-orcid": UsefulOrcid;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "beautiful-orcid": LocalJSX.BeautifulOrcid & JSXBase.HTMLAttributes<HTMLBeautifulOrcidElement>;
            "display-magic": LocalJSX.DisplayMagic & JSXBase.HTMLAttributes<HTMLDisplayMagicElement>;
            "foldable-component": LocalJSX.FoldableComponent & JSXBase.HTMLAttributes<HTMLFoldableComponentElement>;
            /**
             * This component highlights a handle and links to the FAIR DO Scope.
             * It automatically generates colors for the parts of the handle (prefix and suffix) to make them easily distinguishable.
             */
            "handle-highlight": LocalJSX.HandleHighlight & JSXBase.HTMLAttributes<HTMLHandleHighlightElement>;
            "intelligent-handle": LocalJSX.IntelligentHandle & JSXBase.HTMLAttributes<HTMLIntelligentHandleElement>;
            "useful-orcid": LocalJSX.UsefulOrcid & JSXBase.HTMLAttributes<HTMLUsefulOrcidElement>;
        }
    }
}
