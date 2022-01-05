import PyInstaller.__main__
PyInstaller.__main__.run([
    '--name=合规检测工具',
    '--add-data=main.qml:.',
    '--add-data=script.js:.',
    '--add-data=check_logo.png:.',
    '--onedir',
    'QObjHome.py',
    'InfoModel.py',
    'camille.py',
    'DataModel.py',
    'main.py',
    '--windowed',
    '--icon=check_logo.png'
])
