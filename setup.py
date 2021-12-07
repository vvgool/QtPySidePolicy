import PyInstaller.__main__
PyInstaller.__main__.run([
    '--name=合规检测工具',
    '--add-data=main.qml:.',
    '--add-data=QObjHome.py:.',
    '--add-data=camille.py:.',
    '--add-data=script.js:.',
    '--add-data=InfoModel.py:.',
    '--add-data=DataModel.py:.'
    '--onefile',
    'main.py',
    '--windowed'
])
