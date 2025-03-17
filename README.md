# Vize Randevu Botu

Bu proje, Türkiye'deki vize randevularını otomatik olarak kontrol eden ve uygun randevu bulunduğunda Telegram üzerinden bildirim gönderen bir bot uygulamasıdır.

## Özellikler

- Otomatik vize randevu kontrolü
- Telegram bildirimleri
- Web arayüzü ile kolay yönetim
- Çoklu dil desteği

## Kurulum

### Gereksinimler

- Python 3.x
- Node.js 18.x veya üzeri
- npm veya yarn

### Python Bağımlılıkları

```bash
pip install -r requirements.txt
```

### Node.js Bağımlılıkları

```bash
npm install
# veya
yarn install
```

### Ortam Değişkenleri

`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Kullanım

1. Python scraper'ı başlatın:
```bash
python scraper/main.py
```

2. Web uygulamasını başlatın:
```bash
npm run dev
# veya
yarn dev
```

## Lisans

MIT
