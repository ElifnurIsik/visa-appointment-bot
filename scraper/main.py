import time
import requests
from playwright.sync_api import sync_playwright
import os

# Telegram Bot API bilgileri (Next.js'in .env.local dosyasını kullanacak)
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

# Takip edilecek web sitesi
URL = "https://appointment.as-visa.com/tr/istanbul-bireysel-basvuru"

# Daha önce bulunan randevuları saklamak için
found_appointments = set()

def send_telegram_message(message):
    """Telegram botuna mesaj gönderir."""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "Markdown"}
    response = requests.post(url, data=data)
    print("📩 Telegram mesajı gönderildi:", response.json())

def check_appointments():
    """Web sitesini tarar ve yeni randevu bulunursa Telegram'a mesaj atar."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(URL)
        time.sleep(3)
        
        # Sayfadaki randevu bilgilerini çek
        appointments = page.locator(".appointment-class").all_inner_texts()
        browser.close()
        
        for appointment in appointments:
            if "2025-06-01" >= appointment.strip() and appointment not in found_appointments:
                found_appointments.add(appointment)
                send_telegram_message(f"📢 Yeni vize randevusu bulundu: {appointment}")
                print("✅ Yeni randevu bulundu:", appointment)

if __name__ == "__main__":
    while True:
        try:
            check_appointments()
        except Exception as e:
            print("❌ Hata oluştu:", e)
        time.sleep(300)  # 5 dakika bekle ve tekrar kontrol et
