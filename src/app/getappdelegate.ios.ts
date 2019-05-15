import { ApplicationEventData } from "tns-core-modules/application";
import * as application from 'tns-core-modules/application';

declare var UIResponder, UIApplicationDelegate, NSObject;

export function getAppDelegate() {
    // Play nice with other plugins by not completely ignoring anything already added to the appdelegate
    if (application.ios.delegate === undefined) {
        class UIApplicationDelegateImpl extends UIResponder {
            public static ObjCProtocols = [UIApplicationDelegate];

            static new(): UIApplicationDelegateImpl {
                return <UIApplicationDelegateImpl>super.new();
            }
        }

        application.ios.delegate = UIApplicationDelegateImpl;
    }

    return application.ios.delegate;
}

export function enableMultipleOverridesFor(classRef, methodName, nextImplementation) {
    const currentImplementation = classRef.prototype[methodName];
    classRef.prototype[methodName] = function () {
        const result = currentImplementation && currentImplementation.apply(currentImplementation, Array.from(arguments));
        return nextImplementation.apply(nextImplementation, Array.from(arguments).concat([result]));
    };
}

export function setupAppDeligate() {

    let appDelegate = getAppDelegate();

    enableMultipleOverridesFor(appDelegate, 'applicationDidFinishLaunchingWithOptions', function (application, launchOptions) {
        console.log("applicationDidFinishLaunchingWithOptions");
        WXApi.registerAppEnableMTA("wxd930ea5d5a258f4f", true);
        return true;
    });

    enableMultipleOverridesFor(appDelegate, 'applicationHandleOpenURL', function (application, url) {
        console.log("applicationHandleOpenURL");
        return WXApi.handleOpenURLDelegate(url, WXApiManagerDelegate.new())
    });

    enableMultipleOverridesFor(appDelegate, 'applicationOpenURLSourceApplicationAnnotation', function (application, url, sourceApplication, annotation) {
        console.log("applicationOpenURLSourceApplicationAnnotation");
        try {
            return WXApi.handleOpenURLDelegate(url, WXApiManagerDelegate.new())
        } catch (e) {
            console.log("error!!")
            console.log(e);
        }

    });
}

class WXApiManagerDelegate extends NSObject implements WXApiDelegate {

    public static ObjCProtocols = [WXApiDelegate];

    static new(): WXApiManagerDelegate {
        return <WXApiManagerDelegate>super.new();
    }

    public onReq(res: BaseReq) {
        console.log("onReq")
    }

    /**
     * onResp
     */
    public onResp(res: BaseResp) {
        console.log("BaseResp")
        console.log(res.errCode);

        switch (res.errCode) {
            case 0:
                setTimeout(() => {
                    application.notify(<ApplicationEventData>{
                        eventName: 'wxApiResponse',
                        object: res,
                        activity: this
                    });
                }, 500);
                break;

            case -2:
                console.log("user canceled");
                break;

            default:
                console.log("user refused to authorize");
                break;
        }
    }
}
