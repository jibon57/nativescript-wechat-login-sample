import { Component } from "@angular/core";
import * as app from "application";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    constructor() {
        console.log("go");


    }
}
