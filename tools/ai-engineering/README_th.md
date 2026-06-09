# AI Engineering

การตั้งค่าและเชื่อม AI agent เข้ากับงานจริง: MCP, Agent Skills และ context engineering

## สิ่งที่ทำได้

- ตั้งค่าและใช้งาน Model Context Protocol (MCP) เพื่อเชื่อม AI assistant เข้ากับแอป, API และแหล่งข้อมูลภายนอก
- สร้าง MCP server ที่ expose tools, resources และ prompts ให้ agent เรียกฟังก์ชัน อ่านข้อมูล และใช้ prompt ซ้ำได้
- ตั้งค่า AI coding agent ด้วยไฟล์ instruction ของโปรเจกต์: CLAUDE.md, GEMINI.md และมาตรฐานกลาง AGENTS.md
- เขียน Agent Skills (SKILL.md) ที่รวมคำสั่ง สคริปต์ และทรัพยากรเป็นความสามารถพร้อมเรียกใช้
- ทำ context engineering เพื่อจัดการ context window ด้วยการ retrieve, สรุป และ compaction สำหรับงาน agent ที่รันยาว
- จัดการ persistent memory ให้ agent จดจำข้อมูลข้ามเซสชันได้
- ออกแบบ agentic workflow หลายขั้นตอนด้วย tool use / function calling เพื่ออัตโนมัติงานตั้งแต่ต้นจนจบ
- จัด orchestration ด้วย subagent ที่มี context แยกกัน แล้วส่งผลสรุปกลับให้ agent หลัก
- เชื่อม AI เข้ากับระบบภายนอก เช่น Git/GitHub, Slack, ฐานข้อมูล และเบราว์เซอร์ ผ่าน MCP และ API
- นำ agentic AI มาช่วยงาน QA: สร้างเทสด้วย AI, สำรวจระบบ และ self-healing test
- เขียน prompt และวางเครื่องมือให้ automation ทำงานซ้ำได้อย่างเชื่อถือได้ในไปป์ไลน์การทดสอบ
