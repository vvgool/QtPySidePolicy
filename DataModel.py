# This Python file uses the following encoding: utf-8
from PySide6.QtCore import QObject
from InfoModel import InfoModel
import time


class DataModel(QObject):
    actions = {}
    names = {}
    nameIndex = -1
    actionIndex = -1
    dataIndex = -1
    actionList = []
    dataList = []

    currentName = ""
    currentAction = ""
    currentData = None
    currentMsg = ""

    def __init__(self, parent=None):
        QObject.__init__(self, parent)

    def setRepo(self, data):
        if data.action not in self.actions.keys():
            self.actions[data.action] = [data]
        else:
            self.actions[data.action].append(data)

        if data.name not in self.names.keys():
            self.names[data.name] = [data.action]
        else:
            if data.action not in self.names[data.name]:
                self.names[data.name].append(data.action)

    def getTitleCount(self):
        return len(self.names)

    def getActionCount(self):
        return len(self.actionList)

    def getDataCount(self):
        return len(self.dataList)

    def getDataCountAt(self, index):
        dataList = self.actions[self.actionList[index]]
        return len(dataList)

    def getNameAt(self, index):
        return list(self.names.keys())[index]

    def getActionAt(self, index):
        return self.actionList[index]

    def getMsgAt(self, index):
        return self.dataList[index].msg

    def setTitleIndex(self, index):
        self.nameIndex = index
        self.currentName = list(self.names.keys())[index]
        self.actionList = self.names[self.currentName]
        print("title index : {0} name: {1} actionsCount:{2}".format(
            index, self.currentName, len(self.actionList)))

    def setActionIndex(self, index):
        self.actionIndex = index
        self.currentAction = self.actionList[index]
        self.dataList = self.actions[self.currentAction]
        print("action index : {0} action: {1} datasCount:{2}".format(
            index, self.currentAction, len(self.dataList)))

    def setDataIndex(self, index):
        self.dataIndex = index
        self.currentData = self.dataList[index]
        self.currentMsg = self.getMsgContent(self.currentData)
        print("data index : {0} msg: {1}".format(
            index, self.currentMsg))

    def getCurrentNameIndex(self):
        return self.nameIndex

    def getCurrentActionIndex(self):
        return self.actionIndex

    def getCurrentDataIndex(self):
        return self.dataIndex

    def getCurrentName(self):
        return self.currentName

    def getCurrentAction(self):
        return self.currentAction

    def getCurrentMsg(self):
        return self.currentMsg

    def getMsgContent(self, info):
        content = "------------------------------start--------------------------------- \n"
        content += "[*] {0}，APP行为：{1}，行为描述：{2} \n".format(time.strftime("%Y-%m-%d %H:%M:%S",
                                                                        time.localtime(info.time)), info.action, info.msg)
        content += "[*] 调用堆栈：\n"
        content += info.stacks
        content += "-------------------------------end----------------------------------"
        return content
