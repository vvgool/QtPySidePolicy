# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['QObjHome.py', 'InfoModel.py', 'camille.py', 'DataModel.py', 'main.py'],
             pathex=[],
             binaries=[],
             datas=[('main.qml', '.'), ('script.js', '.'), ('check_logo.png', '.')],
             hiddenimports=[],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts, 
          [],
          exclude_binaries=True,
          name='合规检测工具',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=False,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None , icon='check_logo.png')
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas, 
               strip=False,
               upx=True,
               upx_exclude=[],
               name='合规检测工具')
app = BUNDLE(coll,
             name='合规检测工具.app',
             icon='check_logo.png',
             bundle_identifier=None)
