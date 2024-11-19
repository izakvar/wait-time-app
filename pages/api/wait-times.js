// pages/api/wait-times.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    // 取得第一個診所資料
    const wroom = await axios.get('https://wroom.vision.com.tw/MainPage/ClinicInfo.aspx?CliID=8csXIzaKCpZrLxVKMAR4VQ==#WInfos');
    const $wroom = cheerio.load(wroom.data);
    const wroomCount = $wroom('#waitCount').text().trim();

    // 取得第二個診所資料
    const mainpi = await axios.get('https://www.mainpi.com/query?i=2537');
    const $mainpi = cheerio.load(mainpi.data);
    const mainpiCount = $mainpi('.wait-number').text().trim();

    res.status(200).json({
      wroomWait: wroomCount || '0',
      mainpiWait: mainpiCount || '0',
      timestamp: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    });
  } catch (error) {
    console.error('Error fetching wait times:', error);
    res.status(500).json({ error: '無法取得等待人數' });
  }
}
