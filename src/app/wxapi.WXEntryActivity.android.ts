import { setActivityCallbacks, AndroidActivityCallbacks } from "tns-core-modules/ui/frame";
const BaseResp = com.tencent.mm.opensdk.modelbase.BaseResp;
import * as app from "tns-core-modules/application";
import { AndroidActivityEventData } from "tns-core-modules/application";

declare var android;

// YOUR_APP_ID.wxapi.WXEntryActivity 
@JavaProxy("net.sourceforge.simcpux.wxapi.WXEntryActivity")
@Interfaces([com.tencent.mm.opensdk.openapi.IWXAPIEventHandler])
class WXEntryActivity extends android.support.v7.app.AppCompatActivity implements com.tencent.mm.opensdk.openapi.IWXAPIEventHandler {
    public isNativeScriptActivity;

    private _callbacks: AndroidActivityCallbacks;

    private api: com.tencent.mm.opensdk.openapi.IWXAPI;

    public onCreate(savedInstanceState): void {

        this.isNativeScriptActivity = true;
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }

        console.log("onCreate");

        this.api = com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(this, "wxd930ea5d5a258f4f", false);

        try {
            this.api.handleIntent(this.getIntent(), this);
        } catch (e) {
            console.log("handleIntent error");
            console.log(e);
        }

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
    }

    public onResp(res: com.tencent.mm.opensdk.modelbase.BaseResp) {
        console.log("onResp");
        setTimeout(() => {
            app.notify(<AndroidActivityEventData>{
                eventName: 'wxApiResponse',
                object: res,
                activity: this
            });
        }, 500);
    }

    public onReq(res: com.tencent.mm.opensdk.modelbase.BaseReq) {
        console.log("onReq");
    }

    public onSaveInstanceState(outState): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    public onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    public onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    public onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    public onActivityResult(requestCode: number, resultCode: number, data): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }
}
