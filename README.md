# Dog18

[On the internet nobody knows you're dog](https://en.wikipedia.org/wiki/On_the_Internet,_nobody_knows_you're_a_dog), but we'll make sure you're 18.\
Built with [openpassport](https://openpassport.app).

## Getting Started

### Prerequisites

- [bun](https://bun.sh/docs/installation)
- Mobile device that supports near-field communication (NFC).
- Proof of Passport app installed on mobile device: [iOS](https://apps.apple.com/us/app/proof-of-passport/id6478563710), [Android](https://play.google.com/store/apps/details?id=com.proofofpassportapp).
- A biometric passport (aka e-passport).

1. On mobile app:
   1. Open proof of passport app on your mobile device.
   2. Scan your passport (_Open Camera_) OR _use mock passport data > Generate passport data > Next_.
1. On desktop:
   1. Install deps: `bun i`.
   2. Start local web client: `bun dev.ui`.
   3. Start local verification server: `bun dev.server`
   4. Open local app: [`localhost:5173`](http://localhost:5173).
1. On mobile app
   1. Scan QR Code shown in desktop's browser.
   2. Tap _verify_.
