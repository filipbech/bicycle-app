import { LitElement, html, customElement, property } from 'lit-element';
import { revsToRPM } from '../../helpers/csc';

@customElement("show-cadence")
export class ShowCadenceElement extends LitElement {
    @property() cadence: string = "0";

    last: any;

    set data(value:any) {
        if(!value) { return }
        if(this.last) {
            this.cadence = revsToRPM({ 
                time: this.last.crankTime, 
                revs: this.last.crankRevs
            }, {
                time: value.crankTime, 
                revs: value.crankRevs
            }).toFixed();
            this.dispatchEvent(new CustomEvent('cadence', { detail: this.cadence }))
        }
        this.last = value;
    }

    render() {
        return html`${this.cadence}`;
    }
}


