Moved iOS dependencies to plugin. For [this bug](https://github.com/NativeScript/ios-runtime/issues/1136) adding wechat using cocoapods isn't working. It isn't generating any metadata. So, I have added the wechat static library (version 1.8.3) manually. When that bug will be resolve I hope you will be able to add wechat sdk in your app's `Podfile` directly. That time this plugin won't be necessary.


Ref:

https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419319164&lang=zh_CN
