// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // 自动解析 JSON 请求体

// 存储所有聊天消息（实际项目可用数据库，这里用内存数组）
let messages = [];

// ✅ 接口：玩家发送消息（POST）
app.post('/send', (req, res) => {
    const { playerName, message } = req.body;

    if (!playerName || !message) {
        return res.status(400).json({ error: '缺少 playerName 或 message 字段' });
    }

    const chatMsg = {
        playerName,
        message,
        timestamp: new Date().toISOString()
    };

    messages.push(chatMsg); // 存入消息列表
    console.log(`📥 收到消息: [${playerName}] ${message}`);

    res.json({ success: true, message: '消息已接收' });
});

// ✅ 接口：获取所有消息（GET）
app.get('/messages', (req, res) => {
    // 按时间倒序返回（最新的在前面）
    const reversed = messages.slice().reverse();
    res.json(reversed);
});

// 启动服务
app.listen(port, () => {
    console.log(`🚀 聊天中继 API 运行在 http://localhost:${port}`);
});
