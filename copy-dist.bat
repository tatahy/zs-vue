:: source_dir目录拷贝到target_dir

:: 设定网站指定目录
@set target_dir=D:\wamp64\www\zs-web\public
@set static_dir=D:\wamp64\www\zs-web\public\static
@set source_dir=D:\softwareDev\projects\zs-vue\dist

@echo movingng .\dist\ ...
:: 如果target_dir中存在static目录，删除
@cd %target_dir%
@if exist %static_dir% (
:: 删除target_dir中的static目录
rmdir /s /q static
REM @echo static existed
)

::拷贝编译后的前端文件到网站指定目录
@xcopy %source_dir% %target_dir% /e /y
@dir /w
@echo copy success!
