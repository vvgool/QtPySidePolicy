# This Python file uses the following encoding: utf-8
import os
from pathlib import Path
import sys
from QObjHome import QObjHome

from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine


if __name__ == "__main__":
    app = QGuiApplication(sys.argv)
    engine = QQmlApplicationEngine()
    home = QObjHome()
    engine.load(os.fspath(Path(__file__).resolve().parent / "main.qml"))
    if not engine.rootObjects():
        sys.exit(-1)
    rootObj = engine.rootObjects()[0]
    rootObj.startLaunch.connect(home.startLaunch)
    home.hookSignal.connect(rootObj.updateInfo)
    sys.exit(app.exec())
