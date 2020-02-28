import { LitElement, html, property, customElement } from "lit-element";
import { bind } from 'decko';

@customElement('beep-metronome')
export class BeepMetronomeElement extends LitElement {
    @property()
    bpm = 0;

    @property()
    enabled = false;

    lastBeep: number = 0;

    @bind
    loop() {
        if(this.enabled) {
            const now = new Date().getTime();
            const msBetweenBeeps = 1000 / (this.bpm / 60);
        
            if(now - this.lastBeep > msBetweenBeeps) {
                this.beep();
                this.lastBeep = now;
            }
        }

        requestAnimationFrame(this.loop);
    }

    beep() {
        const oscillator = this.audioContext.createOscillator();
        oscillator.connect(this.gainNode);
        oscillator.frequency.value = 880;
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    connectedCallback() {
        super.connectedCallback();
        this.loop();
    }

    audioContext = new AudioContext();
    gainNode = this.audioContext.createGain();

    constructor() {
        super();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    }

    render() {
        return html`
            <button 
                @click=${(e:any) => { this.enabled = !this.enabled }} 
                style="opacity:${this.enabled ? '1' : '0.5'}">
                    ${this.bpm}
            </button>
        `;
    }
}