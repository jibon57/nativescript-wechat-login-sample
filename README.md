Example of Wechat Login for NativeScript. Open this files to check the code.

**Android:**

1) App_Resources/Android/AndroidManifest.xml

3) App_Resources/Android/app.gradle

4) wxapi.WXEntryActivity.android.ts

5) main.ts

6) home.component.ts

7) app.component.ts

8) AppRegister.android.ts (optional)



**iOS:**

1) App_Resources/iOS/Info.plist

2) getappdelegate.ios.ts

3) main.ts

4) home.component.ts


**Run demo:**

**Make sure that you are testing in a real device & wechat has already been installed.**

```javascript
git clone https://github.com/jibon57/nativescript-wechat-login-sample
cd nativescript-wechat-login-sample
npm update
npm install
tns run android
tns run ios
```

**Webpack**

You will have to add `AppRegister.android.ts` (if you will need) & `wxapi.WXEntryActivity.android.ts` (require) in your `webpack.config.js` file so that android runtime can generate appropriate java class. Check the demo `webpack.config.js` file. You can [read here](https://docs.nativescript.org/core-concepts/android-runtime/advanced-topics/extend-application-activity#extending-activity) for details.

```javascript
const appComponents = [
    "tns-core-modules/ui/frame",
    "tns-core-modules/ui/frame/activity",
    resolve(__dirname, "src/app/wxapi.WXEntryActivity.android.ts"),
    resolve(__dirname, "src/app/AppRegister.android.ts")
];
```

Ref: 

https://open.wechat.com/cgi-bin/newreadtemplate?t=overseas_open/docs/mobile/login/guide#login_guide


https://github.com/aaronbruckner/wechatAndroidLoginDemo
