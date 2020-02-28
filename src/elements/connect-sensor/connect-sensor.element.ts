import { LitElement, customElement, html, property } from "lit-element";

@customElement('connect-sensor')
export class ConnectSensorElement extends LitElement {

    @property()
    configuration:any;

    @property()
    connected = false;

    connect() {
        navigator.bluetooth.requestDevice({
            filters:[{
                services: [this.configuration.service]
            }]
        }).then(device => {
            if(!device || !device.gatt) {
                throw new Error('device not supported');
            }
            return device.gatt.connect()
        })
        .then(gattServer => gattServer.getPrimaryService(this.configuration.service))
        .then(service => service.getCharacteristic(this.configuration.characteristic))
        .then(characteristic => {
            this.connected = true;
            characteristic.addEventListener('characteristicvaluechanged', (event:any) => {
                if(this.configuration.parser) {
                    this.dispatchEvent(new CustomEvent('value', { detail: this.configuration.parser(event.target.value) }))
                    return;
                }
                
                this.dispatchEvent(new CustomEvent('value', { detail: event.target.value }))
            });
            characteristic.startNotifications();
        });
    }

    render() {
        return html`

            ${
                this.connected
                    ?   html`<slot>connected</slot>`
                    : html`<button @click=${this.connect}>Connect ${this.configuration.name}</button>`

            }

            
        `;
    }
}