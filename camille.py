import frida
import time
import signal
import os
from pathlib import Path
from InfoModel import InfoModel


def frida_hook(app_name, func, wait_time=0):
    # 消息处理
    def my_message_handler(message, payload):
        if message["type"] == "error":
            print(message)
            os.kill(os.getpid(), signal.SIGTERM)
            return
        if message['type'] == 'send':
            data = message["payload"]
            if data["type"] == "notice":
                info = InfoModel.parse(data)
                func(info)
            if data['type'] == "app_name":
                get_app_name = data['data']
                my_data = False if get_app_name == app_name else True
                script.post({"my_data": my_data})
            if data['type'] == "isHook":
                global isHook
                isHook = True

    try:
        device = frida.get_usb_device()
        pid = device.spawn([app_name])
    except Exception as e:
        print("[*] hook error")
        print(e)
        exit()

    time.sleep(1)
    session = device.attach(pid)
    time.sleep(1)

    with open(os.fspath(Path(__file__).resolve().parent / "script.js"), encoding="utf-8") as f:
        script_read = f.read()

    if wait_time:
        script_read += "setTimeout(main, {0}000);\n".format(str(wait_time))
    else:
        script_read += "setImmediate(main);\n"

    script = session.create_script(script_read)
    script.on("message", my_message_handler)
    script.load()
    time.sleep(1)
    try:
        device.resume(pid)
    except Exception as e:
        print("[*] hook error")
        print(e)
        exit()
