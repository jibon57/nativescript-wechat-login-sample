Example (Android) of Wechat Login for NativeScript.


1) AppRegister.android.ts

2) wxapi.WXEntryActivity.android.ts

3) items.component.ts


If you would like to navigate to another page after getting response you can try this code here: https://github.com/jibon57/nativescript-wechat-login-sample/blob/b94eec6c8d954ab4e76247d3361abf823b002abb/src/app/wxapi.WXEntryActivity.android.ts#L44

```
import { android as androidApp, AndroidActivityEventData } from "tns-core-modules/application";
.....

setTimeout(() => {
    androidApp.notify(<AndroidActivityEventData>{
        eventName: 'wxResponse',
        object: res,
        activity: this
    });
}, 500);
```

Now you can catch reponse from anywhere of your application like in `app.component.ts` file.

```
import { Component, OnInit, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
.....

export class AppComponent implements OnInit {
    constructor(private ngZone: NgZone, private routeExt: RouterExtensions) {}

    ngOnInit() {
       let t = this;
       if (app.android) {
            app.android.on('wxapiresponse', wxResponseHandle, this);
        }

        function wxResponseHandle(res) {
            app.android.off("wxapiresponse", wxResponseHandle);
            console.log("wxResponse");
            console.dir(res.object);
            t.ngZone.run(() => {
              t.routeExt.navigateByUrl("...");
            })
        }
    }
}
```


Ref: 

https://open.wechat.com/cgi-bin/newreadtemplate?t=overseas_open/docs/mobile/login/guide#login_guide


https://github.com/aaronbruckner/wechatAndroidLoginDemo
