import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
//import { mysqlPool } from '../../utils/db'; // เชื่อมต่อ MySQL
//import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials) {
           
            const { email, password } = credentials;

            try {
                // ใช้ pool เพื่อเชื่อมต่อกับ MySQL และค้นหาผู้ใช้
                const [rows] = await promisePool.query(`SELECT * FROM users WHERE email = ?`, [email]);
                
                const user = rows[0]; // ดึงผู้ใช้จากผลลัพธ์

                if (!user) {
                    return null; // ไม่พบผู้ใช้
                }

                // ตรวจสอบความถูกต้องของรหัสผ่าน
                // const passwordMatch = await bcrypt.compare(password, user.password);

                // if (!passwordMatch) {
                //     return null; // รหัสผ่านไม่ถูกต้อง
                // }
                if(password != user.password){
                    return null;// รหัสผ่านไม่ถูกต้อง
                }
                // ส่งคืนข้อมูลผู้ใช้
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

            } catch(error) {
                console.log("Error: ", error);
                return null;
            }
          }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            };
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
