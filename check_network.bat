@echo off
echo ============================================
echo NETWORK DIAGNOSTIC
echo ============================================
echo.
echo Checking your IP addresses...
ipconfig | findstr /i "IPv4"
echo.
echo ============================================
echo If you see TWO IP addresses above:
echo - You are connected to BOTH WiFi and Hotspot
echo - You MUST disconnect from WiFi
echo.
echo ============================================
echo Testing Backend Connection...
echo.
curl http://192.168.0.75:3000 2>nul
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Backend is accessible on 192.168.0.75:3000
) else (
    echo.
    echo FAILED! Backend is NOT accessible
    echo - Check if backend is running: npm start
    echo - Run add_firewall_rules.bat as Administrator
)
echo.
echo ============================================
echo Next Steps:
echo 1. Disconnect from WiFi (keep only hotspot)
echo 2. Run firewall rules as Administrator
echo 3. Test from phone browser: http://192.168.0.75:3000
echo 4. Open mobile app and try login
echo ============================================
pause
