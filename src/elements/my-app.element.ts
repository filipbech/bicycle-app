import { LitElement, customElement, html, property } from "lit-element";

import './connect-sensor/connect-sensor.element';
import { parseHeartRate } from '../helpers/hr-parser';
import { parseCSC } from '../helpers/csc';

import './beep-metronome/beep-metronome.element';

import './show-cadence/show-cadence.element';
import './show-speed/show-speed.element';
import './show-distance/show-distance.element';


@customElement('my-app')
export class MyAppElement extends LitElement {


    @property()
    hr = 0;

    hrUpdated(event) {
        this.hr = event.detail.heartRate;
    }


    @property()
    csc = 0;

    cscUpdated(event) {
        this.csc = event.detail;
    }

    render() {
        return html`
            <H1>MY app works</h1>

            <connect-sensor
                .configuration=${{
                    service:'heart_rate',
                    characteristic:'heart_rate_measurement',
                    name: 'Heart Name',
                    parser: parseHeartRate
                }}

                @value=${this.hrUpdated}
            
            >
                <beep-metronome .bpm=${this.hr}></beep-metronome>
            </connect-sensor>


            <connect-sensor
                .configuration=${{
                    service:'cycling_speed_and_cadence',
                    characteristic:'csc_measurement',
                    name: 'Bike',
                    parser: parseCSC
                }}
                @value=${this.cscUpdated}
            >
                <show-distance .data=${this.csc}></show-distance> Km<br>
                <show-speed .data=${this.csc}></show-speed> Km/h<br>
                <show-cadence .data=${this.csc}></show-cadence> rpm
            </connect-sensor>


        `;
    }
}