import {LitElement, html, customElement, property} from 'lit-element';

import { revsToRPM, rpmToKPH } from '../../helpers/csc';

@customElement("show-speed")
export class ShowSpeedElement extends LitElement {
    @property() speed: string = "0.0";
    last:any
    set data(value:any) {
        if(!value) { return }
        if(this.last) {
            const rpm = revsToRPM({ 
                time: this.last.wheelTime, 
                revs: this.last.wheelRevs
            }, {
                time: value.wheelTime, 
                revs: value.wheelRevs
            });
            this.speed = rpmToKPH(rpm).toFixed(1);
            this.dispatchEvent(new CustomEvent('speed', {detail: this.speed}))
        }
        this.last = value;
    }

    render() {
        return html`${this.speed}`;
    }
}


