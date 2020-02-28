import {LitElement, html, customElement, property} from 'lit-element';

import { revsToKM } from '../../helpers/csc';

@customElement("show-distance")
export class ShowDistanceElement extends LitElement {
    @property() distance:string = "0.00";
    first:any;

    set data(value:any) {
        if(!value) { return }
        if(this.first) {
            this.distance = (revsToKM(value.wheelRevs)-this.first).toFixed(2);
            this.dispatchEvent(new CustomEvent('distance', {detail: this.distance}))
        } else {
            this.first = revsToKM(value.wheelRevs);
        }
    }

    render() {
        return html`${this.distance}`
    }
}


