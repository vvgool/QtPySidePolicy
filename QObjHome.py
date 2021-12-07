# This Python file uses the following encoding: utf-8
from PySide6.QtCore import Slot
from PySide6.QtCore import QObject, Signal
from PySide6.QtQml import QmlElement

import camille
import os
import time
from DataModel import DataModel

QML_IMPORT_NAME = "QObjHome"
QML_IMPORT_MAJOR_VERSION = 1


@QmlElement
class QObjHome(QObject):
    hookSignal = Signal()
    data = DataModel()

    def __init__(self, parent=None):
        QObject.__init__(self, parent)

    def startLaunch(self, path, pkg):
        if not os.path.exists(path):
            os.makedirs(path)
        self.logStream = open(path + "/" + pkg + ".txt", mode="w+")
        self.logStream.write("startLaunch \n")
        print("path = {0} pkg = {1}".format(path, pkg))
        camille.frida_hook(pkg, self.callback, 0)

    def callback(self, data):
        self.log(data)
        self.data.setRepo(data)
        self.hookSignal.emit()

    @Slot(int)
    def setTitleIndex(self, index: int):
        self.data.setTitleIndex(index)

    @Slot(int)
    def setActionIndex(self, index: int):
        self.data.setActionIndex(index)

    @Slot(int)
    def setDataIndex(self, index: int):
        self.data.setDataIndex(index)

    @Slot(int, result=str)
    def getName(self, index):
        return self.data.getNameAt(index)

    @Slot(result=int)
    def getCurrentNameIndex(self):
        return self.data.getCurrentNameIndex

    @Slot(result=int)
    def getCurrentActionIndex(self):
        return self.data.getCurrentActionIndex

    @Slot(result=int)
    def getCurrentDataIndex(self):
        return self.data.getCurrentDataIndex

    @Slot(result=int)
    def getActionCount(self):
        return self.data.getActionCount()

    @Slot(int, result=int)
    def getDataCountAt(self, index: int):
        return self.data.getDataCountAt(index)

    @Slot(result=int)
    def getDataCount(self):
        return self.data.getDataCount()

    @Slot(int, result=str)
    def getAction(self, index: int):
        return self.data.getActionAt(index)

    @Slot(int, result=str)
    def getActionDesc(self, index: int):
        return "{0}({1})".format(self.getAction(index), self.getDataCountAt(index))

    @Slot(int, result=str)
    def getData(self, index: int):
        return self.data.getMsgAt(index)

    @Slot(result=str)
    def getMsg(self):
        return self.data.getCurrentMsg()

    @Slot(result=int)
    def getCount(self):
        return self.data.getTitleCount()

    def log(self, info):
        self.logFile(
            "------------------------------start---------------------------------")
        self.logFile("[*] {0}，APP行为：{1}，行为描述：{2}".format(time.strftime("%Y-%m-%d %H:%M:%S",
                                                                       time.localtime(info.time)), info.action, info.msg))
        self.logFile("[*] 调用堆栈：")
        self.logFile(info.stacks)
        self.logFile(
            "-------------------------------end----------------------------------")

    def logFile(self, msg):
        # print(msg)
        self.logStream.write(msg)
        self.logStream.write("\n")
