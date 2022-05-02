import {Animal} from "./animal.js";

export class Koala extends Animal {
    constructor(props) {
        super(props);
        this.habitat = this.getHabitat(this.race);
    }

}