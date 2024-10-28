import { NextResponse } from 'next/server';
import { mysqlPool } from '../../../utils/db'; // ใช้ pool จากไฟล์ db.js
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        // เตรียมคำสั่ง SQL สำหรับการบันทึกข้อมูลผู้ใช้
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const values = [name, email, hashedPassword];

        // บันทึกข้อมูลใน MySQL
        await pool.query(query, values);

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}
