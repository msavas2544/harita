# 🗺️ Erzurum Harita Uygulaması

Erzurum için özel geliştirilmiş, adres ve koordinat bazlı otomatik işaretleyici ekleme özelliğine sahip interaktif harita uygulaması.

## 🎯 Özellikler

### ✨ Temel Özellikler

- **Otomatik Adres Çözümleme**: Adres yazarak otomatik işaretleyici ekleme
- **Koordinat Desteği**: Koordinat girerek doğrudan işaretleme
- **Harita Tıklama**: Haritaya tıklayarak işaretleyici ekleme
- **Renkli İşaretleyiciler**: 5 farklı renk seçeneği (Mavi, Kırmızı, Yeşil, Turuncu, Mor)
- **Sürükle-Bırak**: İşaretleyicileri sürükleyerek konumunu değiştirme
- **Otomatik Kayıt**: Tarayıcıda otomatik veri saklama

### 💾 Veri Yönetimi

- **Dışa Aktarma**: İşaretleyicileri JSON formatında kaydetme
- **İçe Aktarma**: Kaydedilmiş verileri yükleme
- **Local Storage**: Tarayıcı kapansa bile veriler korunur
- **Toplu Silme**: Tüm işaretleyicileri tek seferde temizleme

### 🎨 Kullanıcı Arayüzü

- Modern ve responsive tasarım
- Yan panel ile işaretleyici listesi
- Pop-up bilgi pencereleri
- Kolay navigasyon ve kullanım
- Mobil uyumlu

## 🚀 Kullanım

### 1. Başlangıç

- `index.html` dosyasını tarayıcınızda açın
- Harita otomatik olarak Erzurum merkez üzerinde açılacaktır

### 2. İşaretleyici Ekleme Yöntemleri

#### A) Adres ile:

```
Cumhuriyet Caddesi Erzurum
Aliravi Caddesi
Yakutiye Meydanı
Terminal Caddesi
```

#### B) Koordinat ile:

```
39.9043, 41.2717
39.9043 41.2717
```

#### C) Harita Tıklama:

- Haritada bir noktaya tıklayın
- Çıkan pencerede etiket girin
- İşaretleyici otomatik eklenir

### 3. İşaretleyici Yönetimi

- **Göster**: İşaretleyiciye haritada odaklanır
- **Sil**: İşaretleyiciyi kaldırır
- **Sürükle**: İşaretleyiciyi yeni konuma taşır
- **Renk**: Farklı renklerle kategorize edin

### 4. Veri Saklama

- **Otomatik**: Her değişiklik otomatik kaydedilir
- **Dışa Aktar**: JSON dosyası olarak kaydedin
- **İçe Aktar**: Daha önce kaydedilen verileri yükleyin

## 📋 Dosya Yapısı

```
harita/
│
├── index.html      # Ana HTML dosyası
├── style.css       # Stil dosyası
├── app.js          # JavaScript mantığı
└── README.md       # Bu dosya
```

## 🛠️ Teknolojiler

- **Leaflet.js**: İnteraktif harita kütüphanesi
- **OpenStreetMap**: Harita tile'ları
- **Nominatim API**: Adres çözümleme (geocoding)
- **HTML5 Local Storage**: Yerel veri saklama
- **Vanilla JavaScript**: Saf JavaScript (framework yok)
- **Responsive CSS**: Mobil uyumlu tasarım

## 💡 İpuçları

1. **Hızlı Ekleme**: Enter tuşuna basarak hızlıca işaretleyici ekleyin
2. **Klavye Kısayolu**: `Ctrl + K` ile arama kutusuna odaklanın
3. **Renklerle Organize**: Farklı ekip/bölgeler için farklı renkler kullanın
4. **Düzenli Yedekleme**: Önemli verilerinizi düzenli olarak dışa aktarın
5. **Detaylı Etiketler**: İşaretleyicilere açıklayıcı isimler verin

## 📍 Örnek Kullanım Senaryoları

### Ekip Takibi

```
45-20 Ekip - Aliravi Caddesi (Kırmızı)
21-15 Ekip - Cumhuriyet Caddesi (Mavi)
33-10 Ekip - Terminal (Yeşil)
```

### Servis Noktaları

```
Ana Depo - 39.9043, 41.2717 (Turuncu)
Şube 1 - Yakutiye (Mor)
Şube 2 - Palandöken (Mavi)
```

## 🔒 Gizlilik

- Tüm veriler tarayıcınızda saklanır
- Hiçbir veri sunucuya gönderilmez
- Sadece adres çözümleme için Nominatim API kullanılır

## 🐛 Sorun Giderme

**Problem**: İşaretleyici eklenmiyor
- İnternet bağlantınızı kontrol edin
- Tarayıcı konsolunu açıp hata mesajlarını kontrol edin

**Problem**: Veriler kayboldu
- Local Storage temizlenmiş olabilir
- Düzenli olarak dışa aktararak yedek alın

**Problem**: Adres bulunamıyor
- Daha genel bir adres deneyin
- "Erzurum" kelimesini ekleyin
- Koordinat formatını kullanın

## 📞 Destek

Herhangi bir sorun veya öneri için projeyi geliştirmeye devam edebilirsiniz.

## 📄 Lisans

Bu proje açık kaynak kodludur ve özgürce kullanılabilir.

---

**Not**: Erzurum'daki tüm adresler ve konumlar için optimize edilmiştir. 🏔️
