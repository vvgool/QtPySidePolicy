// 获取调用链
function getStackTrace() {
    var Exception = Java.use("java.lang.Exception");
    var ins = Exception.$new("Exception");
    var straces = ins.getStackTrace();
    if (undefined == straces || null == straces) {
        return;
    }
    var result = "";
    for (var i = 0; i < straces.length; i++) {
        var str = "   " + straces[i].toString();
        result += str + "\r\n";
    }
    Exception.$dispose();
    return result;
}

//告警发送
function alertSend(name, action, messages) {
    var myDate = new Date();
    send({ "type": "notice", "name": name, "time": myDate.getTime(), "action": action, "msg": messages, "stacks": getStackTrace() });
}



// APP申请权限
function checkRequestPermission() {
    var ActivityCompat = Java.use("androidx.core.app.ActivityCompat")

    ActivityCompat.requestPermissions.overload('android.app.Activity', '[Ljava.lang.String;', 'int').implementation = function (p1, p2, p3) {
        var temp = this.requestPermissions(p1, p2, p3);
        alertSend("权限", "requestPermissions", "申请权限为: " + p2);
        return temp

    }
}

// APP获取IMEI/IMSI
function getPhoneState() {
    var TelephonyManager = Java.use("android.telephony.TelephonyManager");

    // API level 26 获取单个IMEI的方法
    TelephonyManager.getDeviceId.overload().implementation = function () {
        var temp = this.getDeviceId();
        alertSend("Phone", "getDeviceId", "获取的deviceId为: " + temp)
        return temp;
    };

    //API level 26 获取多个IMEI的方法
    TelephonyManager.getDeviceId.overload('int').implementation = function (p) {
        var temp = this.getDeviceId(p);
        alertSend("Phone", "getDeviceId", "获取(" + p + ")的deviceId为: " + temp);
        return temp;
    };

    //API LEVEL26以上的获取单个IMEI方法
    TelephonyManager.getImei.overload().implementation = function () {
        var temp = this.getImei();
        alertSend("Phone", "getImei", "获取的IMEI为: " + temp)
        return temp;
    };

    // API LEVEL26以上的获取多个IMEI方法
    TelephonyManager.getImei.overload('int').implementation = function (p) {
        var temp = this.getImei(p);
        alertSend("Phone", "getImei", "获取(" + p + ")的IMEI为: " + temp);
        return temp;
    };

    //imsi/iccid
    TelephonyManager.getSimSerialNumber.overload().implementation = function () {
        var temp = this.getSimSerialNumber();
        alertSend("Phone", "getSimSerialNumber", "获取IMSI/iccid为(String): " + temp);
        return temp;
    };

    //imsi
    TelephonyManager.getSubscriberId.overload().implementation = function () {
        var temp = this.getSubscriberId();
        alertSend("Phone", "getSubscriberId", "获取IMSI为(int): " + temp);
        return temp;
    }

    //imsi/iccid
    TelephonyManager.getSimSerialNumber.overload('int').implementation = function (p) {
        var temp = this.getSimSerialNumber(p);
        alertSend("Phone", "getSimSerialNumber", "参数为：(" + p + "), 获取IMSI/iccid为(int): " + temp);
        return temp;
    }

    TelephonyManager.getTelephonyProperty.overload('int', 'java.lang.String', 'java.lang.String').implementation = function(p, p1, p2) {
        var temp = this.getTelephonyProperty(p, p1, p2);
        alertSend("Phone", "获取运营商" , "getTelephonyProperty参数为：" + p + " " + p1 + " " + p2);
        return temp;
    }

}

// 获取系统属性（记录关键的）
function getSystemProperties() {
    var SystemProperties = Java.use("android.os.SystemProperties");

    SystemProperties.get.overload('java.lang.String').implementation = function (p1) {
        var temp = this.get(p1);
        if (p1 == "ro.serialno") {
            alertSend("系统属性", "ro.serialno获取设备序列号", "获取(" + p1 + ")，值为：" + temp);
        }
        if (p1 == "ro.build.display.id") {
            alertSend("系统属性", "ro.build.display.id获取版本号", "获取(" + p1 + ")，值为：" + temp);
        }
        //MEID
        if (p1 == "ril.cdma.meid") {
            alertSend("系统属性", "ril.cdma.meid获取MEID", "获取(" + p1 + ")，值为：" + temp);
        }
        //手机型号
        if (p1 == "ro.product.model") {
            alertSend("系统属性", "ro.product.model获取手机型号", "获取(" + p1 + ")，值为：" + temp);
        }
        //手机厂商
        if (p1 == "ro.product.manufacturer") {
            alertSend("系统属性", "ro.product.manufacturer获取手机厂商", "获取(" + p1 + ")，值为：" + temp);
        }

        return temp;
    }

    SystemProperties.get.overload('java.lang.String', 'java.lang.String').implementation = function (p1, p2) {
        var temp = this.get(p1, p2)

        if (p1 == "ro.serialno") {
            alertSend("系统属性", "ro.serialno获取设备序列号", "获取(" + p1 + " 、 " + p2 + ")，值为：" + temp);
        }
        if (p1 == "ro.build.display.id") {
            alertSend("系统属性", "ro.build.display.id获取版本号", "获取(" + p1 + " 、 " + p2 + ")，值为：" + temp);
        }
        //MEID
        if (p1 == "ril.cdma.meid") {
            alertSend("系统属性", "ril.cdma.meid获取MEID", "获取(" + p1 + " 、 " + p2 + ")，值为：" + temp);
        }
        //手机型号
        if (p1 == "ro.product.model") {
            alertSend("系统属性", "ro.product.model获取手机型号", "获取(" + p1 + " 、 " + p2 + ")，值为：" + temp);
        }
        //手机厂商
        if (p1 == "ro.product.manufacturer") {
            alertSend("系统属性", "ro.product.manufacturer获取手机厂商", "获取(" + p1 + " 、 " + p2 + ")，值为：" + temp);
        }

        return temp;
    }

    SystemProperties.getInt.overload('java.lang.String', 'int').implementation = function (p1, p2) {
        var temp = this.getInt(p1, p2)

        if (p1 == "ro.build.version.sdk") {
            alertSend("系统属性", "ro.build.version.sdk获取SDK版本号", "获取(" + p1 + ")，值为：" + temp);
        }

        return temp;
    }

}

//获取手机通信录
function getPhoneAddressBook() {
    var contacts_uri = Java.use("android.provider.ContactsContract$Contacts").CONTENT_URI.value.toString();

    var contentResolver = Java.use("android.content.ContentResolver");
    contentResolver.query.overload('android.net.Uri', '[Ljava.lang.String;', 'android.os.Bundle', 'android.os.CancellationSignal').implementation = function (uri, str, bundle, sig) {
        if (uri == contacts_uri) {
            alertSend("Phone", "获取手机通信录", "获取uri为：" + uri)
        }
        return this.query(uri, str, bundle, sig);
    }
}

// 获取安卓ID
function getAndroidId() {
    var SettingsSecure = Java.use("android.provider.Settings$Secure");

    SettingsSecure.getString.implementation = function (p1, p2) {
        if (p2.indexOf("android_id") < 0) {
            return this.getString(p1, p2);
        }
        var temp = this.getString(p1, p2);
        alertSend("Phone", "获取Android ID", "参数为：" + p2 + "，获取到的ID为：" + temp);
        return temp;
    }

    SettingsSecure.getStringForUser.implementation = function (p1, p2, p3) {
        var temp = this.getStringForUser(p1, p2, p3);
        alertSend("Phone", "获取getStringForUser", "参数为：p1 = " + p1 + " p2 = " + p2 + " p3 = " + p3 + "，获取到的ID为：" + temp);
        return temp;
    }
}

//获取其他app信息
function getPackageManager() {
    var PackageManager = Java.use("android.content.pm.PackageManager");
    var ApplicationPackageManager = Java.use("android.app.ApplicationPackageManager");
    var ActivityManager = Java.use("android.app.ActivityManager");

    PackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
        var temp = this.getInstalledPackages(p1);
        alertSend("AppInfo", "getInstalledPackages", "1获取的数据为：" + temp);
        return temp;
    };

    PackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
        var temp = this.getInstalledApplications(p1);
        alertSend("AppInfo", "getInstalledApplications", "getInstalledApplications获取的数据为：" + temp);
        return temp;
    };

    ApplicationPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
        var temp = this.getInstalledPackages(p1);
        alertSend("AppInfo", "getInstalledPackages", "getInstalledPackages获取的数据为：" + temp);
        return temp;
    };

    ApplicationPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
        var temp = this.getInstalledApplications(p1);
        alertSend("AppInfo", "getInstalledApplications", "getInstalledApplications获取的数据为：" + temp);
        return temp;
    };

    ApplicationPackageManager.queryIntentActivities.implementation = function (p1, p2) {
        var temp = this.queryIntentActivities(p1, p2);
        alertSend("AppInfo", "queryIntentActivities", "参数为：" + p1 + p2 + "，queryIntentActivities获取的数据为：" + temp);
        return temp;
    };

    ApplicationPackageManager.getInstalledPackagesAsUser.implementation = function (p1, p2) {
        var temp = this.getInstalledPackagesAsUser(p1, p2);
        alertSend("AppInfo", "getInstalledPackagesAsUser", "参数为：" + p1 + p2 + "，getInstalledPackagesAsUser获取的数据为：" + temp);
        return temp;
    }


    ApplicationPackageManager.isInstantApp.overload().implementation = function () {
        var temp = this.isInstantApp();
        alertSend("AppInfo", "isInstantApp", "isInstantApp获取的数据为：" + temp);
        return temp;
    }

    ApplicationPackageManager.getInstantApps.implementation = function () {
        var temp = this.getInstantApps();
        alertSend("AppInfo", "getInstantApps", "getInstantApps获取的数据为：" + temp);
        return temp;
    }

    ApplicationPackageManager.getApplicationInfo.implementation = function (p1, p2) {
        var temp = this.getApplicationInfo(p1, p2);
        var string_to_recv;
        // 判断是否为自身应用，是的话不记录
        send({ "type": "app_name", "data": p1 });

        recv(function (received_json_object) {
            string_to_recv = received_json_object.my_data;
        }).wait();

        if (string_to_recv) {
            alertSend("AppInfo", "getApplicationInfo", "getApplicationInfo获取的数据为：" + temp);
        }
        return temp;
    };

    ActivityManager.getRunningAppProcesses.implementation = function () {
        var temp = this.getRunningAppProcesses();
        alertSend("AppInfo", "getRunningAppProcesses", "获取了正在运行的App");
        return temp;
    };

    ActivityManager.getRunningTasks.implementation = function(p) {
        var temp = this.getRunningTasks(p);
        alertSend("AppInfo", "getRunningTasks", "获取了正在运行的App 参数： " + p);
        return temp;
    }
}

// 获取位置信息
function getGSP() {
    var locationManager = Java.use("android.location.LocationManager");

    locationManager.getLastKnownLocation.overload("java.lang.String").implementation = function (p1) {
        var temp = this.getLastKnownLocation(p1);
        alertSend("位置", "getLastKnownLocation", "获取位置信息，参数为：" + p1)
        return temp;
    }

    locationManager.requestLocationUpdates.overload("java.lang.String", "long", "float", "android.location.LocationListener").implementation = function (p1, p2, p3, p4) {
        var temp = this.requestLocationUpdates(p1, p2, p3, p4);
        alertSend("位置", "requestLocationUpdates", "获取位置信息");
        return temp;
    }

}

// 调用摄像头(hook，防止静默拍照)
function getCamera() {
    var Camera = Java.use("android.hardware.Camera");

    Camera.open.overload("int").implementation = function (p1) {
        var temp = this.open(p1);
        alertSend("相机", "Camera.open", "调用摄像头id：" + p1.toString());
        return temp;
    }
}

//获取网络信息
function getNetwork() {
    var WifiInfo = Java.use("android.net.wifi.WifiInfo");

    //获取ip
    WifiInfo.getIpAddress.implementation = function () {
        var temp = this.getIpAddress();

        var _ip = new Array();
        _ip[0] = (temp >>> 24) >>> 0;
        _ip[1] = ((temp << 8) >>> 24) >>> 0;
        _ip[2] = (temp << 16) >>> 24;
        _ip[3] = (temp << 24) >>> 24;
        var _str = String(_ip[3]) + "." + String(_ip[2]) + "." + String(_ip[1]) + "." + String(_ip[0]);

        alertSend("网络", "getIpAddress", "获取IP地址：" + _str);
        return temp;
    }
    //获取mac地址
    WifiInfo.getMacAddress.implementation = function () {
        var temp = this.getMacAddress();
        alertSend("网络", "getMacAddress", "获取到的Mac地址: " + temp);
        return temp;
    }

    WifiInfo.getSSID.implementation = function () {
        var temp = this.getSSID();
        alertSend("网络", "getSSID", "获取到的SSID: " + temp);
        return temp;
    }

    WifiInfo.getBSSID.implementation = function () {
        var temp = this.getBSSID();
        alertSend("网络", "getBSSID", "获取到的BSSID: " + temp);
        return temp;
    }

    var WifiManager = Java.use("android.net.wifi.WifiManager");

    // 获取wifi信息
    WifiManager.getConnectionInfo.implementation = function () {
        var temp = this.getConnectionInfo();
        alertSend("网络", "getConnectionInfo", "获取wifi信息");
        return temp;
    };

    var InetAddress = Java.use("java.net.InetAddress");

    //获取IP
    InetAddress.getHostAddress.implementation = function () {
        var temp = this.getHostAddress();

        alertSend("网络", "getHostAddress", "获取IP地址：" + temp.toString());
        return temp;
    }

    var NetworkInterface = Java.use("java.net.NetworkInterface");

    //获取mac
    NetworkInterface.getHardwareAddress.overload().implementation = function () {
        var temp = this.getHardwareAddress();
        alertSend("网络", "getHardwareAddress", "获取到的Mac地址: " + temp);
        return temp;
    }

    var NetworkInfo = Java.use("android.net.NetworkInfo");

    NetworkInfo.getType.implementation = function () {
        var temp = this.getType();
        alertSend("网络", "getType获取网络信息", "获取网络类型：" + temp.toString());
        return temp;
    }

    NetworkInfo.getTypeName.implementation = function () {
        var temp = this.getTypeName();
        alertSend("网络", "getTypeName获取网络信息", "获取网络类型名称：" + temp);
        return temp;
    }

    NetworkInfo.getExtraInfo.implementation = function () {
        var temp = this.getExtraInfo();
        alertSend("网络", "getExtraInfo获取网络信息", "获取网络名称：" + temp);
        return temp;
    }

    NetworkInfo.isAvailable.implementation = function () {
        var temp = this.isAvailable();
        alertSend("网络", "isAvailable获取网络信息", "获取网络是否可用：" + temp.toString());
        return temp;
    }

    NetworkInfo.isConnected.implementation = function () {
        var temp = this.isConnected();
        alertSend("网络", "isConnected获取网络信息", "获取网络是否连接：" + temp.toString());
        return temp;
    }

}

//获取蓝牙设备信息
function getBluetooth() {
    var BluetoothDevice = Java.use("android.bluetooth.BluetoothDevice");

    //获取蓝牙设备名称
    BluetoothDevice.getName.overload().implementation = function () {
        var temp = this.getName();
        alertSend("蓝牙", "getName获取蓝牙信息", "获取到的蓝牙设备名称: " + temp)
        return temp;
    }

    //获取蓝牙设备mac
    BluetoothDevice.getAddress.implementation = function () {
        var temp = this.getAddress();
        alertSend("蓝牙", "getAddress获取蓝牙信息", "获取到的蓝牙设备mac: " + temp)
        return temp;
    }

    var BluetoothAdapter = Java.use("android.bluetooth.BluetoothAdapter");

    //获取蓝牙设备名称
    BluetoothAdapter.getName.implementation = function () {
        var temp = this.getName();
        alertSend("蓝牙", "getName获取蓝牙信息", "获取到的蓝牙设备名称: " + temp)
        return temp;
    };


}

//获取基站信息
function getCidorLac() {
    // 电信卡cid lac
    var CdmaCellLocation = Java.use("android.telephony.cdma.CdmaCellLocation");

    CdmaCellLocation.getBaseStationId.implementation = function () {
        var temp = this.getBaseStationId();
        alertSend("SIM", "getBaseStationId获取基站信息", "获取到的cid: " + temp);
        return temp
    }
    CdmaCellLocation.getNetworkId.implementation = function () {
        var temp = this.getNetworkId();
        alertSend("SIM", "getNetworkId获取基站信息", "获取到的lac: " + temp);
        return temp
    }

    // 移动 联通卡 cid/lac
    var GsmCellLocation = Java.use("android.telephony.gsm.GsmCellLocation");

    GsmCellLocation.getCid.implementation = function () {
        var temp = this.getCid();
        alertSend("SIM", "getCid获取基站信息", "获取到的cid: " + temp);
        return temp
    }
    GsmCellLocation.getLac.implementation = function () {
        var temp = this.getLac();
        alertSend("SIM", "getLac获取基站信息", "获取到的lac: " + temp);
        return temp
    }

}

function getClipboradInfo() {
    var ClipboardManager = Java.use("android.content.ClipboardManager");
    ClipboardManager.getPrimaryClip.implementation = function () {
        var temp = this.getPrimaryClip();
        alertSend("剪切板", "getPrimaryClip", "获取到的info： " + temp);
        return temp;
    }
}

function getSensorInfo() {
    var SensorManager = Java.use("android.hardware.SensorManager");
    SensorManager.getSensorList.implementation = function(type) {
        var temp = this.getSensorList(type);
        alertSend("传感器", "getSensorList", "获取传感器 type: " + type + " result = " + temp.toString());
        return temp;
    }
}

function main() {
    Java.perform(function () {
        console.log("合规检测敏感接口开始监控...");
        send({ "type": "isHook" })
        checkRequestPermission();
        getPhoneState();
        getSystemProperties();
        getPhoneAddressBook();
        getAndroidId();
        getPackageManager();
        getGSP();
        getCamera();
        getNetwork();
        getBluetooth();
        getClipboradInfo();
        getSensorInfo();
    });
}

//在spawn模式下，hook系统API时如javax.crypto.Cipher建议使用setImmediate立即执行，不需要延时
//在spawn模式下，hook应用自己的函数或含壳时，建议使用setTimeout并给出适当的延时(500~5000)

// main();
//setImmediate(main)
// setTimeout(main, 3000);
