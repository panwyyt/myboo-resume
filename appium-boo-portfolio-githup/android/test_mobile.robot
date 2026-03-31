*** Settings ***
Library           AppiumLibrary
Suite Teardown    Close Application

*** Variables ***
${REMOTE_URL}     http://127.0.0.1:4723
${PLATFORM}       Android
${DEVICE_NAME}    Pixel 9
${PLATFORM_VER}   16.0
${AUTOMATION}     UiAutomator2
# App ข้อมูลของ Dialer
${PACKAGE}        com.google.android.dialer
${ACTIVITY}       com.google.android.dialer.extensions.GoogleDialtactsActivity

*** Keywords ***
Open App Dialer
    Open Application    ${REMOTE_URL}
    ...                 platformName=${PLATFORM}
    ...                 platformVersion=${PLATFORM_VER}
    ...                 automationName=${AUTOMATION}
    ...                 deviceName=${DEVICE_NAME}
    ...                 appPackage=${PACKAGE}
    ...                 appActivity=${ACTIVITY}
    ...                 noReset=false

*** Test Cases ***
Open App Test
    [Documentation]    ทดสอบเปิดแอป Dialer
    Open App Dialer

Verify IMEI Display Success
    # 1. เปิดแป้นตัวเลข (ตรวจสอบชื่อ ID จาก Inspector อีกที ถ้าพังให้เปลี่ยนเป็น dial pad)
    Wait Until Element Is Visible    accessibility_id=key pad    timeout=10s
    Click Element                    accessibility_id=key pad

    # 2. กดรหัส *#06#
    # แนะนำให้ใช้ชื่อปุ่มตามมาตรฐาน Google Dialer
    Wait Until Element Is Visible    accessibility_id=*    timeout=5s
    Click Element    accessibility_id=*
    Click Element    accessibility_id=#
    Click Element    accessibility_id=0
    Click Element    accessibility_id=6,MNO
    Click Element    accessibility_id=#
    
    # 3. ตรวจสอบผลลัพธ์
    Wait Until Page Contains    Device information    timeout=10s
    Capture Page Screenshot     imei_result.png
    
    # 4. กดปุ่มตกลง (OK) เพื่อปิดหน้าต่าง
    Click Element    id=android:id/button1