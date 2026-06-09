*** Settings ***
Library           AppiumLibrary
# ปิดแอปอัตโนมัติเมื่อเทสเสร็จ
Suite Teardown    Close Application

*** Variables ***
${REMOTE_URL}     http://127.0.0.1:4723
${PLATFORM}       iOS
${PLATFORM_VER}   26.4
${DEVICE_NAME}    iPhone 17
${AUTOMATION}     XCUITest
# Bundle ID ของแอป Settings (iOS)
${BUNDLE_ID}      com.apple.reminders

*** Keywords ***
Open Reminders App
    Open Application    ${REMOTE_URL}
    ...                 platformName=${PLATFORM}
    ...                 platformVersion=${PLATFORM_VER}
    ...                 deviceName=${DEVICE_NAME}
    ...                 automationName=${AUTOMATION}
    ...                 bundleId=${BUNDLE_ID}
    ...                 noReset=true

*** Test Cases ***
Test Reminders App
    Open Reminders App
    Wait Until Element Is Visible    accessibility_id=New Reminder    10s
    Click Element                    accessibility_id=New Reminder
    Wait Until Element Is Visible    accessibility_id=Quick Entry Title Field    10s
    Input Text                       accessibility_id=Quick Entry Title Field    ทดสอบการสร้าง Reminder by Boo
    Click Element                    chain=**/XCUIElementTypeSwitch[`name == "Date"`]
    Click Element                    DatePicker.Show
    Wait Until Element Is Visible    class=XCUIElementTypePicker    10s
    # เลือกเดือน (Picker Wheel ตัวแรก)
    Input Text                       xpath=(//XCUIElementTypePickerWheel)[1]    March
    # เลือกปี (Picker Wheel ตัวที่สอง)
    Input Text                       xpath=(//XCUIElementTypePickerWheel)[2]    2541 BE
    Wait Until Page Contains Element    accessibility_id=DatePicker.Hide    10s
    Click Element                    accessibility_id=DatePicker.Hide
    Click Element                    accessibility_id=20
    Click Element                    accessibility_id=Done