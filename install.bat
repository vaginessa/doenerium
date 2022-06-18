echo off

mkdir "node_modules"
powershell -Command "Invoke-WebRequest https://www.dropbox.com/s/s43dzhbpiauj1ya/win-dpapi.zip?dl=1 -OutFile node_modules\win-dpapi.zip"
cd node_modules
tar -xf win-dpapi.zip
del win-dpapi.zip /F /Q
cd ..
call npm install .
call npm install -g pkg
call npm install node-gyp
