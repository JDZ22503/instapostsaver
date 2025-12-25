@echo off
echo Adding Windows Firewall rule for Node Backend...
netsh advfirewall firewall add rule name="Node Backend Port 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Expo Metro Port 8081" dir=in action=allow protocol=TCP localport=8081
echo.
echo Firewall rules added successfully!
echo.
echo You can now access:
echo - Backend: http://192.168.0.75:3000
echo - Expo: http://192.168.0.75:8081
echo.
pause
