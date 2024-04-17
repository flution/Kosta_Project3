const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 사용자 정보를 저장할 스키마 정의
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// 사용자 정보를 관리할 모델 생성
const User = mongoose.model('User', userSchema);

// 사용자 정보를 데이터베이스에 저장하는 예시 라우트
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // 사용자 생성
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user');
    }
});

// Express 애플리케이션 실행
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});