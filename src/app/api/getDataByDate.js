import db from '../../../utils/db'; // ปรับให้เข้ากับที่อยู่ของ db.js ของคุณ

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date } = req.body;

    try {
      // สมมุติว่าคุณใช้ MySQL และมีตารางที่มีข้อมูลเกี่ยวกับวันที่
      const [results] = await db.query('SELECT * FROM us_covid_data WHERE us_2023 = ?', [date]);
      
      return res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching data' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
