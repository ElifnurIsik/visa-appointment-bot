/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const message = "📢 Yeni vize randevusu bulundu! Hemen kontrol et.";

    // Boş değişken kontrolü
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID bulunamadı.");
    }

    // Telegram API URL'si
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // API isteğini gönder
    const response = await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID.trim(), // Boşlukları engelle
      text: message,
      parse_mode: "Markdown",
    });

    return NextResponse.json(
      { success: true, message: "Telegram mesajı gönderildi!", data: response.data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Telegram mesajı gönderilirken hata oluştu", error: error.message },
      { status: 500 }
    );
  }
}
