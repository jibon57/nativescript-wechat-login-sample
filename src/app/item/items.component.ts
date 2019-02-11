import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;

    public api;
    constructor(private itemService: ItemService) {

        this.api = com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(app.android.context, "wxd930ea5d5a258f4f", false);

    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    public login() {
        let req = new com.tencent.mm.opensdk.modelmsg.SendAuth.Req();
        req.scope = "snsapi_userinfo";
        req.state = "none";
        this.api.sendReq(req);
    }
}
