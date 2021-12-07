import QtQuick
import QtQuick.Window
import QtQuick.Controls

import QObjHome 1.0

Window {
    width: 1334
    height: 750
    visible: true
    color: "#ffffff"
    title: qsTr("合规检测工具")
    signal startLaunch(string path, string pkg)

    function updateInfo() {
        updateName()
        updateAction()
        updateData()
    }

    function setTitleIndex(index) {
        console.log("setTitleIndex:" + index)
        name_lv.currentIndex = index
        home.setTitleIndex(index)
    }

    function setActionIndex(index) {
        console.log("setActionIndex:" + index)
        action_lv.currentIndex = index
        home.setActionIndex(index)
    }

    function setDataIndex(index) {
        console.log("setDataIndex:" + index)
        data_lv.currentIndex = index
        home.setDataIndex(index)
    }

    function updateName() {
        var count = home.getCount()
        name_lv.model = count
        name_lv.update()
        if (count > 0 && home.getCurrentNameIndex() < 0) {
            setTitleIndex(0)
        }
    }

    function updateAction() {
        if (name_lv.count <= 0)
            return
        var count = home.getActionCount()
        action_lv.model = 0
        action_lv.model = count
        action_lv.update()
        if (count > 0 && home.getCurrentActionIndex() < 0) {
            setActionIndex(0)
        }
    }

    function updateData() {
        if (action_lv.count <= 0)
            return
        var count = home.getDataCount()
        data_lv.model = 0
        data_lv.model = count
        data_lv.update()
        if (count > 0 && home.getCurrentDataIndex() < 0) {
            setDataIndex(0)
        }

        msg_tv.text = home.getMsg()
    }

    QObjHome {
        id: home
    }

    Rectangle {
        x: 73
        y: 9
        width: 474
        height: 20
        color: "#30666666"
    }
    TextEdit {
        id: py_input_path
        x: 73
        y: 9
        width: 474
        height: 20
        visible: true
        text: qsTr("/Users/wiesenwang/Desktop")
        font.pixelSize: 12
        horizontalAlignment: Text.AlignLeft
        verticalAlignment: Text.AlignVCenter
        font.weight: Font.Normal
        padding: 10
        textFormat: Text.AutoText
    }

    Text {
        id: py_path
        x: 6
        y: 13
        text: qsTr("脚本路径：")
        font.pixelSize: 12
    }

    Text {
        id: py_pkg
        x: 6
        y: 38
        font.pixelSize: 12
        text: qsTr("检测包名：")
    }

    Rectangle {
        x: 73
        y: 34
        width: 474
        height: 20
        color: "#30666666"
    }
    TextEdit {
        id: py_input_pkg
        x: 73
        y: 34
        width: 474
        height: 20
        visible: true
        text: qsTr("com.wepie.snake")
        font.pixelSize: 12
        horizontalAlignment: Text.AlignLeft
        verticalAlignment: Text.AlignVCenter
        font.weight: Font.Normal
        padding: 10
        textFormat: Text.AutoText
    }

    RoundButton {
        id: start_btn
        x: 553
        y: 9
        width: 120
        height: 45
        radius: 4
        text: qsTr("开始检查")
        highlighted: false

        onClicked: {
            console.log(py_input_path.text)
            startLaunch(py_input_path.text, py_input_pkg.text)
        }
    }

    ListView {
        id: name_lv
        x: 6
        y: 60
        width: 1310
        height: 30
        clip: true
        spacing: 1
        orientation: ListView.Horizontal
        flickableDirection: Flickable.HorizontalFlick
        delegate: Item {
            id: name_item
            x: 5
            width: 80
            height: 30

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    setTitleIndex(index)
                    setActionIndex(0)
                    setDataIndex(0)
                    updateInfo()
                }
            }

            Rectangle {
                anchors.fill: parent
                color: name_lv.currentIndex === index ? "#888888" : "#999999"
            }

            Text {
                id: name_tv
                text: home.getName(index)
                anchors.fill: parent
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
                wrapMode: Text.WordWrap
                font.bold: true
            }
        }
    }

    ListView {
        id: action_lv
        x: 6
        y: 101
        width: 200
        height: 635
        clip: true
        spacing: 1
        delegate: Item {
            id: action_item
            x: 0
            width: 200
            height: 40
            Rectangle {
                anchors.fill: parent
                color: action_lv.currentIndex === index ? "#888888" : "#999999"
            }

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    console.log("click action index = " + index)
                    setActionIndex(index)
                    setDataIndex(0)
                    updateInfo()
                }
            }

            Text {
                id: action_tv
                text: home.getActionDesc(index)
                anchors.fill: parent
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
                wrapMode: Text.WordWrap
                font.pointSize: 10
                font.bold: true
            }
        }
    }

    ListView {
        id: data_lv
        x: 239
        y: 101
        width: 242
        height: 635
        clip: true
        spacing: 1
        delegate: Item {
            id: data_item
            x: 0
            width: 242
            height: 40
            Rectangle {
                anchors.fill: parent
                color: data_lv.currentIndex === index ? "#888888" : "#999999"
            }

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    console.log("click data index = " + index)
                    setDataIndex(index)
                    updateInfo()
                }
            }
            Text {
                id: data_tv
                text: home.getData(index)
                anchors.fill: parent
                horizontalAlignment: Text.AlignLeft
                verticalAlignment: Text.AlignVCenter
                wrapMode: Text.WordWrap
                font.bold: true
                font.pointSize: 8
            }
        }
    }

    Text {
        id: msg_tv
        x: 505
        y: 101
        width: 811
        height: 635
        font.pixelSize: 12
    }
}

/*##^##
Designer {
    D{i:0;height:750;width:1334}D{i:1}D{i:2}D{i:3}D{i:4}D{i:5}D{i:6}D{i:7}D{i:8}D{i:9}
        D{i:10}D{i:15}D{i:20}D{i:25}
        }
        ##^##*/

