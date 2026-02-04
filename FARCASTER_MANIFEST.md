# Farcaster Mini App Manifest Setup

Bu proje Farcaster ve Base Mini App manifest'ini destekler. Manifest dosyası `/.well-known/farcaster.json` endpoint'inde dinamik olarak oluşturulur.

## Gerekli Environment Variables

### Zorunlu
- `FARCASTER_ACCOUNT_ASSOCIATION` - Account association JSON (header, payload, signature)

### Opsiyonel (varsayılanlar kullanılır)
- `NEXT_PUBLIC_MINIAPP_NAME` - App adı (varsayılan: "FlipTimer")
- `NEXT_PUBLIC_MINIAPP_HOME_URL` - Ana sayfa URL'i
- `NEXT_PUBLIC_MINIAPP_ICON_URL` - Icon URL (varsayılan: `/thumbnail.png`)
- `NEXT_PUBLIC_MINIAPP_HERO_IMAGE_URL` - Hero image URL (varsayılan: `/og-image.png`)
- `NEXT_PUBLIC_MINIAPP_OG_IMAGE_URL` - OG image URL (varsayılan: `/og-image.png`)
- `NEXT_PUBLIC_MINIAPP_SCREENSHOT_URLS` - Screenshot URL'leri (virgülle ayrılmış, max 3)
- `NEXT_PUBLIC_MINIAPP_SUBTITLE` - Alt başlık (max 30 karakter)
- `NEXT_PUBLIC_MINIAPP_DESCRIPTION` - Açıklama (max 170 karakter)
- `NEXT_PUBLIC_MINIAPP_TAGLINE` - Tagline (max 30 karakter)
- `NEXT_PUBLIC_MINIAPP_OG_TITLE` - OG title (max 30 karakter)
- `NEXT_PUBLIC_MINIAPP_OG_DESCRIPTION` - OG description (max 100 karakter)
- `NEXT_PUBLIC_MINIAPP_WEBHOOK_URL` - Webhook URL (notifications için)
- `NEXT_PUBLIC_MINIAPP_NOINDEX` - "true" ise search'ten hariç tutulur

## Account Association Oluşturma

1. Projenizi deploy edin (Vercel'de)
2. [Base Build Account Association Tool](https://www.base.dev/preview?tab=account) sayfasına gidin
3. App URL'inizi girin (örn: `fliptimer-nextjs-4oqr.vercel.app`)
4. "Submit" butonuna tıklayın
5. "Verify" butonuna tıklayın ve wallet'ınızla imzalayın
6. Oluşturulan `accountAssociation` JSON'ını kopyalayın:
   ```json
   {
     "header": "...",
     "payload": "...",
     "signature": "..."
   }
   ```
7. Vercel'de environment variable olarak ekleyin:
   - Variable name: `FARCASTER_ACCOUNT_ASSOCIATION`
   - Value: Yukarıdaki JSON'ın tamamı (string olarak)

## Manifest Endpoint

Manifest dosyası şu endpoint'te erişilebilir:
- `https://your-domain.com/.well-known/farcaster.json`

## Manifest İçeriği

Manifest şu bilgileri içerir:
- **Account Association**: Domain ownership verification
- **App Identity**: Name, icon, home URL
- **Loading Experience**: Splash screen image ve background color
- **Discovery**: Category, tags, screenshots
- **Social Sharing**: OG tags, hero image
- **Notifications**: Webhook URL (opsiyonel)

## Kaynaklar

- [Farcaster Manifest vs Embed Guide](https://miniapps.farcaster.xyz/docs/guides/manifest-vs-embed)
- [Base Manifest Documentation](https://docs.base.org/mini-apps/core-concepts/manifest)
- [Base Account Association Tool](https://www.base.dev/preview?tab=account)
