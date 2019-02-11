
@JavaProxy("net.sourceforge.simcpux.AppRegister")
class AppRegister extends android.content.BroadcastReceiver {
    public onReceive(context, intent) {
        console.log("onReceive");
        let api = com.tencent.mm.opensdk.openapi.WXAPIFactory.createWXAPI(context, null);
        api.registerApp("wxd930ea5d5a258f4f");
    }
}