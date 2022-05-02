import {Animal} from "./animal.js";

export class Lion extends Animal {
    constructor(props) {
        super(props);
        this.habitat = this.getHabitat(this.race);
    }

}